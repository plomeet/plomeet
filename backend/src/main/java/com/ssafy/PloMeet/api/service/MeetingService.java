package com.ssafy.PloMeet.api.service;

import com.ssafy.PloMeet.api.request.MeetingReq;
import com.ssafy.PloMeet.model.entity.Meeting;
import com.ssafy.PloMeet.model.repository.MeetingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class MeetingService {

    private final MeetingRepository meetingRepository;

    @Transactional
    public Long createMeeting(MeetingReq meetingReq) {
        Meeting meeting = meetingReq.toEntity();
        return meetingRepository.save(meeting).getMeetingId();
    }

}
