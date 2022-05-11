package com.ssafy.PloMeet.api.controller;

import com.ssafy.PloMeet.api.request.MeetingReq;
import com.ssafy.PloMeet.api.request.MyMeetingReq;
import com.ssafy.PloMeet.api.service.MeetingService;
import com.ssafy.PloMeet.api.service.MyMeetingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/meetings")
public class MyMeetingController {

    private final MyMeetingService myMeetingService;

    //모임 가입
    @PostMapping("")
    public ResponseEntity<Object> joinMeeting(@RequestBody MyMeetingReq myMeetingReq) {
        Map<String, Object> responseMap = new HashMap<>();
        try {
            responseMap.put("myMeetingId", myMeetingService.joinMeeting(myMeetingReq));
        } catch (IllegalArgumentException e) {
            responseMap.put("errorMsg", e.getMessage());
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(responseMap);
        }
        return ResponseEntity.status(HttpStatus.OK).body(responseMap);
    }
}
