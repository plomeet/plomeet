package com.ssafy.PloMeet.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChattingMemberRes {

    private Long userId;
    private String userNickName;
    private String userProfileImg;
    private Boolean isLeader;

    @Builder
    public ChattingMemberRes(Long userId, String userNickName, String userProfileImg, Boolean isLeader){
        this.userId = userId;
        this.userNickName = userNickName;
        this.userProfileImg = userProfileImg;
        this.isLeader = isLeader;
    }
}
