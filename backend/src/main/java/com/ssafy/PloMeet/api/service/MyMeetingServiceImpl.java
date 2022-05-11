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

@RequiredArgsConstructor
@Service
public class MyMeetingServiceImpl implements MyMeetingService{

    private final MyMeetingRepository myMeetingRepository;

    private final UserRepository userRepository;

    private final MeetingRepository meetingRepository;

    @Transactional
    public Long joinMeeting(MyMeetingReq myMeetingReq) {
        User userId = userRepository.findById(myMeetingReq.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("해당하는 유저가 존재하지 않습니다. UserId = " + myMeetingReq.getUserId()));
        Meeting meetingId = meetingRepository.findById(myMeetingReq.getMeetingId())
                .orElseThrow(() -> new IllegalArgumentException("해당하는 모임이 존재하지 않습니다. MeetingId = " + myMeetingReq.getMeetingId()));
        MyMeeting myMeeting = myMeetingReq.toEntity();
        myMeeting.mapUser(userId);
        myMeeting.mapMeeting(meetingId);
        return myMeetingRepository.save(myMeeting).getMyMeetingId();
    }
}
