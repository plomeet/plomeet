package com.ssafy.PloMeet.api.service;

import com.ssafy.PloMeet.api.request.UserRegisterReq;
import com.ssafy.PloMeet.api.response.UserRes;
import com.ssafy.PloMeet.model.entity.User;
import com.ssafy.PloMeet.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.NoSuchElementException;

public interface UserService {
    UserRes findUserByKakaoUserId(Long kakaoUserId);
    Long signUp(UserRegisterReq userRegisterReq);

import com.ssafy.PloMeet.model.entity.User;

import java.util.Optional;

public interface UserService {
    Optional<User> getUserInfo(Long userId) throws Exception;
}
