package com.ssafy.PloMeet.model.entity.enumtype;

public enum IsDelete implements CodeValue{
    ALIVE("N", "유저"),
    DEAD("Y", "탈퇴유저");

    private String code;
    private String value;
    IsDelete(String code, String value) {
        this.code = code;
        this.value = value;
    }

    @Override
    public String getCode() {
        return code;
    }

    @Override
    public String getValue() {
        return value;
    }
}
