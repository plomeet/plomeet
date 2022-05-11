package com.ssafy.PloMeet.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
//@RequiredArgsConstructor
@Entity
@Table(name="TrashCan")
public class Trashcan {
    @Id
    private Long trashcanId;
    @Column
    private String cityName;
    @Column
    private String streetName;
    @Column
    private String detailAddr;
    @Column
    private String location;
    @Column
    private String trashCanType;
    @Column
    private float latitude;
    @Column
    private float longitude;
}
