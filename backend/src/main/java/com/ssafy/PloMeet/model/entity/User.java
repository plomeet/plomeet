package com.ssafy.PloMeet.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long userId;
    @Column(nullable = false, length = 10)
    private String userName;
    @Column(nullable = false, length = 100, unique = true)
    private String userEmail;
    @Column(columnDefinition = "tinyInt(1) default false")
    private boolean idDelete;
    @OneToMany(mappedBy = "user")
    private List<PloggingLog> logs = new ArrayList<>();
}
