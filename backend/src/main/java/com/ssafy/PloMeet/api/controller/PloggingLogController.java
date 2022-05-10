package com.ssafy.PloMeet.api.controller;

import com.ssafy.PloMeet.api.request.PloggingLogReq;
import com.ssafy.PloMeet.api.response.AdvancedResponseBody;
import com.ssafy.PloMeet.api.response.BaseResponseBody;
import com.ssafy.PloMeet.api.response.TrashcanRes;
import com.ssafy.PloMeet.api.service.PloggingServiceImpl;
import com.ssafy.PloMeet.api.service.UserServiceImpl;
import com.ssafy.PloMeet.common.util.RouteJsonParser;
import com.ssafy.PloMeet.model.entity.PloggingLog;
import com.ssafy.PloMeet.model.entity.Trashcan;
import com.ssafy.PloMeet.model.entity.User;
import com.ssafy.PloMeet.model.entity.Weather;
import com.ssafy.PloMeet.model.repository.PloggingRepository;
import com.ssafy.PloMeet.model.repository.TrashcanRepository;
import com.ssafy.PloMeet.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PloggingLogController {
    @Autowired
    UserServiceImpl userService;
    @Autowired
    RouteJsonParser rjp;
    @Autowired
    PloggingServiceImpl ploggingService;


    @PostMapping("/ploggings")
    public ResponseEntity<? extends BaseResponseBody> getTrashcans( @RequestBody PloggingLogReq insertLog ) {
        try {
            String routeJson = rjp.getArrayToJsonString(insertLog.getRoute());
            Optional<User> user = userService.getUserInfo(insertLog.getUserId());
            if(user.isPresent()){
                Weather weather = null;
                for(Weather w : Weather.values()){
                    if(w.getDesc().equals(insertLog.getPlogWeather()))
                        weather = w;
                }
                PloggingLog saveLog = ploggingService.insertPloggingLog(PloggingLog.builder()
                        .user(user.get()).plogDist(insertLog.getPlogDist())
                        .plogTime(insertLog.getPlogTime()).plogDate(insertLog.getPlogDate())
                        .plogWeather(weather).route(routeJson).build());
                if(saveLog == null )
                    return ResponseEntity.status(HttpStatus.NO_CONTENT).body(BaseResponseBody.of(204, "저장 실패"));
            }else{
                System.out.println("해당 회원이 없습니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(BaseResponseBody.of(503, "..."));
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(BaseResponseBody.of(200, "저장 성공"));
    }
}
