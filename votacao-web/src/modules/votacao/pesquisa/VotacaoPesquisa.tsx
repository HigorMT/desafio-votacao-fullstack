import React, {useEffect, useMemo, useState} from 'react';
import {Page} from '../../../model/page';
import {useNavigate} from 'react-router-dom';
import {Routes} from '../../../router/route-constants';
import {Votacao} from '../../../model/Votacao';
import {StatusVotacaoEnum} from '../../../model/enum/StatusVotacaoEnum';
import {VotacaoApi} from '../../../services/votacao-api';
import {ContainerLayout} from '../../../layout/ContainerLayout';
import {Box, Button, Grid, IconButton, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip} from '@mui/material';
import {DefaultCard} from '../../../componentes/DefaultCard';
import {DefaultContent} from '../../../componentes/DefaultContent';
import {ShowContent} from '../../../componentes/ShowContent';
import {AlarmOn, Calculate, EventAvailable, HighlightOff, SkipNext} from '@mui/icons-material';
import {ErrorNotification} from '../../../componentes/ErrorNotification';
import {VotoApi} from '../../../services/voto-api';
import {ContabilizacaoVoto} from '../../../model/ContabilizacaoVoto';
import {DefaultDialog} from '../../../componentes/DefaultDialog';
import {LoadingRequest} from '../../../componentes/LoadingRequest';

