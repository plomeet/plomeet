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
    @Column(name="trashcanId")
    private String trashcanId;
    @Column(name="cityName")
    private String cityName;
    @Column(name="streetName")
    private String streetName;
    @Column(name="detailAddr")
    private String detailAddr;
    @Column(name="location")
    private String location;
    @Column(name="trashCanType")
    private String trashCanType;
    @Column(name="latitude")
    private float latitude;
    @Column(name="longitude")
    private float longitude;
}
