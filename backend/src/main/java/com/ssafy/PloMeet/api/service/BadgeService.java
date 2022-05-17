package com.ssafy.PloMeet.api.service;

import com.ssafy.PloMeet.api.response.BadgeRes;

import java.util.List;

public interface BadgeService {
    public List<BadgeRes> findBadgesByUserId(Long userId);
    public BadgeRes findBadgeInfoByUserId(Long userId, Long badgeId);
}
