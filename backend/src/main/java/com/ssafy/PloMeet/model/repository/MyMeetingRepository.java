package com.ssafy.PloMeet.model.repository;

import com.ssafy.PloMeet.model.entity.MyMeeting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MyMeetingRepository extends JpaRepository<MyMeeting, Long> {

}
