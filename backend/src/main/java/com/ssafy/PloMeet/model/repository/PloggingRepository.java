package com.ssafy.PloMeet.model.repository;

import com.ssafy.PloMeet.model.entity.PloggingLog;
import com.ssafy.PloMeet.model.entity.Trashcan;
import com.ssafy.PloMeet.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PloggingRepository extends JpaRepository<PloggingLog, String> {
    List<PloggingLog> findAllByUser (User user);
}
