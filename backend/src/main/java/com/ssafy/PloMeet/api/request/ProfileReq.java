package com.ssafy.PloMeet.api.request;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ProfileReq {


    Long userId;
    String userNickName;


    @Builder
    public ProfileReq(Long userId, String userNickName){
        this.userId = userId;
        this.userNickName = userNickName;
    }


}
