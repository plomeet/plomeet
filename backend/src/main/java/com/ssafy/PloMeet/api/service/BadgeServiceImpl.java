package com.ssafy.PloMeet.api.service;

import com.ssafy.PloMeet.api.response.BadgeRes;
import com.ssafy.PloMeet.model.entity.Badge;
import com.ssafy.PloMeet.model.entity.User;
import com.ssafy.PloMeet.model.repository.BadgeRepository;
import com.ssafy.PloMeet.model.repository.MyBadgeRepository;
import com.ssafy.PloMeet.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class BadgeServiceImpl implements  BadgeService{

    private final UserRepository userRepository;
    private final BadgeRepository badgeRepository;
    private final MyBadgeRepository myBadgeRepository;

    @Transactional
    public List<BadgeRes> findBadgesByUserId(Long userId){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("잘못된 사용자 번호입니다:: "+userId));
        List<Badge> badges = badgeRepository.findAll();

        List<BadgeRes> badgesRes = new ArrayList<>();
        for(Badge badge : badges){
            boolean isOwned = myBadgeRepository.existsByUserIdAndBadgeId(user, badge);
            BadgeRes badgeRes = new BadgeRes(badge, isOwned);
            badgesRes.add(badgeRes);
        }
        return badgesRes;
    }

    @Override
    public BadgeRes findBadgeInfoByUserId(Long userId, Long badgeId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("잘못된 사용자 번호입니다:: "+userId));
        Badge badge = badgeRepository.findById(badgeId)
                .orElseThrow(() -> new IllegalArgumentException("잘못된 뱃지 번호입니다:: "+badgeId));
        boolean isOwned = myBadgeRepository.existsByUserIdAndBadgeId(user, badge);
        return new BadgeRes(badge, isOwned);
    }


}
