package com.ssafy.PloMeet.api.response;

import com.ssafy.PloMeet.model.entity.PloggingLog;
import com.ssafy.PloMeet.model.entity.Weather;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Builder
@Getter
@ToString
public class PloggingLogRes {
    private long plogId;
    private long userId;
    private float plogDist;
    private String plogTime;
    private String plogWeather;
    private String plogDate;
    private String route;

    public static List<PloggingLogRes> of(List<PloggingLog> pl){
        List<PloggingLogRes> result = new ArrayList<>();

        for(PloggingLog p : pl){
            result.add(PloggingLogRes.builder()
                            .plogId(p.getPlogId())
                            .userId(p.getUser().getUserId())
                            .plogDist(p.getPlogDist())
                            .plogTime(p.getPlogTime())
                            .plogWeather(p.getPlogWeather().getDesc())
                            .plogDate(p.getPlogDate())
                            .route(p.getRoute())
                            .build()
                    );
        }
        return result;
    }
}
