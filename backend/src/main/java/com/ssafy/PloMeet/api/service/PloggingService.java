package com.ssafy.PloMeet.api.service;

import com.ssafy.PloMeet.api.request.PloggingLogReq;
import com.ssafy.PloMeet.model.entity.PloggingLog;
import com.ssafy.PloMeet.model.entity.User;

import java.util.List;
import java.util.Optional;

public interface PloggingService {
    PloggingLog insertPloggingLog(Optional<User> user, PloggingLogReq insertLog) throws Exception;
    List<PloggingLog> getPloggingLogs (Optional<User> user) throws Exception;
}
