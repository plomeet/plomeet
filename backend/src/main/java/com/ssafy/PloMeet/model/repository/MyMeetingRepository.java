package com.ssafy.PloMeet.model.repository;

import com.ssafy.PloMeet.model.entity.Meeting;
import com.ssafy.PloMeet.model.entity.MyMeeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MyMeetingRepository extends JpaRepository<MyMeeting, Long> {

    // 일반 SQL쿼리
    @Query(value = "select myMeetingId, userId, meetingId, isLeave, isLeader from MyMeeting where userId= :userId", nativeQuery = true)
    List<MyMeeting> findAllByUserId(Long userId);

    public List<MyMeeting> findAllByMeetingId(Meeting meetingId);

}
