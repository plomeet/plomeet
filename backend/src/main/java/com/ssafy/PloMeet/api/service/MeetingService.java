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

public interface MeetingService {

    Long createMeeting(MeetingReq meetingReq);
    MeetingRes findMeetingById(Long meetingId);
    List<MeetingRes> findAllMeeting();
    void updateMeeting(Long meetingId, MeetingReq meetingReq);

}
