package com.ssafy.PloMeet.api.response;

import com.ssafy.PloMeet.model.entity.Trashcan;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.LinkedList;
import java.util.List;

@Builder
@Getter
@ToString
public class TrashcanRes {
    Long trashcanId;
    String cityName;
    String streetName;
    String detailAddr;
    String location;
    String trashCanType;
    float latitude;
    float longitude;
    public static List<TrashcanRes> of(List<Trashcan> trashcans){
        List<TrashcanRes> result = new LinkedList<>();

        for(Trashcan tcan : trashcans) {
            result.add(TrashcanRes.builder()
                    .trashcanId(tcan.getTrashcanId())
                    .cityName(tcan.getCityName())
                    .streetName(tcan.getStreetName())
                    .detailAddr(tcan.getDetailAddr())
                    .location(tcan.getLocation())
                    .trashCanType(tcan.getTrashCanType())
                    .latitude(tcan.getLatitude())
                    .longitude(tcan.getLongitude())
                    .build());
        }
        return result;
    }
}
