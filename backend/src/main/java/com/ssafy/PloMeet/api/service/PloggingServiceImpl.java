package com.ssafy.PloMeet.api.service;

import com.ssafy.PloMeet.api.request.PloggingLogReq;
import com.ssafy.PloMeet.api.response.BaseResponseBody;
import com.ssafy.PloMeet.common.util.RouteJsonParser;
import com.ssafy.PloMeet.model.entity.PloggingLog;
import com.ssafy.PloMeet.model.entity.User;
import com.ssafy.PloMeet.model.entity.Weather;
import com.ssafy.PloMeet.model.repository.PloggingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class PloggingServiceImpl implements PloggingService{

    @Autowired
    PloggingRepository ploggingRepo;

    @Autowired
    RouteJsonParser rjp;

    @Override
    public PloggingLog insertPloggingLog(Optional<User> user, PloggingLogReq insertLog) throws Exception {
        String routeJson = rjp.getArrayToJsonString(insertLog.getRoute());
        Weather weather = null;
        if(user.isPresent()){
            for(Weather w : Weather.values()){
                if(w.getDesc().equals(insertLog.getPlogWeather()))
                    weather = w;
            }
        }else{
            System.out.println("해당 회원이 없습니다.");
            return null;
        }
        return ploggingRepo.save(PloggingLog.builder()
                .user(user.get()).plogDist(insertLog.getPlogDist())
                .plogTime(insertLog.getPlogTime()).plogDate(insertLog.getPlogDate())
                .plogWeather(weather).route(routeJson).build());
    }
}
