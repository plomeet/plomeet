package com.ssafy.PloMeet.api.request;

import com.ssafy.PloMeet.model.entity.User;
import lombok.Builder;
import lombok.Getter;

@Getter
public class UserRegisterReq {

    private Long userId;

    private Long kakaoUserId;

    private String userNickName;

    private String userProfileImg;

    private String userName;

    private String userEmail;

    private Boolean isDelete;

    @Builder
    public UserRegisterReq(Long userId, Long kakaoUserId, String userNickName, String userProfileImg, String userName, String userEmail, boolean isDelete) {
        this.userId = userId;
        this.kakaoUserId = kakaoUserId;
        this.userNickName = userNickName;
        this.userProfileImg = userProfileImg;
        this.userName = userName;
        this.userEmail = userEmail;
        this.isDelete = isDelete;
    }

    public User toEntity() {
        if(userId != 0l)
            return User.builder()
                    .userId(userId)
                    .kakaoUserId(kakaoUserId)
                    .userNickName(userNickName)
                    .userProfileImg(userProfileImg)
                    .userName(userName)
                    .userEmail(userEmail)
                    .build();
        return User.builder()
                .kakaoUserId(kakaoUserId)
                .userNickName(userNickName)
                .userProfileImg(userProfileImg)
                .userName(userName)
                .userEmail(userEmail)
                .build();
    }
}
