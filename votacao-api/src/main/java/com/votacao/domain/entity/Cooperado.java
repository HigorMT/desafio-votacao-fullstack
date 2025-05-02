package com.votacao.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.br.CPF;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = Cooperado.TABLE_NAME)
public class Cooperado {

    public static final String TABLE_NAME = "tb_cooperado";
    public static final String SEQUENCE_NAME = "seq_tb_cooperado";

    @Id
    @GeneratedValue(strategy = SEQUENCE, generator = SEQUENCE_NAME)
    @SequenceGenerator(name = SEQUENCE_NAME, sequenceName = SEQUENCE_NAME, allocationSize = 1)
    @Column(name = "id_cooperado")
    private Long id;

    @CPF
    @Column(name = "cpf", length = 14)
    private String cpf;

    @Column(name = "nome")
    private String nome;

}
