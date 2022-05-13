package com.ssafy.PloMeet.api.controller;

import com.ssafy.PloMeet.api.request.MyBadgeReq;
import com.ssafy.PloMeet.api.response.BadgeRes;
import com.ssafy.PloMeet.api.service.BadgeService;
import com.ssafy.PloMeet.api.service.MyBadgeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/badges")
public class BadgeController {

    private final BadgeService badgeService;
    private final MyBadgeService myBadgeService;

    @GetMapping("/{userId}")
    public ResponseEntity<Object> findBadgesByUserId(@PathVariable("userId") Long userId){
        try{
            List<BadgeRes> badgesRes = badgeService.findBadgesByUserId(userId);
            if(badgesRes.isEmpty()) return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
            return ResponseEntity.status(HttpStatus.OK).body(badgesRes);
        }catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/get")
    public ResponseEntity<Object> insertGetBadgeInfoByUserId(@RequestBody MyBadgeReq myBadgeReq) {
        Map<String, Object> responseMap = new HashMap<>();
        try{
            responseMap.put("myBadgeId", myBadgeService.insertGetBadgeInfoByUserId(myBadgeReq));
        }catch (IllegalArgumentException e){
            responseMap.put("errorMsg", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseMap);
        }
        return ResponseEntity.status(HttpStatus.OK).body(responseMap);
    }
}

