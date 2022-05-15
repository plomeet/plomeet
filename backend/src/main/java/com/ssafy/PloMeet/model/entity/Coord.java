package com.ssafy.PloMeet.model.entity;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class Coord{
    private double latitude;
    private double longitude;
}