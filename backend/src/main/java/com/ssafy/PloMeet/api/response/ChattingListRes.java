package com.ssafy.PloMeet.api.response;

import com.ssafy.PloMeet.model.entity.Meeting;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.List;

@Getter
@NoArgsConstructor
public class ChattingListRes {

    public List<Long> meetingIds;
    public HashMap<Long, MeetingRes> meetingInfos;

    @Builder
    public ChattingListRes(List<Long> meetingIds, HashMap<Long, MeetingRes> meetingInfos){
        this.meetingIds = meetingIds;
        this.meetingInfos = meetingInfos;
    }
}
