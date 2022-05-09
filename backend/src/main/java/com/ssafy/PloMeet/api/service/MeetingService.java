package com.ssafy.PloMeet.api.service;

import com.ssafy.PloMeet.api.request.MeetingReq;
import com.ssafy.PloMeet.api.response.MeetingRes;
import com.ssafy.PloMeet.model.entity.Meeting;
import com.ssafy.PloMeet.model.repository.MeetingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class MeetingService {

    private final MeetingRepository meetingRepository;

    //모임 개설
    @Transactional
    public Long createMeeting(MeetingReq meetingReq) {
        Meeting meeting = meetingReq.toEntity();
        return meetingRepository.save(meeting).getMeetingId();
    }

    //모임 상세정보 조회
    @Transactional
    public MeetingRes findMeetingById(Long meetingId) {
        Meeting meeting = meetingRepository.findById(meetingId).orElseThrow(() -> new NoSuchElementException("[존재하지 않는 모임] MeetingId : " + meetingId));
        return new MeetingRes(meeting);
    }
}
