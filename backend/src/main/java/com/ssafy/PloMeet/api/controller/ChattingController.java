package com.ssafy.PloMeet.api.controller;

import com.ssafy.PloMeet.api.response.MeetingRes;
import com.ssafy.PloMeet.api.response.UserRes;
import com.ssafy.PloMeet.api.service.ChattingService;
import com.ssafy.PloMeet.api.service.MeetingService;
import com.ssafy.PloMeet.model.entity.Meeting;
import com.ssafy.PloMeet.model.entity.User;
import com.ssafy.PloMeet.model.entity.MyMeeting;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/chat")
public class ChattingController {
    private final ChattingService chattingService;

    //모임 전체 조회
    @GetMapping("/{meetingId}")
    public ResponseEntity<Object> findAllSubscriber(@PathVariable("meetingId") Meeting meetingId) {
        try {
            List<User> users = chattingService.findAllSubscriber(meetingId);
            return ResponseEntity.status(HttpStatus.OK).body(users);
        }catch(NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

    }
}
