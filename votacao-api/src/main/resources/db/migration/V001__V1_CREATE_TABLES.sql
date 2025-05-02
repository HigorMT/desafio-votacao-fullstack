--------------------------------------------------- TYPES --------------------------------------------------------------
-- CREATE TYPE status_pauta_enum AS ENUM ('NOVA', 'APROVADA', 'REJEITADA', 'CANCELADA', 'EM_VOTACAO');
--
-- CREATE TYPE status_votacao_enum AS ENUM ('AGUARDANDO_INICIO', 'EM_VOTACAO', 'ENCERRADA', 'CANCELADA');
--
-- CREATE TYPE status_voto_enum AS ENUM ('SIM', 'NAO');

--------------------------------------------------- SEQUENCES ----------------------------------------------------------
CREATE SEQUENCE IF NOT EXISTS seq_tb_cooperado
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1
    NO CYCLE;

CREATE SEQUENCE IF NOT EXISTS seq_tb_pauta
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1
    NO CYCLE;

CREATE SEQUENCE IF NOT EXISTS seq_tb_votacao
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1
    NO CYCLE;


----------------------------------------------------- TABLES -----------------------------------------------------------

DROP TABLE IF EXISTS tb_cooperado;
CREATE TABLE IF NOT EXISTS tb_cooperado
(
    id_cooperado BIGINT DEFAULT nextval('seq_tb_cooperado'::regclass) NOT NULL,
    cpf          VARCHAR(14)                                          NOT NULL,
    nome         VARCHAR(255)                                         NOT NULL,
    CONSTRAINT tb_cooperado_pk PRIMARY KEY (id_cooperado)
);
CREATE INDEX tb_cooperado_idx_0 ON tb_cooperado USING btree (nome);
CREATE INDEX tb_cooperado_idx_1 ON tb_cooperado USING btree (cpf);

DROP TABLE IF EXISTS tb_pauta;
CREATE TABLE IF NOT EXISTS tb_pauta
(
    id_pauta         BIGINT       DEFAULT nextval('seq_tb_pauta'::regclass) NOT NULL,
    data_atualizacao TIMESTAMP(6)                                           NULL,
    data_criacao     TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP                 NOT NULL,
    descricao        TEXT                                                   NULL,
    duracao          BIGINT                                                 NOT NULL,
    nome             VARCHAR(100)                                           NOT NULL,
    status           VARCHAR(20)                                            NOT NULL,
    CONSTRAINT tb_pauta_pkey PRIMARY KEY (id_pauta)
);
CREATE INDEX tb_pauta_idx_0 ON tb_pauta USING btree (status);
CREATE INDEX tb_pauta_idx_1 ON tb_pauta USING btree (nome);

DROP TABLE IF EXISTS tb_votacao;
CREATE TABLE IF NOT EXISTS tb_votacao
(
    id_votacao       BIGINT       DEFAULT nextval('seq_tb_votacao'::regclass) NOT NULL,
    data_atualizacao TIMESTAMP(6)                                             NULL,
    data_criacao     TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP                   NOT NULL,
    data_fim         TIMESTAMP(6)                                             NULL,
    data_inicio      TIMESTAMP(6)                                             NULL,
    duracao_votacao  BIGINT                                                   NULL,
    status           VARCHAR(20)                                              NOT NULL,
    pauta_id         BIGINT                                                   NOT NULL,
    CONSTRAINT tb_votacao_pkey PRIMARY KEY (id_votacao),
    CONSTRAINT tb_votacao_pk_0 FOREIGN KEY (pauta_id) REFERENCES tb_pauta (id_pauta),
    CONSTRAINT tb_votacao_uk UNIQUE (pauta_id)
);
CREATE INDEX tb_votacao_idx_0 ON tb_votacao USING btree (status);

DROP TABLE IF EXISTS tb_voto;
CREATE TABLE IF NOT EXISTS tb_voto
(
    cooperado_id BIGINT      NOT NULL,
    votacao_id   BIGINT      NOT NULL,
    decisao      VARCHAR(20) NOT NULL,
    CONSTRAINT tb_voto_pk PRIMARY KEY (cooperado_id, votacao_id)
);
CREATE INDEX tb_voto_idx_0 ON tb_voto USING btree (decisao);
