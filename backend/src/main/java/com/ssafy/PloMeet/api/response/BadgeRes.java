package com.ssafy.PloMeet.api.response;

import com.ssafy.PloMeet.model.entity.Badge;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BadgeRes {
    private Long badgeId;
    private String badgeTitle;
    private String badgeInfo;
    private String badgeImg;
    private Boolean isOwned;

    @Builder
    public BadgeRes(Long badgeId, String badgeTitle, String badgeInfo, String badgeImg, Boolean isOwned){
        this.badgeId = badgeId;
        this.badgeTitle = badgeTitle;
        this.badgeInfo = badgeInfo;
        this.badgeImg = badgeImg;
        this.isOwned = isOwned;
    }

    @Builder
    public BadgeRes(Badge badge, Boolean isOwned){
        this.badgeId = badge.getBadgeId();
        this.badgeTitle = badge.getBadgeTitle();
        this.badgeInfo = badge.getBadgeInfo();
        this.badgeImg = badge.getBadgeImg();
        this.isOwned = isOwned;
    }
}
