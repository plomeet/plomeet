package com.ssafy.PloMeet.api.service;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ssafy.PloMeet.api.request.MeetingReq;
import com.ssafy.PloMeet.api.request.MyMeetingReq;
import com.ssafy.PloMeet.api.response.UserRes;
import com.ssafy.PloMeet.api.response.MeetingRes;
import com.ssafy.PloMeet.model.entity.Meeting;
import com.ssafy.PloMeet.model.entity.User;
import com.ssafy.PloMeet.model.entity.MyMeeting;
import com.ssafy.PloMeet.model.repository.MeetingRepository;
import com.ssafy.PloMeet.model.repository.MyMeetingRepository;
import com.ssafy.PloMeet.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ChattingServiceImpl implements ChattingService{

    private final UserRepository userRepository;
    private final MyMeetingRepository mymeetingRepository;

    /*
    @Transactional
    public List<User> findAllSubscriber(Long meetingId) {
        List<User> users = new ArrayList<>();
        users = userRepository.findAll();

        return users;
    }*/


    @Transactional
    public List<User> findAllSubscriber(Meeting meetingId) {
        List<MyMeeting> mm = mymeetingRepository.findAllByMeetingId(meetingId);
        List<User> user = new ArrayList<>();
        mm.forEach(
                us -> user.add(userRepository.findByUserId(us.getUserId().getUserId()))
        );

        return user;
    }


}
