package com.ssafy.PloMeet.api.service;

import com.ssafy.PloMeet.api.request.MyBadgeReq;
import com.ssafy.PloMeet.model.entity.MyBadge;

public interface MyBadgeService {
    public Long insertGetBadgeInfoByUserId(MyBadgeReq myBadgeReq);
}
