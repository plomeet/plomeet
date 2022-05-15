package com.ssafy.PloMeet.api.request;

import com.ssafy.PloMeet.model.entity.MyBadge;
import lombok.Builder;
import lombok.Getter;

@Getter
public class MyBadgeReq {

    private Long userId;
    private Long badgeId;

    @Builder
    public MyBadgeReq(Long userId, Long badgeId){
        this.userId = userId;
        this.badgeId = badgeId;
    }

    public MyBadge toEntity(){
        return MyBadge.builder()
                .build();
    }
}
