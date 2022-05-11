package com.ssafy.PloMeet.api.controller;


import com.ssafy.PloMeet.api.response.ChattingListRes;
import com.ssafy.PloMeet.api.service.ChattingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/chat")
public class ChattingController {

    private final ChattingService chattingService;

    @GetMapping("/{userId}")
    public ResponseEntity<Object> findMeetingById(@PathVariable("userId") Long userId) {
        try {
            ChattingListRes chattingRoomInfos = chattingService.findMeetingByUserIdForChatList(userId);
            return ResponseEntity.status(HttpStatus.OK).body(chattingRoomInfos);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
