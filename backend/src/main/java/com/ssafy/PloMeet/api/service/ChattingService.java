package com.ssafy.PloMeet.api.service;

import com.ssafy.PloMeet.api.response.MeetingRes;
import com.ssafy.PloMeet.model.entity.Meeting;
import com.ssafy.PloMeet.model.entity.MyMeeting;
import com.ssafy.PloMeet.model.entity.User;
import java.util.List;

public interface ChattingService {

    List<User> findAllSubscriber(Meeting meetingId);
}
