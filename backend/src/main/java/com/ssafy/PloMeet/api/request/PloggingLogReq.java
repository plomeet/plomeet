package com.ssafy.PloMeet.api.request;

import com.ssafy.PloMeet.model.entity.Coord;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
import java.util.Date;

@Getter
@Setter
@ToString
//@ApiModel("PloggingLogRequest")
public class PloggingLogReq {
    private long userId;
    private float plogDist;
    private String plogTime;
    private String plogWeather;
    private String plogDate;
    private List<Coord> route;
}
