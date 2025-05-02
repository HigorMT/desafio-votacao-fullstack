package com.votacao.core.utils;

public class TimeUtils {

    public static final String TIME_VALID_REGEX = "\\d{1,5}:\\d{2}:\\d{2}";

    public static String convertToFormatedString(Long segundosTotal) {
        long horas = segundosTotal / 3600;
        long minutos = (segundosTotal % 3600) / 60;
        long segundos = segundosTotal % 60;

        return String.format("%02d:%02d:%02d", horas, minutos, segundos);
    }

    public static long convertFormatedTimeTo(String horaFormatada) {
        if (horaFormatada == null || !horaFormatada.matches(TIME_VALID_REGEX)) {
            throw new IllegalArgumentException("Formato inválido, esperado HH:mm:ss (com HH de 2 a 5 dígitos)");
        }

        String[] partes = horaFormatada.split(":");
        long horas = Long.parseLong(partes[0]);
        long minutos = Long.parseLong(partes[1]);
        long segundos = Long.parseLong(partes[2]);

        if (minutos < 0 || minutos >= 60 || segundos < 0 || segundos >= 60) {
            throw new IllegalArgumentException("Minutos e segundos devem estar entre 00 e 59");
        }

        return horas * 3600 + minutos * 60 + segundos;
    }
}
