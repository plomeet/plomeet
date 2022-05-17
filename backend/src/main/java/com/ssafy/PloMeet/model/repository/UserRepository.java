package com.ssafy.PloMeet.model.repository;

import com.ssafy.PloMeet.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    @Override
    Optional<User> findById(Long id);
    Optional<User> findByKakaoUserId(Long kakaoUserId);

    User findByUserId(Long userId);
}
