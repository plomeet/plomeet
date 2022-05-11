package com.ssafy.PloMeet.api.response;

import com.ssafy.PloMeet.model.entity.Meeting;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class MeetingRes {

    //    private Long meetingId;
    private String meetingImg;
    private String meetingName;
    private String meetingDesc;
    private String meetingPlace;
    private String meetingPlaceDetail;
    private Double lat;
    private Double lng;
    private int memberMax;
    private Boolean isActivate;

    private String  meetingDate;
    private LocalDateTime  registerDate;
    private String item;
    private int memberCnt;


    @Builder
    public MeetingRes(String meetingImg, String meetingName, String meetingDesc, String meetingPlace, String meetingPlaceDetail, Double lat, Double lng, int memberMax, String meetingDate, String item) {
        this.meetingImg = meetingImg;
        this.meetingName = meetingName;
        this.meetingDesc = meetingDesc;
        this.meetingPlace = meetingPlace;
        this.meetingPlaceDetail = meetingPlaceDetail;
        this.lat = lat;
        this.lng = lng;
        this.memberMax = memberMax;
        this.meetingDate = meetingDate;
        this.item = item;
    }

    public MeetingRes(Meeting meeting) {
        this.meetingImg = meeting.getMeetingImg();
        this.meetingName = meeting.getMeetingName();
        this.meetingDesc = meeting.getMeetingDesc();
        this.meetingPlace = meeting.getMeetingPlace();
        this.meetingPlaceDetail = meeting.getMeetingPlaceDetail();
        this.lat = meeting.getLat();
        this.lng = meeting.getLng();
        this.memberMax = meeting.getMemberMax();
        this.meetingDate = meeting.getMeetingDate();
        this.item = meeting.getItem();
    }

}
