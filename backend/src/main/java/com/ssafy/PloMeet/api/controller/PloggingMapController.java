package com.ssafy.PloMeet.api.controller;

import com.ssafy.PloMeet.api.response.AdvancedResponseBody;
import com.ssafy.PloMeet.api.response.BaseResponseBody;
import com.ssafy.PloMeet.api.response.TrashcanRes;
import com.ssafy.PloMeet.model.entity.Trashcan;
import com.ssafy.PloMeet.model.repository.TrashcanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PloggingMapController {

    @Autowired
    TrashcanRepository trashcanRepo;

    @GetMapping("/trashcans")
    public ResponseEntity<? extends BaseResponseBody> getTrashcans() {
        List<Trashcan> trList = null;
        try {
            trList = trashcanRepo.findAll();
            if(trList == null || trList.size() == 0)
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(BaseResponseBody.of(204, "휴지통 정보가 없습니다."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(BaseResponseBody.of(503, "..."));
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(new AdvancedResponseBody<List<TrashcanRes>>(200, "쓰레기통 조회 성공", TrashcanRes.of(trList)));
    }
}
