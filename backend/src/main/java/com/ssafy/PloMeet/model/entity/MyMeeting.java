package com.ssafy.PloMeet.model.entity;

import lombok.Getter;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Getter
@DynamicInsert
public class MyMeeting {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long myMeetingId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meetingId")
    private Meeting meetingId;

    @Column(columnDefinition = "tinyInt(1) default false")
    private Boolean isLeave;

    @Column(columnDefinition = "tinyInt(1) default false")
    private String isLeader;

}
