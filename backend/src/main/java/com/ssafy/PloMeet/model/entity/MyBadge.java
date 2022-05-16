package com.ssafy.PloMeet.model.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class MyBadge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long myBadgeId;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Badge.class)
    @JoinColumn(name="badgeId")
    private Badge badgeId;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name="userId")
    private User userId;

    @Builder
    public MyBadge(Long myBadgeId, User userId, Badge badgeId){
        this.myBadgeId = myBadgeId;
        this.userId = userId;
        this.badgeId = badgeId;
    }

    public void mapUser(User user){
        this.userId = user;
    }

    public void mapBadge(Badge badge){
        this.badgeId = badge;
    }
}
