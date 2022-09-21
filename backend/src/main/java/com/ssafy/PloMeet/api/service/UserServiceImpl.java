package com.ssafy.PloMeet.api.service;

import com.ssafy.PloMeet.api.request.ProfileReq;
import com.ssafy.PloMeet.api.request.UserRegisterReq;
import com.ssafy.PloMeet.api.response.UserRes;
import com.ssafy.PloMeet.model.entity.Meeting;
import com.ssafy.PloMeet.model.entity.MyMeeting;
import com.ssafy.PloMeet.model.entity.User;
import com.ssafy.PloMeet.model.entity.enumtype.IsDelete;
import com.ssafy.PloMeet.model.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final MyBadgeRepository myBadgeRepository;
    private final MyMeetingRepository myMeetingRepository;
    private final MeetingRepository meetingRepository;
    private final PloggingRepository ploggingRepository;
    //유저 정보 조회
    @Transactional
    public UserRes findUserByKakaoUserId(Long kakaoUserId) {
        User user = userRepository.findByKakaoUserId(kakaoUserId).orElseThrow(() -> new NoSuchElementException("[가입하지 않는 회원] kakaoId : " + kakaoUserId));
        return new UserRes(user);
    }

    //회원 가입
    @Transactional
    public Long signUp(UserRegisterReq userRegisterReq) {
        User user = userRegisterReq.toEntity();
        return userRepository.save(user).getUserId();
    }

    @Override
    public Optional<User> getUserInfo(Long userId) throws Exception {
        return userRepository.findById(userId);
    }

    @Transactional
    public void updateProfile(ProfileReq profileReq) {
        User user = userRepository.findById(profileReq.getUserId()).get();
        user.updateProfile(profileReq.getUserNickName());
        userRepository.save(user);
    }

    @Transactional
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId).get();
        user.updateIsDelete(IsDelete.DEAD);
        userRepository.save(user);
        myBadgeRepository.deleteByUserId(userId);
        List<MyMeeting> outList =  myMeetingRepository.findAllByUserId(userId);
        myMeetingRepository.deleteByUserId(userId);
        for(MyMeeting m : outList){
            Meeting meeting = meetingRepository.findByMeetingId(m.getMeetingId().getMeetingId()).get();
            meeting.updateCnt(meeting.getMemberCnt()-1);
            meetingRepository.save(meeting);
        }
        ploggingRepository.deleteByUserId(userId);
    }
}
