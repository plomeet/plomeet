package com.ssafy.PloMeet.api.service;

import com.ssafy.PloMeet.api.request.MyBadgeReq;
import com.ssafy.PloMeet.model.entity.Badge;
import com.ssafy.PloMeet.model.entity.MyBadge;
import com.ssafy.PloMeet.model.entity.User;
import com.ssafy.PloMeet.model.repository.BadgeRepository;
import com.ssafy.PloMeet.model.repository.MyBadgeRepository;
import com.ssafy.PloMeet.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class MyBadgeServiceImpl implements MyBadgeService{

    private final UserRepository userRepository;
    private final BadgeRepository badgeRepository;
    private final MyBadgeRepository myBadgeRepository;

    @Transactional
    public Long insertGetBadgeInfoByUserId(MyBadgeReq myBadgeReq){
        User user = userRepository.findById(myBadgeReq.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("잘못된 사용자 번호입니다.:: "+myBadgeReq.getUserId()));
        Badge badge = badgeRepository.findById(myBadgeReq.getBadgeId())
                .orElseThrow(() -> new IllegalArgumentException("잘못된 뱃지 번호입니다.:: "+myBadgeReq.getBadgeId()));

        MyBadge myBadge = new MyBadge();
        myBadge.mapUser(user);
        myBadge.mapBadge(badge);
        return myBadgeRepository.save(myBadge).getMyBadgeId();
    }
}
