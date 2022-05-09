package com.ssafy.PloMeet.api.service;

import com.ssafy.PloMeet.model.entity.PloggingLog;
import com.ssafy.PloMeet.model.repository.PloggingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class PloggingServiceImpl implements PloggingService{

    @Autowired
    PloggingRepository ploggingRepo;

    @Override
    public PloggingLog insertPloggingLog(PloggingLog ploggingLog) throws Exception {
        return ploggingRepo.save(ploggingLog);
    }
}
