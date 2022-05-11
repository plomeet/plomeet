package com.ssafy.PloMeet.api.service;

import com.ssafy.PloMeet.api.response.ChattingListRes;

public interface ChattingService {
    ChattingListRes findMeetingByUserIdForChatList(Long userId);
}
