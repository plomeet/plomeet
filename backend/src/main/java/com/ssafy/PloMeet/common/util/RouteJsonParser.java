package com.ssafy.PloMeet.common.util;

import com.ssafy.PloMeet.model.entity.Coord;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RouteJsonParser {

    public String getArrayToJsonString( List<Coord> routeList) {
        JSONObject obj = new JSONObject();
        try {
            JSONArray jArray = new JSONArray();//배열이 필요할때
            for (Coord c : routeList)//배열
            {
                JSONObject sObject = new JSONObject();//배열 내에 들어갈 json
                sObject.put("latitude", c.getLatitude());
                sObject.put("longitude", c.getLongitude());
                jArray.add(sObject);
            }
            obj.put("coord", jArray);//배열을 넣음

        } catch (Exception e) {
            e.printStackTrace();
        }
        return obj.toString();

    }

}
