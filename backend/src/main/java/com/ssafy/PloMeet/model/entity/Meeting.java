package com.ssafy.PloMeet.model.entity;

import lombok.Getter;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@DynamicInsert
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
    private int memberMax;

    @Column(columnDefinition = "tinyInt(1) default true")
    private Boolean isActivate;

    private Timestamp meetingDate;

    @Column(nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp registerDate;

    @Column(nullable = false, length = 10)
    private String item;

    @Column(nullable = false, columnDefinition = "INTEGER(3) DEFAULT 1")
    private int memberCnt;

}
