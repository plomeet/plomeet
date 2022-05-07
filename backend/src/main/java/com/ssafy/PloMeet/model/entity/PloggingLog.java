package com.ssafy.PloMeet.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import springfox.documentation.spring.web.json.Json;

import javax.persistence.*;
import java.util.Date;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class PloggingLog {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long plogId;
    private long userId;
    @Column
    private float plogDist;
    @Column
    private int plogTime;
    @Enumerated(EnumType.STRING)
    @Column
    private Weather plogWeather;
    @Column
    private Date plogDate;
    private Json imgs;
    private Json route;
}