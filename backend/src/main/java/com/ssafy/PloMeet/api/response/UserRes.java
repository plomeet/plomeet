package com.ssafy.PloMeet.api.response;

import com.ssafy.PloMeet.model.entity.User;
import lombok.Builder;
import lombok.Getter;

@Getter
public class UserRes {

    Long userId;

    Long kakaoUserId;

    String userNickName;

    String userProfileImg;

    String userName;

    String userEmail;

    String isDelete;


    @Builder
    public UserRes(Long userId, Long kakaoUserId, String userNickName, String userProfileImg, String userName, String userEmail, String isDelete) {
        this.userId = userId;
        this.kakaoUserId = kakaoUserId;
        this.userNickName = userNickName;
        this.userProfileImg = userProfileImg;
        this.userName = userName;
        this.userEmail = userEmail;
        this.isDelete = isDelete;
    }

    public UserRes(User user){
        this.userId = user.getUserId();
        this.kakaoUserId = user.getKakaoUserId();
        this.userNickName = user.getUserNickName();
        this.userProfileImg = user.getUserProfileImg();
        this.userName = user.getUserName();
        this.userEmail = user.getUserEmail();
        this.isDelete = user.getIsDelete().getCode();
    }
}
