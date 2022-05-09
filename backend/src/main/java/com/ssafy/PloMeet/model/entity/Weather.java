package com.ssafy.PloMeet.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Weather {
    S("weather-sunny"),
    SS("weather-sunset"),
    NI("weather-night"),
    PC("weather-partly-cloudy"),
    NPC("weather-night-partly-cloudy"),
    CL("weather-cloudy"),
    RA("weather-pouring"),
    SN("weather-snowy-heavy"),
    RS("weather-snowy-rainy");

    private String desc;
}
