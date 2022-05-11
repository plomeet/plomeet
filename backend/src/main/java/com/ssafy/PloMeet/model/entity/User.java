package com.ssafy.PloMeet.model.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

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

    @Column(columnDefinition = "boolean default false")
    Boolean idDelete;

    @Column(length = 10)
    String userName;

    @Column(length = 100, unique = true)
    String userEmail;


    @Builder
    public User(Long kakaoUserId, String userNickName, String userProfileImg, String userName, String userEmail) {
        this.kakaoUserId = kakaoUserId;
        this.userNickName = userNickName;
        this.userProfileImg = userProfileImg;
        this.userName = userName;
        this.userEmail = userEmail;
    }

}
