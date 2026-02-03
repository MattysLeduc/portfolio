import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { authService } from "../shared/api/authService";

interface AuthContextType {
  isAuthenticated: boolean;
  user: { username: string; roles?: Array<{ authority: string }> } | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const TOKEN_EXPIRY_MS = 2 * 60 * 60 * 1000;
const TOKEN_EXPIRES_AT_KEY = "token_expires_at";

const getStoredAuth = () => {
  try {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    const expiresAt = localStorage.getItem(TOKEN_EXPIRES_AT_KEY);
    const isExpired = !expiresAt || Date.now() >= Number(expiresAt);

    if (!token || !userData || isExpired) {
      return { isAuthenticated: false, user: null };
    }

    return { isAuthenticated: true, user: JSON.parse(userData) };
  } catch {
    return { isAuthenticated: false, user: null };
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const initialAuth = getStoredAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(
    initialAuth.isAuthenticated,
  );
  const [user, setUser] = useState<{
    username: string;
    roles?: Array<{ authority: string }>;
  } | null>(initialAuth.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    const expiresAt = localStorage.getItem(TOKEN_EXPIRES_AT_KEY);
    const isExpired = !expiresAt || Date.now() >= Number(expiresAt);
    if (token && userData) {
      if (isExpired) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem(TOKEN_EXPIRES_AT_KEY);
        setIsAuthenticated(false);
        setUser(null);
      } else {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      }
    }
  }, []);

  const login = async (username: string, password: string) => {
    const {
      token,
      username: returnedUsername,
      roles,
    } = await authService.login(username, password);
    const userData = { username: returnedUsername, roles };
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem(
      TOKEN_EXPIRES_AT_KEY,
      String(Date.now() + TOKEN_EXPIRY_MS),
    );
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem(TOKEN_EXPIRES_AT_KEY);
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
