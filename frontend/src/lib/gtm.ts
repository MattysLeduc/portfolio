type DataLayerEntry = {
  event: string;
  [key: string]: unknown;
};

declare global {
  interface Window {
    dataLayer: DataLayerEntry[];
  }
}

const gtmId = import.meta.env.VITE_GTM_ID as string | undefined;

const canTrack = (): boolean => {
  if (typeof window === "undefined") return false;
  return Boolean(gtmId);
};

export const pushToDataLayer = (entry: DataLayerEntry): void => {
  if (!canTrack()) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(entry);
};

export const trackPageView = (path: string): void => {
  pushToDataLayer({
    event: "page_view",
    page_path: path,
    page_title: document.title,
    page_location: window.location.href,
  });
};