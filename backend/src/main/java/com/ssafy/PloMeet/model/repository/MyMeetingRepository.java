package com.ssafy.PloMeet.model.repository;

import com.ssafy.PloMeet.model.entity.Meeting;
import com.ssafy.PloMeet.model.entity.MyMeeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface MyMeetingRepository extends JpaRepository<MyMeeting, Long> {

    // 일반 SQL쿼리
    @Query(value = "select myMeetingId, userId, meetingId, isLeave, isLeader from MyMeeting where userId= :userId", nativeQuery = true)
    List<MyMeeting> findAllByUserId(Long userId);

    @Transactional
    @Modifying
    @Query(value = "delete from MyMeeting where userId= :userId and meetingId= :meetingId", nativeQuery = true)
    void deleteMyMeeting(Long meetingId, Long userId);

    public List<MyMeeting> findAllByMeetingId(Meeting meetingId);

    void deleteByUserId(Long userId);
}
