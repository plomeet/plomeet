package com.ssafy.PloMeet.model.repository;

import com.ssafy.PloMeet.model.entity.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {

    // Meeting 조회 시 현재시점 이후에 진행 예정인 Meeting만 조회 가능하도록
    @Query(value = "select meetingId, meetingName, meetingDesc, meetingPlace, meetingPlaceDetail, lat, lng, memberMax, memberCnt, meetingDate, item from Meeting where meetingDate >= CURRENT_DATE()")
    List<Meeting> findAllMeetingAfterNow();

}


