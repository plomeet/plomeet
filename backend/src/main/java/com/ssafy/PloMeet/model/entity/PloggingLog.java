package com.ssafy.PloMeet.model.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class PloggingLog {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long plogId;
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;
    @Column
    private float plogDist;
    @Column
    private int plogTime;

    @Column(length = 20)
    @Enumerated(EnumType.STRING)
    private Weather plogWeather;

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private Date plogDate;

    @Column(columnDefinition = "json")
    private String route;
}