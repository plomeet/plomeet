package com.ssafy.PloMeet.api.service;

import com.ssafy.PloMeet.api.request.MeetingReq;
import com.ssafy.PloMeet.api.response.MeetingRes;
import com.ssafy.PloMeet.model.entity.Meeting;
import com.ssafy.PloMeet.model.repository.MeetingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MeetingServiceImpl implements MeetingService{

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

    //모임 전체 조회
    public List<MeetingRes> findAllMeeting() {
        List<Meeting> meetings = new ArrayList<>();
        meetings = meetingRepository.findAll();
        return meetings.stream()
                .map(MeetingRes::new)
                .collect(Collectors.toList());
    }

    //모임 수정
    @Transactional
    public void updateMeeting(Long meetingId, MeetingReq meetingReq) {
        Meeting meeting = meetingRepository.findById(meetingId).orElseThrow(() -> new IllegalArgumentException("[존재하지 않는 모임] MeetingId : " + meetingId));
        meeting.updateMeeting(meetingReq);
    }

}
