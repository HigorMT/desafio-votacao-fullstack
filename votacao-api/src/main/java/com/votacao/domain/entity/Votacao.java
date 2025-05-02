package com.votacao.domain.entity;

import com.votacao.core.utils.DurationConverter;
import com.votacao.domain.enums.StatusVotacaoEnum;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
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

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = Votacao.TABLE_NAME)
public class Votacao {

    public static final String TABLE_NAME = "tb_votacao";
    public static final String SEQUENCE_NAME = "seq_tb_votacao";

    @Id
    @GeneratedValue(strategy = SEQUENCE, generator = SEQUENCE_NAME)
    @SequenceGenerator(name = SEQUENCE_NAME, sequenceName = SEQUENCE_NAME, allocationSize = 1)
    @Column(name = "id_votacao")
    private Long id;

    @OneToOne
    @JoinColumn(name = "pauta_id")
    private Pauta pauta;

    @Enumerated(STRING)
    @Column(name = "status")
    private StatusVotacaoEnum status;

    @Column(name = "duracao_votacao")
    @Convert(converter = DurationConverter.class)
    private String duracaoVotacao;

    @Column(name = "data_criacao", updatable = false)
    private LocalDateTime dataCriacao;

    @Column(name = "data_atualizacao")
    private LocalDateTime dataAtualizacao;

    @Column(name = "data_inicio")
    private LocalDateTime dataInicio;

    @Column(name = "data_fim")
    private LocalDateTime dataFim;

    //<editor-fold desc="Callbacks" defaultstate="collapsed">

    @PrePersist
    public void prePersist() {
        this.dataAtualizacao = LocalDateTime.now();
        this.dataCriacao = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.dataAtualizacao = LocalDateTime.now();
    }

    //</editor-fold>

}
