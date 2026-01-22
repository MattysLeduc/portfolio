package com.mattysleduc.portfolio.domain.hobbysubdomain.business_layer;

import com.mattysleduc.portfolio.domain.hobbysubdomain.data_access_layer.Hobby;
import com.mattysleduc.portfolio.domain.hobbysubdomain.data_access_layer.HobbyIdentifier;
import com.mattysleduc.portfolio.domain.hobbysubdomain.data_access_layer.HobbyRepository;
import com.mattysleduc.portfolio.domain.hobbysubdomain.mapping_layer.HobbyRequestMapper;
import com.mattysleduc.portfolio.domain.hobbysubdomain.mapping_layer.HobbyResponseMapper;
import com.mattysleduc.portfolio.domain.hobbysubdomain.presentation_layer.HobbyRequestModel;
import com.mattysleduc.portfolio.domain.hobbysubdomain.presentation_layer.HobbyResponseModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HobbyServiceImpl implements HobbyService {

    private final HobbyRepository repository;
    private final HobbyResponseMapper responseMapper;
    private final HobbyRequestMapper requestMapper;

    public HobbyServiceImpl(HobbyRepository repository,
                            HobbyResponseMapper responseMapper,
                            HobbyRequestMapper requestMapper) {
        this.repository = repository;
        this.responseMapper = responseMapper;
        this.requestMapper = requestMapper;
    }

    @Override
    public List<HobbyResponseModel> getAllHobbies() {
        return repository.findAll()
                .stream()
                .map(responseMapper::toResponseModel)
                .toList();
    }

    @Override
    public HobbyResponseModel getHobbyById(String hobbyId) {
        Hobby hobby = repository.findHobbyByHobbyIdentifier_HobbyId(hobbyId);
        return responseMapper.toResponseModel(hobby);
    }

    @Override
    public HobbyResponseModel createHobby(HobbyRequestModel model) {
        Hobby hobby = requestMapper.toEntity(model);
        hobby.setHobbyIdentifier(new HobbyIdentifier());
        return responseMapper.toResponseModel(repository.save(hobby));
    }

    @Override
    public HobbyResponseModel updateHobby(String hobbyId, HobbyRequestModel model) {
        Hobby hobby = repository.findHobbyByHobbyIdentifier_HobbyId(hobbyId);

        hobby.setNameEn(model.getNameEn());
        hobby.setNameFr(model.getNameFr());
        hobby.setDescriptionEn(model.getDescriptionEn());
        hobby.setDescriptionFr(model.getDescriptionFr());
        hobby.setIconUrl(model.getIconUrl());
        
        return responseMapper.toResponseModel(repository.save(hobby));
    }

    @Override
    public void deleteHobby(String hobbyId) {
        Hobby hobby = repository.findHobbyByHobbyIdentifier_HobbyId(hobbyId);
        repository.delete(hobby);
    }
}
