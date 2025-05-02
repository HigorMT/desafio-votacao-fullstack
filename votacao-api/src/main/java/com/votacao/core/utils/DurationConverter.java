package com.votacao.core.utils;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import static com.votacao.core.utils.TimeUtils.convertFormatedTimeTo;
import static com.votacao.core.utils.TimeUtils.convertToFormatedString;
import static java.util.Objects.isNull;

@Converter
public class DurationConverter implements AttributeConverter<String, Long> {

    @Override
    public Long convertToDatabaseColumn(String attribute) {
        return convertFormatedTimeTo(attribute);
    }

    @Override
    public String convertToEntityAttribute(Long dbData) {
        return (isNull(dbData) ? "00:00:00" : convertToFormatedString(dbData));
    }

}
