package com.ssafy.PloMeet.api.request;

import com.ssafy.PloMeet.model.entity.Meeting;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class MeetingReq {

//    private Long meetingId;
    private String meetingImg;
    private String meetingName;
    private String meetingDesc;
    private String meetingPlace;
    private String meetingPlaceDetail;
    private Double lat;
    private Double lng;
    private Integer memberMax;
    private Boolean isActivate;

    private String  meetingDate;
    private LocalDateTime  registerDate;
    private String item;
    private Integer memberCnt;


    @Builder
    public MeetingReq(String meetingImg, String meetingName, String meetingDesc, String meetingPlace, String meetingPlaceDetail, Double lat, Double lng, Integer memberMax, String meetingDate, String item, Boolean isActivate, LocalDateTime registerDate, Integer memberCnt) {
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


    public Meeting toEntity() {
        return Meeting.builder()
                .meetingImg(meetingImg)
                .meetingName(meetingName)
                .meetingDesc(meetingDesc)
                .meetingPlace(meetingPlace)
                .meetingPlaceDetail(meetingPlaceDetail)
                .lat(lat)
                .lng(lng)
                .memberMax(memberMax)
                .meetingDate(meetingDate)
                .item(item)
                .build();
    }

}
