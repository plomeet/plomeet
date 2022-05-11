package com.ssafy.PloMeet.model.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Getter
@DynamicInsert
@NoArgsConstructor
public class MyMeeting {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long myMeetingId;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "userId")
    private User userId;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Meeting.class)
    @JoinColumn(name = "meetingId")
    private Meeting meetingId;

    @Column(columnDefinition = "tinyInt(1) default false")
    private Boolean isLeave;

    @Column(columnDefinition = "tinyInt(1) default false")
    private Boolean isLeader;

    @Builder
    public MyMeeting(User userId, Meeting meetingId, Boolean isLeader) {
        this.userId = userId;
        this.meetingId = meetingId;
        this.isLeader = isLeader;
    }

    public void mapUser(User userId) {
        this.userId = userId;
    }

    public void mapMeeting(Meeting meetingId) {
        this.meetingId = meetingId;
    }
}
