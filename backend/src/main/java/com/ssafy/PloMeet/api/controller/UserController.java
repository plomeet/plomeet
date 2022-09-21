package com.ssafy.PloMeet.api.controller;

import com.ssafy.PloMeet.api.request.ProfileReq;
import com.ssafy.PloMeet.api.request.UserRegisterReq;
import com.ssafy.PloMeet.api.response.BaseResponseBody;
import com.ssafy.PloMeet.api.response.UserRes;
import com.ssafy.PloMeet.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
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

    //회원 가입
    @PostMapping
    public ResponseEntity signUp(@RequestBody UserRegisterReq userRegisterReq) {
        Map<String, Object> responseMap = new HashMap<>();
        Long userId = userService.signUp(userRegisterReq);
        responseMap.put("userId", userId);
        return ResponseEntity.status(HttpStatus.OK).body(responseMap);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<? extends BaseResponseBody> updateProfile(@RequestBody ProfileReq profileReq){

        userService.updateProfile(profileReq);

        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(200, "변경완료"));
    }

    @PutMapping("/delete/{userId}")
    public ResponseEntity deleteUser(@PathVariable("userId") Long userId){
        userService.deleteUser(userId);
        return null;
    }
}






















