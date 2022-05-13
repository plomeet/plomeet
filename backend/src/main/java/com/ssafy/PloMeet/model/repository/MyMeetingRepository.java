package com.ssafy.PloMeet.model.repository;

import com.ssafy.PloMeet.model.entity.MyMeeting;
import com.ssafy.PloMeet.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MyMeetingRepository extends JpaRepository<MyMeeting, Long> {
}
