package com.ssafy.PloMeet.model.repository;

import com.ssafy.PloMeet.model.entity.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {

}
