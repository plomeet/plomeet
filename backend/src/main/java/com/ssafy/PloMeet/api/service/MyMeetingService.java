package com.ssafy.PloMeet.api.service;

import com.ssafy.PloMeet.api.request.MyMeetingReq;
import com.ssafy.PloMeet.model.entity.MyMeeting;

import java.util.List;

public interface MyMeetingService {

    Long joinMeeting(MyMeetingReq myMeetingReq);
    List<MyMeeting> findMeetingListByUserId(Long userId);

}
