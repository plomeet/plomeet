package com.ssafy.PloMeet.common.util;

import com.ssafy.PloMeet.model.entity.enumtype.IsDelete;

import javax.persistence.AttributeConverter;
import java.util.EnumSet;
import java.util.NoSuchElementException;

public class IsDeleteConverter implements AttributeConverter<IsDelete, String> {

    @Override
    public String convertToDatabaseColumn(IsDelete attribute) { //Entity -> DB
        return attribute.getCode();
    }

    @Override
    public IsDelete convertToEntityAttribute(String dbData) { //DB -> Entity
        return EnumSet.allOf(IsDelete.class).stream()
                .filter(e->e.getCode().equals(dbData))
                .findAny().orElseThrow(()->new NoSuchElementException());
    }
}
