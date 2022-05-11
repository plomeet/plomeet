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

    @Column(nullable = false, length = 10)
    String userName;

    @Column(nullable = false, length = 100, unique = true)
    String userEmail;

    @Column(columnDefinition = "boolean default false")
    Boolean idDelete;

    @Builder
    public User(String userName, String userEmail) {
        this.userName = userName;
        this.userEmail = userEmail;
    }

}
