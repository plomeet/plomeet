package com.ssafy.PloMeet.api.response;

import com.ssafy.PloMeet.model.entity.Meeting;
import com.ssafy.PloMeet.model.entity.MyMeeting;
import com.ssafy.PloMeet.model.entity.User;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.Column;

@Getter
public class UserRes {

    Long userId;

    String userName;

    String userEmail;

    Boolean idDelete;

    @Builder
    public UserRes(Long userId, String userName, String userEmail, Boolean idDelete) {
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.idDelete = idDelete;
    }

    public UserRes(User user){
        this.userId = user.getUserId();
        this.userName = user.getUserName();
        this.userEmail = user.getUserEmail();
        this.idDelete = user.getIdDelete();
    }
}
