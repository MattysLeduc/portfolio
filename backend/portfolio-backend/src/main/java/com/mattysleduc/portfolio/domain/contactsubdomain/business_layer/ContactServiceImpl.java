package com.mattysleduc.portfolio.domain.contactsubdomain.business_layer;

import com.mattysleduc.portfolio.domain.contactsubdomain.data_access_layer.*;
import com.mattysleduc.portfolio.domain.contactsubdomain.mapping_layer.*;
import com.mattysleduc.portfolio.domain.contactsubdomain.presentation_layer.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactServiceImpl implements ContactService {

    private final ContactInfoRepository infoRepository;
    private final ContactMessageRepository messageRepository;
    private final ContactInfoRequestMapper infoRequestMapper;
    private final ContactInfoResponseMapper infoResponseMapper;
    private final ContactMessageRequestMapper messageRequestMapper;
    private final ContactMessageResponseMapper messageResponseMapper;

    public ContactServiceImpl(ContactInfoRepository infoRepository,
                              ContactMessageRepository messageRepository,
                              ContactInfoRequestMapper infoRequestMapper,
                              ContactInfoResponseMapper infoResponseMapper,
                              ContactMessageRequestMapper messageRequestMapper,
                              ContactMessageResponseMapper messageResponseMapper) {
        this.infoRepository = infoRepository;
        this.messageRepository = messageRepository;
        this.infoRequestMapper = infoRequestMapper;
        this.infoResponseMapper = infoResponseMapper;
        this.messageRequestMapper = messageRequestMapper;
        this.messageResponseMapper = messageResponseMapper;
    }

    @Override
    public ContactInfoResponseModel getContactInfo() {
        ContactInfo info = infoRepository.findAll().stream().findFirst().orElse(null);
        return info != null ? infoResponseMapper.toResponseModel(info) : new ContactInfoResponseModel();
    }

    @Override
    public ContactInfoResponseModel updateContactInfo(ContactInfoRequestModel model) {
        ContactInfo entity = infoRepository.findAll().stream().findFirst().orElse(new ContactInfo());
        entity.setEmail(model.getEmail());
        entity.setPhone(model.getPhone());
        entity.setAddress(model.getAddress());
        entity.setLinkedin(model.getLinkedin());
        entity.setGithub(model.getGithub());
        entity.setWebsite(model.getWebsite());
        return infoResponseMapper.toResponseModel(infoRepository.save(entity));
    }

    @Override
    public List<ContactMessageResponseModel> getAllMessages() {
        return messageRepository.findAll().stream().map(messageResponseMapper::toResponseModel).toList();
    }

    @Override
    public ContactMessageResponseModel submitMessage(ContactMessageRequestModel model) {
        ContactMessage entity = messageRequestMapper.toEntity(model);
        return messageResponseMapper.toResponseModel(messageRepository.save(entity));
    }

    @Override
    public ContactMessageResponseModel markMessageAsRead(String messageId) {
        ContactMessage entity = messageRepository.findContactMessageByContactMessageIdentifier_MessageId(messageId);
        entity.setRead(true);
        return messageResponseMapper.toResponseModel(messageRepository.save(entity));
    }

    @Override
    public void deleteMessage(String messageId) {
        ContactMessage entity = messageRepository.findContactMessageByContactMessageIdentifier_MessageId(messageId);
        messageRepository.delete(entity);
    }
}
