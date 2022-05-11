package com.ssafy.PloMeet.api.request;

import com.ssafy.PloMeet.model.entity.User;
import lombok.Builder;

public class UserRegisterReq {

    private Long userId;

    private Long kakaoUserId;

    private String userNickName;

    private String userProfileImg;

    private String userName;

    private String userEmail;

    private Boolean idDelete;

    @Builder
    public UserRegisterReq(Long kakaoUserId, String userNickName, String userProfileImg, String userName, String userEmail) {
        this.kakaoUserId = kakaoUserId;
        this.userNickName = userNickName;
        this.userProfileImg = userProfileImg;
        this.userName = userName;
        this.userEmail = userEmail;
    }

    public User toEntity() {
        return User.builder()
                .kakaoUserId(kakaoUserId)
                .userNickName(userNickName)
                .userProfileImg(userProfileImg)
                .userName(userName)
                .userEmail(userEmail)
                .build();
    }
}
