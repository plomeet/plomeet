package com.ssafy.PloMeet.model.entity;

import com.ssafy.PloMeet.api.request.ProfileReq;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ssafy.PloMeet.common.util.IsDeleteConverter;
import com.ssafy.PloMeet.model.entity.enumtype.IsDelete;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@ToString
@DynamicInsert
@NoArgsConstructor
@Entity
public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long userId;

    @Column(nullable = false, unique = true, length = 20)
    Long kakaoUserId;

    @Column(nullable = false, length = 10)
    String userNickName;

    @Column(length = 100, columnDefinition = "varchar(100) default 'https://i.postimg.cc/G23gPzdy/profile-default.png'")
    String userProfileImg;

    @Convert(converter = IsDeleteConverter.class)
    IsDelete isDelete;

    @Column(length = 10)
    String userName;

    @Column(length = 100, unique = true)
    String userEmail;

    @Builder
    public User(Long userId, Long kakaoUserId, String userNickName, String userProfileImg, String userName, String userEmail) {
        this.userId = userId;
        this.kakaoUserId = kakaoUserId;
        this.userNickName = userNickName;
        this.userProfileImg = userProfileImg;
        this.userName = userName;
        this.userEmail = userEmail;
    }


    public void updateProfile(String userNickName) {
        this.userNickName = userNickName;
    }
    public void updateIsDelete(IsDelete isDelete){this.isDelete = isDelete;}
}
