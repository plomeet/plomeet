package com.ssafy.PloMeet.model.repository;

import com.ssafy.PloMeet.model.entity.Meeting;
import com.ssafy.PloMeet.model.entity.MyMeeting;
import com.ssafy.PloMeet.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MyMeetingRepository extends JpaRepository<MyMeeting, Long> {

    public List<MyMeeting> findAllByMeetingId(Meeting meetingId);
}
