package com.ssafy.PloMeet.api.service;

import com.ssafy.PloMeet.api.request.UserRegisterReq;
import com.ssafy.PloMeet.api.response.UserRes;
import com.ssafy.PloMeet.model.entity.User;
import com.ssafy.PloMeet.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    //유저 정보 조회
    @Transactional
    public UserRes findUserByKakaoUserId(Long kakaoUserId) {
        User user = userRepository.findByKakaoUserId(kakaoUserId).orElseThrow(() -> new NoSuchElementException("[가입하지 않는 회원] kakaoId : " + kakaoUserId));
        return new UserRes(user);
    }

    //회원 가입
    @Transactional
    public Long signUp(UserRegisterReq userRegisterReq) {
        User user = userRegisterReq.toEntity();
        return userRepository.save(user).getUserId();
    }
}
