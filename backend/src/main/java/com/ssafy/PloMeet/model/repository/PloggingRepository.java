package com.ssafy.PloMeet.model.repository;

import com.ssafy.PloMeet.model.entity.PloggingLog;
import com.ssafy.PloMeet.model.entity.Trashcan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PloggingRepository extends JpaRepository<PloggingLog, String> {
}
