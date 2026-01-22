package com.mattysleduc.portfolio.domain.contactsubdomain.business_layer;

import com.mattysleduc.portfolio.domain.contactsubdomain.presentation_layer.*;

import java.util.List;

public interface ContactService {
    ContactInfoResponseModel getContactInfo();
    ContactInfoResponseModel updateContactInfo(ContactInfoRequestModel model);

    List<ContactMessageResponseModel> getAllMessages();
    ContactMessageResponseModel submitMessage(ContactMessageRequestModel model);
    ContactMessageResponseModel markMessageAsRead(String messageId);
    void deleteMessage(String messageId);
}
