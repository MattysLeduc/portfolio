import axiosInstance from "../../../../shared/api/axiosInstance";

export async function markMessageRead(messageId: string): Promise<void> {
  await axiosInstance.put(`/admin/contact/messages/${messageId}/read`);
}
