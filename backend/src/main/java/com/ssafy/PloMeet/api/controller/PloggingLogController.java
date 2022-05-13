package com.ssafy.PloMeet.api.controller;

import com.ssafy.PloMeet.api.request.PloggingLogReq;
import com.ssafy.PloMeet.api.response.AdvancedResponseBody;
import com.ssafy.PloMeet.api.response.BaseResponseBody;
import com.ssafy.PloMeet.api.response.PloggingLogRes;
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
    PloggingServiceImpl ploggingService;


    @PostMapping("/ploggings")
    public ResponseEntity<? extends BaseResponseBody> insertPloggingLog( @RequestBody PloggingLogReq insertLog ) {
        try {
            Optional<User> user = userService.getUserInfo(insertLog.getUserId());
            PloggingLog saveLog = ploggingService.insertPloggingLog(user, insertLog);
            if(saveLog == null )
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(BaseResponseBody.of(204, "저장 실패"));
            return ResponseEntity.status(HttpStatus.OK)
                    .body(AdvancedResponseBody.of(200, "저장 성공", saveLog.getPlogId()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(BaseResponseBody.of(503, "..."));
        }
    }

    @GetMapping("/ploggings/{userId}")
    public ResponseEntity<? extends BaseResponseBody> getPloggingLogs (@PathVariable("userId") Long userId ){
        try {
            Optional<User> user = userService.getUserInfo(userId);
            List<PloggingLog> savedLogs = ploggingService.getPloggingLogs(user);
            if(savedLogs == null || (savedLogs != null && savedLogs.size() <= 0 ))
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(BaseResponseBody.of(204, "기록이 없어용"));
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new AdvancedResponseBody<List<PloggingLogRes>>(200, "기록 조회 성공", PloggingLogRes.of(savedLogs)));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(BaseResponseBody.of(503, "..."));
        }
    }
}
