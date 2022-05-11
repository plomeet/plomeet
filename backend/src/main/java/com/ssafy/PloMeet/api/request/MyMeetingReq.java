package com.ssafy.PloMeet.api.request;

import com.ssafy.PloMeet.model.entity.Meeting;
import com.ssafy.PloMeet.model.entity.MyMeeting;
import com.ssafy.PloMeet.model.entity.User;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class MyMeetingReq {

    private Long userId;
    private Long meetingId;
    private Boolean isLeader;

    @Builder
    public MyMeetingReq(Long userId, Long meetingId, Boolean isLeader) {
        this.userId = userId;
        this.meetingId = meetingId;
        this.isLeader = isLeader;
    }

    public MyMeeting toEntity() {
        return MyMeeting.builder()
                .isLeader(isLeader)
                .build();
    }

}
