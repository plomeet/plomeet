package com.ssafy.PloMeet.model.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Badge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long badgeId;

    @Column
    private String badgeTitle;

    @Column
    private String badgeInfo;

    @Column
    private String badgeImg;
}
