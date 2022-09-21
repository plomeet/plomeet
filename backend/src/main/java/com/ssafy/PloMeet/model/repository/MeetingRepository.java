package com.ssafy.PloMeet.model.repository;

import com.ssafy.PloMeet.model.entity.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    Optional<Meeting> findByMeetingId(Long meetingId);
}
