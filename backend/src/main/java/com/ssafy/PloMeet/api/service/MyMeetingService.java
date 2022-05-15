package com.ssafy.PloMeet.api.service;

import com.ssafy.PloMeet.api.request.MyMeetingReq;
import com.ssafy.PloMeet.model.entity.Meeting;
import com.ssafy.PloMeet.model.entity.MyMeeting;
import com.ssafy.PloMeet.model.entity.User;
import com.ssafy.PloMeet.model.repository.MeetingRepository;
import com.ssafy.PloMeet.model.repository.MyMeetingRepository;
import com.ssafy.PloMeet.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

public interface MyMeetingService {

    Long joinMeeting(MyMeetingReq myMeetingReq);

}
