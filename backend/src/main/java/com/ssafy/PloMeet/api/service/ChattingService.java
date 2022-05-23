package com.ssafy.PloMeet.api.service;

import com.ssafy.PloMeet.api.response.ChattingMemberRes;
import com.ssafy.PloMeet.model.entity.Meeting;

import java.util.List;

public interface ChattingService {

    List<ChattingMemberRes> findAllSubscriber(Meeting meetingId);
}
