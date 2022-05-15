package com.ssafy.PloMeet.model.repository;

import com.ssafy.PloMeet.model.entity.Badge;
import com.ssafy.PloMeet.model.entity.MyBadge;
import com.ssafy.PloMeet.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MyBadgeRepository extends JpaRepository<MyBadge, Long> {
    boolean existsByUserIdAndBadgeId(User user, Badge badge);
}
