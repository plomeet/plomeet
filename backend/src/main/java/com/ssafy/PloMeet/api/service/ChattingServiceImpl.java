package com.ssafy.PloMeet.api.service;

import com.ssafy.PloMeet.api.response.ChattingListRes;
import com.ssafy.PloMeet.api.response.MeetingRes;
import com.ssafy.PloMeet.model.entity.MyMeeting;
import com.ssafy.PloMeet.model.entity.User;
import com.ssafy.PloMeet.model.repository.MeetingRepository;
import com.ssafy.PloMeet.model.repository.MyMeetingRepository;
import com.ssafy.PloMeet.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ChattingServiceImpl implements ChattingService{

    private final MeetingRepository meetingRepository;
    private final MyMeetingRepository myMeetingRepository;
    private final UserRepository userRepository;


    @Transactional
    public ChattingListRes findMeetingByUserIdForChatList(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당하는 사용자가 존재하지 않습니다. userId = " + userId));
        List<MyMeeting> myMeetingList = myMeetingRepository.findAllByUserId(user);

        List<String> meetingIds = new ArrayList<>();
        HashMap<Long, MeetingRes> meetingInfos = new HashMap<>();
        for(MyMeeting myMeeting:myMeetingList){
            Long meetingId = myMeeting.getMeetingId().getMeetingId();
            meetingIds.add(meetingId.toString());
            meetingInfos.put(meetingId, new MeetingRes(myMeeting.getMeetingId()));
        }
        return new ChattingListRes(meetingIds, meetingInfos);
    }


}
