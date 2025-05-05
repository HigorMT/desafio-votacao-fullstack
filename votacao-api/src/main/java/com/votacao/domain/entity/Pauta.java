package com.votacao.domain.entity;

import com.votacao.core.utils.DurationConverter;
import com.votacao.domain.enums.StatusPautaEnum;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.GenerationType.SEQUENCE;
import static java.util.Objects.isNull;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = Pauta.TABLE_NAME)
public class Pauta {

    public static final String TABLE_NAME = "tb_pauta";
    public static final String SEQUENCE_NAME = "seq_tb_pauta";

    @Id
    @GeneratedValue(strategy = SEQUENCE, generator = SEQUENCE_NAME)
    @SequenceGenerator(name = SEQUENCE_NAME, sequenceName = SEQUENCE_NAME, allocationSize = 1)
    @Column(name = "id_pauta")
    private Long id;

    @Column(name = "nome", length = 100)
    private String nome;

    @Column(name = "descricao", length = 500)
    private String descricao;

    @Column(name = "data_criacao", updatable = false)
    private LocalDateTime dataCriacao;

    @Column(name = "data_atualizacao")
    private LocalDateTime dataAtualizacao;

    @Column(name = "duracao")
    @Convert(converter = DurationConverter.class)
    private String duracao;

    @Enumerated(STRING)
    @Column(name = "status")
    private StatusPautaEnum status;

    //<editor-fold desc="Callbacks" defaultstate="collapsed">

    @PrePersist
    public void prePersist() {
        this.dataAtualizacao = LocalDateTime.now();
        this.dataCriacao = LocalDateTime.now();
        defaultDuration();
    }

    @PreUpdate
    public void preUpdate() {
        this.dataAtualizacao = LocalDateTime.now();
        defaultDuration();
    }

    /**
     * Duração padrão de duração de uma pauta é de 60 segundos
     */
    private void defaultDuration() {
        if (isNull(this.duracao)) {
            this.duracao = "00:01:00";
        }
    }

    //</editor-fold>

}
