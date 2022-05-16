package com.ssafy.PloMeet.api.controller;

import com.ssafy.PloMeet.api.request.MyMeetingReq;
import com.ssafy.PloMeet.api.service.MyMeetingService;
import com.ssafy.PloMeet.api.service.UserServiceImpl;
import com.ssafy.PloMeet.model.entity.MyMeeting;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("")
public class MyMeetingController {

    @Autowired
    UserServiceImpl userService;

    private final MyMeetingService myMeetingService;

    //모임 가입
    @PostMapping("/meetings")
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

    // 내가 가입한 미팅 리스트 조회
    @GetMapping("/mymeetings/{userId}")
    public ResponseEntity<Object> findMeetingListByUserId(@PathVariable Long userId) {
        List<MyMeeting> myMeetings;
        try {
            myMeetings = myMeetingService.findMeetingListByUserId(userId);
        } catch (IllegalArgumentException e) {
            Map<String, Object> responseMap = new HashMap<>();
            responseMap.put("errorMsg", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseMap);
        }

        if (myMeetings.isEmpty()) return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        return ResponseEntity.status(HttpStatus.OK).body(myMeetings);
    }

}
