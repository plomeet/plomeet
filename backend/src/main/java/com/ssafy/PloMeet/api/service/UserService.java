package com.ssafy.PloMeet.api.service;

import com.ssafy.PloMeet.model.entity.User;

import java.util.Optional;

public interface UserService {
    Optional<User> getUserInfo(Long userId) throws Exception;
}
