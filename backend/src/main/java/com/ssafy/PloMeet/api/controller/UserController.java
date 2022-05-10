package com.ssafy.PloMeet.api.controller;

import com.ssafy.PloMeet.api.response.UserRes;
import com.ssafy.PloMeet.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    //회원 가입 여부 조회
    @GetMapping("/{kakaoUserId}")
    public ResponseEntity findUserByKakaoId(@PathVariable("kakaoUserId") Long kakaoUserId) {
        try {
            UserRes userRes = userService.findUserByKakaoUserId(kakaoUserId);
            return ResponseEntity.status(HttpStatus.OK).body(userRes);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
    }
}
