package com.ssafy.PloMeet.api.service;

import com.ssafy.PloMeet.model.entity.PloggingLog;

public interface PloggingService {
    PloggingLog insertPloggingLog(PloggingLog ploggingLog) throws Exception;
}
