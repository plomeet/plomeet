package com.ssafy.PloMeet.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
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
    boolean idDelete;
    
}
