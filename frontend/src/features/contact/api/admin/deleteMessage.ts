import axiosInstance from '../../../../shared/api/axiosInstance';

export async function deleteMessage(messageId: string): Promise<void> {
  await axiosInstance.delete(`/admin/contact/messages/${messageId}`);
}
