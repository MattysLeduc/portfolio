export interface ContactMessageResponseModel {
  messageId: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string; // ISO datetime
  read: boolean;
}
