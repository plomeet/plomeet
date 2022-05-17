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
            return ResponseEntity.status(HttpStatus.OK).body(badgesRes);
        }catch (IllegalArgumentException e) {
            Map<String, Object> responseMap = new HashMap<>();
            responseMap.put("errorMsg", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseMap);
        }
    }

    @GetMapping("/{userId}/{badgeId}")
    public ResponseEntity<Object> findBadgesByUserId(@PathVariable("userId") Long userId, @PathVariable("badgeId") Long badgeId ){
        try{
            BadgeRes badgesRes = badgeService.findBadgeInfoByUserId(userId, badgeId);
            return ResponseEntity.status(HttpStatus.OK).body(badgesRes);
        }catch (IllegalArgumentException e) {
            Map<String, Object> responseMap = new HashMap<>();
            responseMap.put("errorMsg", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseMap);
        }
    }

    @PostMapping("/get")
    public ResponseEntity<Object> insertGetBadgeInfoByUserId(@RequestBody MyBadgeReq myBadgeReq) {
        Map<String, Object> responseMap = new HashMap<>();
        try{
            BadgeRes badgeRes = badgeService.findBadgeInfoByUserId(myBadgeReq.getUserId(), myBadgeReq.getBadgeId());
            if(badgeRes.getIsOwned()) {
                responseMap.put("msg", "이미 획득하였습니다.");
                return ResponseEntity.status(HttpStatus.OK).body(responseMap);
            }
            Long myBadgeId = myBadgeService.insertGetBadgeInfoByUserId(myBadgeReq);
            responseMap.put("myBadgeId", myBadgeId);
        }catch (IllegalArgumentException e){
            responseMap.put("errorMsg", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseMap);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(responseMap);
    }
}

