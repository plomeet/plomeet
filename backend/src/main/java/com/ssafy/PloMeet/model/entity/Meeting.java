package com.ssafy.PloMeet.model.entity;

import com.ssafy.PloMeet.api.request.MeetingReq;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@DynamicInsert
@NoArgsConstructor
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long meetingId;

    @Column(columnDefinition = "VARCHAR(100) DEFAULT 'https://i.postimg.cc/QtNKqGGJ/default-Meeting-Img.png'")
    private String meetingImg;

    @Column(nullable = false, length = 25)
    private String meetingName;

    @Column(nullable = false, length = 1000)
    private String meetingDesc;

    @Column(nullable = false, length = 10)
    private String meetingPlace;

    @Column(nullable = false, length = 100)
    private String meetingPlaceDetail;

    @Column(nullable = false, columnDefinition = "DECIMAL(8,6)")
    private Double lat;

    @Column(nullable = false, columnDefinition = "DECIMAL(9,6)")
    private Double lng;

    @Column(nullable = false, columnDefinition = "INTEGER(2)")
    private Integer memberMax;

    @Column(columnDefinition = "tinyInt(1) default true")
    private Boolean isActivate;

    private String  meetingDate;

    @Column(nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime  registerDate;

    @Column(nullable = false, length = 100)
    private String item;

    @Column(columnDefinition = "INTEGER(3) DEFAULT 1")
    private Integer memberCnt;

    @Builder
    public Meeting(String meetingImg, String meetingName, String meetingDesc, String meetingPlace, String meetingPlaceDetail, Double lat, Double lng, Integer memberMax, String meetingDate, String item, Boolean isActivate, LocalDateTime registerDate, Integer memberCnt) {
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

    public void updateMeeting(MeetingReq meetingReq) {
        this.meetingImg = meetingReq.getMeetingImg();
        this.meetingName = meetingReq.getMeetingName();
        this.meetingDesc = meetingReq.getMeetingDesc();
        this.meetingPlace = meetingReq.getMeetingPlace();
        this.meetingPlaceDetail = meetingReq.getMeetingPlaceDetail();
        this.lat = meetingReq.getLat();
        this.lng = meetingReq.getLng();
        this.memberMax = meetingReq.getMemberMax();
        this.meetingDate = meetingReq.getMeetingDate();
        this.item = meetingReq.getItem();
    }
}