export const VotacaoPesquisa = (): React.JSX.Element => {

    //region Constants
    const rowsPerPage = 4;

    const [contabilizacaoVoto, setContabilizacaoVoto] = useState<ContabilizacaoVoto | null>(null);
    const [loadingRequest, setLoadingRequest] = useState<boolean>(false);
    const [pageVotacao, setPageVotacao] = useState<Page<Votacao>>(new Page());
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();
    const [error, setError] = useState<any>();

    //endregion

    //region Hooks

    const votacoes: Votacao[] = useMemo((): Votacao[] => {
        return pageVotacao?.content || [];
    }, [pageVotacao?.content]);

    useEffect((): void => {
        handlePageable();
    }, []);

    //endregion

    //region Handles

    const mountParams = (newPage?: number): any => {
        const params: any = {};

        params.page = newPage ?? currentPage - 1;
        params.size = rowsPerPage;

        return params;
    }

    const handlePageable = (params?: any): void => {
        const filtro: any = params ?? mountParams(0);

        setLoading(true);
        VotacaoApi.pageable(filtro).then((response: Page<Votacao>): void => {
            setLoading(false);
            setPageVotacao(response);
        }).catch((error: any): void => {
            setLoading(false);
            setError(error);
        });
    }

    const handleChangePage = async (newPage: any) => {
        setCurrentPage(newPage);
        setLoading(true);
        const params = mountParams(newPage - 1);
        handlePageable(params);
    };

    const handleInitVote = (id?: number): void => {
        if (loadingRequest) {
            return;
        }

        setLoadingRequest(true);
        VotacaoApi.startingVote(id).then((response: Votacao): void => {
            setLoadingRequest(false);
            navigate(`${Routes.VOTACAO_VOTO.path}/${id}`);
        }).catch((error: any): void => {
            setLoadingRequest(false);
            setError(error);
        });
    };

    const handleContinueVote = (id?: number): void => {
        navigate(`${Routes.VOTACAO_VOTO.path}/${id}`);
    }

    const handleEndVote = (id?: number): void => {
        if (loadingRequest) {
            return;
        }

        setLoadingRequest(true);
        VotacaoApi.endVote(id).then((response: Votacao): void => {
            setMessage('Votação Encerrada com sucesso.');
            setLoadingRequest(false);
            handleChangePage(pageVotacao);
        }).catch((error: any): void => {
            setLoadingRequest(false);
            setError(error);
        });
    };

    const handleCancelVote = (id?: number): void => {
        if (loadingRequest) {
            return;
        }

        setLoadingRequest(true);
        VotacaoApi.cancelVote(id).then((response: Votacao): void => {
            setMessage('Votação Cancelada com sucesso.');
            setLoadingRequest(false);
            handleChangePage(pageVotacao);
        }).catch((error: any): void => {
            setLoadingRequest(false);
            setError(error);
        });
    };

    const handleApurateVote = (id?: number): void => {
        if (loadingRequest) {
            return;
        }

        setLoadingRequest(true);
        VotoApi.countingVote(id).then((response: ContabilizacaoVoto): void => {
            setContabilizacaoVoto(response);
            setLoadingRequest(false);
        }).catch((error: any): void => {
            setLoadingRequest(false);
            setError(error);
        });
    };

    //endregion

    return (
        <ContainerLayout>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <DefaultCard style={{height: 'calc(100vh - 360px)', minHeight: '600px'}}>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">ID</TableCell>
                                            <TableCell align="center">Pauta</TableCell>
                                            <TableCell align="center">Duração</TableCell>
                                            <TableCell align="center">Data Inicio</TableCell>
                                            <TableCell align="center">Data Fim</TableCell>
                                            <TableCell align="center">Data de Criação</TableCell>
                                            <TableCell align="center">Data de Atualização</TableCell>
                                            <TableCell align="center">Status</TableCell>
                                            <TableCell align="center">Ações</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <DefaultContent loading={loading}>
                                            <ShowContent show={votacoes?.length > 0}>
                                                {votacoes.map((votacao: Votacao): React.JSX.Element => (
                                                    <TableRow key={votacao?.id}>
                                                        <TableCell>{votacao.id}</TableCell>
                                                        <TableCell>{votacao.pauta?.nome}</TableCell>
                                                        <TableCell>{votacao.duracaoVotacao}</TableCell>
                                                        <TableCell>{votacao?.dataInicio ? votacao?.dataInicio?.toLocaleString() : '----'}</TableCell>
                                                        <TableCell>{votacao?.dataFim ? votacao?.dataFim?.toLocaleString() : '----'}</TableCell>
                                                        <TableCell>{votacao.dataCriacao?.toLocaleString()}</TableCell>
                                                        <TableCell>{votacao.dataAtualizacao?.toLocaleString()}</TableCell>
                                                        <TableCell>{StatusVotacaoEnum.getDescricao(votacao.status!)}</TableCell>
                                                        <TableCell align="center">
                                                            <ShowContent show={votacao.status === StatusVotacaoEnum.AGUARDANDO_INICIO}>
                                                                <Tooltip title={'Iniciar Votação'}>
                                                                    <IconButton color="primary" disabled={loadingRequest} onClick={(): void => handleInitVote(votacao?.id)}>
                                                                        <AlarmOn/>
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </ShowContent>

                                                            <ShowContent show={votacao.status === StatusVotacaoEnum.EM_VOTACAO}>
                                                                <Tooltip title={'Continuar Votação'}>
                                                                    <IconButton sx={{color: 'primary'}} disabled={loadingRequest} onClick={(): void => handleContinueVote(votacao?.id)}>
                                                                        <SkipNext/>
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </ShowContent>

                                                            <ShowContent show={votacao.status !== StatusVotacaoEnum.CANCELADA}>
                                                                <Tooltip title={'Cancelar Votação'}>
                                                                    <IconButton sx={{color: 'red'}} disabled={loadingRequest} onClick={(): void => handleCancelVote(votacao?.id)}>
                                                                        <HighlightOff/>
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </ShowContent>

                                                            <ShowContent show={votacao.status === StatusVotacaoEnum.EM_VOTACAO}>
                                                                <Tooltip title={'Encerrar Votação'}>
                                                                    <IconButton sx={{color: 'orange'}} disabled={loadingRequest} onClick={(): void => handleEndVote(votacao?.id)}>
                                                                        <EventAvailable/>
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </ShowContent>

                                                            <ShowContent show={votacao.status === StatusVotacaoEnum.ENCERRADA}>
                                                                <Tooltip title={'Apurar Votação'}>
                                                                    <IconButton sx={{color: 'green'}} disabled={loadingRequest} onClick={(): void => handleApurateVote(votacao?.id)}>
                                                                        <Calculate/>
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </ShowContent>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </ShowContent>

                                            <ShowContent show={votacoes?.length === 0}>
                                                <TableRow key={'no-data-votacao'}>
                                                    <TableCell colSpan={9} style={{textAlign: 'center'}}>
                                                        Nenhuma Votação registrada no sistema.
                                                    </TableCell>
                                                </TableRow>
                                            </ShowContent>
                                        </DefaultContent>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Box sx={{display: 'flex', justifyContent: 'center', width: '100%', marginTop: '15px'}}>
                                <Pagination
                                    onChange={(e, page: number) => handleChangePage(page)}
                                    count={pageVotacao?.totalPages || 1}
                                    page={currentPage}
                                    color="primary"
                                />
                            </Box>
                        </Grid>
                    </DefaultCard>
                </Grid>
            </Grid>

            <React.Fragment>
                <DefaultDialog onClose={(): void => {
                    setMessage('');
                    window.location.reload();
                }}
                               bottomBar={
                                   <Button onClick={(): void => setMessage('')}
                                           startIcon={<HighlightOff/>}
                                           variant={'contained'}
                                           color={'warning'}
                                           autoFocus>
                                       Fechar
                                   </Button>
                               }
                               title={'Sucesso'}
                               message={message}
                               open={!!message}>

                </DefaultDialog>

                <DefaultDialog onClose={(): void => setContabilizacaoVoto(null)}
                               title={'Contabilização dos Votos'}
                               bottomBar={
                                   <Button onClick={(): void => setContabilizacaoVoto(null)}
                                           startIcon={<HighlightOff/>}
                                           variant={'contained'}
                                           color={'warning'}
                                           autoFocus>
                                       Fechar
                                   </Button>
                               }
                               open={!!contabilizacaoVoto}
                >
                    <Grid container style={{width: '96%'}}>
                        <Grid item xs={12} justifyContent={'center'}>
                            <TableContainer component={Paper} style={{margin: '20px'}}>
                                <Table align="center">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Votos Favoraveis</TableCell>
                                            <TableCell align="center">Votos Desfavoraveis</TableCell>
                                            <TableCell align="center">Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <DefaultContent loading={loading}>
                                            <ShowContent show={votacoes?.length > 0}>
                                                <TableRow key={'key-contab'}>
                                                    <TableCell align="center">{contabilizacaoVoto?.votosFavoraveis}</TableCell>
                                                    <TableCell align="center">{contabilizacaoVoto?.votosDesfavoraveis}</TableCell>
                                                    <TableCell align="center">{contabilizacaoVoto?.votosTotais}</TableCell>
                                                </TableRow>
                                            </ShowContent>
                                        </DefaultContent>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </DefaultDialog>

                <LoadingRequest loading={loadingRequest}/>

                <ErrorNotification error={error} onClose={(): void => setError(undefined)}/>
            </React.Fragment>
        </ContainerLayout>
    );
};
