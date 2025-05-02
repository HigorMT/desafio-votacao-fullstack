package com.votacao.domain.entity;

import com.votacao.domain.enums.VotoEnum;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import static jakarta.persistence.EnumType.STRING;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = Voto.TABLE_NAME)
public class Voto {

    public static final String TABLE_NAME = "tb_voto";

    @EmbeddedId
    private VotoId id;

    @Enumerated(STRING)
    @Column(name = "decisao")
    private VotoEnum decisao;

}
