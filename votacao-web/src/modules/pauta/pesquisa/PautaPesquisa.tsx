import {ContainerLayout} from '../../../layout/ContainerLayout';
import {Box, Button, Grid, IconButton, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip} from '@mui/material';
import {DefaultCard} from '../../../componentes/DefaultCard';
import {Edit, HighlightOff, HowToVote} from '@mui/icons-material';
import {StatusPautaEnum} from '../../../model/enum/StatusPautaEnum';
import React, {useEffect, useMemo, useState} from 'react';
import {Page} from '../../../model/page';
import {Pauta} from '../../../model/Pauta';
import {PautaApi} from '../../../services/pauta-api';
import {useNavigate} from 'react-router-dom';
import {Routes} from '../../../router/route-constants';
import {VotacaoApi} from '../../../services/votacao-api';
import {Votacao} from '../../../model/Votacao';
import {ShowContent} from '../../../componentes/ShowContent';
import {DefaultContent} from '../../../componentes/DefaultContent';
import {ErrorNotification} from '../../../componentes/ErrorNotification';
import {DefaultDialog} from '../../../componentes/DefaultDialog';

export const PautaPesquisa = (): React.JSX.Element => {

    //region Constants
    const rowsPerPage = 4;

    const [loadingRequest, setLoadingRequest] = useState<boolean>(false);
    const [pagePautas, setPagePautas] = useState<Page<Pauta>>(new Page());
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();
    const [error, setError] = useState<any>();
    //endregion

    //region Hooks
    const pautas: Pauta[] = useMemo((): Pauta[] => {
        return pagePautas?.content || [];
    }, [pagePautas?.content]);

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
        PautaApi.pageable(filtro).then((response: Page<Pauta>): void => {
            setLoading(false);
            setPagePautas(response);
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

    const handleEdit = (id?: number): void => {
        navigate(`${Routes.PAUTA_ATUALIZACAO.path}/${id}`)
    }

    const handleCreateVote = (id?: number): void => {
        if (loadingRequest) {
            return;
        }

        setLoadingRequest(true);
        VotacaoApi.createVote(id).then((response: Votacao): void => {
            setMessage('Votação Criada com sucesso.');
            setLoadingRequest(false);
        }).catch((error: any): void => {
            setLoadingRequest(false);
            setError(error);
        })
    }
    //endregion

    return (
        <ContainerLayout>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <DefaultCard style={{height: 'calc(100vh - 360px)'}}>
                        <TableContainer component={Paper} style={{margin: '20px'}}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Nome</TableCell>
                                        <TableCell>Duração</TableCell>
                                        <TableCell>Descrição</TableCell>
                                        <TableCell>Data de Criação</TableCell>
                                        <TableCell>Data de Atualização</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell align="center">Ações</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <DefaultContent loading={loading}>
                                        <ShowContent show={pautas?.length > 0}>
                                            {pautas.map((pauta: Pauta): React.JSX.Element => (
                                                <TableRow key={pauta?.id}>
                                                    <TableCell>{pauta.id}</TableCell>
                                                    <TableCell>{pauta.nome}</TableCell>
                                                    <TableCell>{pauta.duracao}</TableCell>
                                                    <TableCell>{pauta.descricao}</TableCell>
                                                    <TableCell>{pauta.dataCriacao?.toLocaleString()}</TableCell>
                                                    <TableCell>{pauta.dataAtualizacao?.toLocaleString()}</TableCell>
                                                    <TableCell>{StatusPautaEnum.getDescricao(pauta.status!)}</TableCell>
                                                    <TableCell align="center">
                                                        <Tooltip title={'Editar Pauta'}>
                                                            <IconButton color="primary" onClick={(): void => handleEdit(pauta?.id)}>
                                                                <Edit/>
                                                            </IconButton>
                                                        </Tooltip>

                                                        <ShowContent show={pauta.status === StatusPautaEnum.NOVA}>
                                                            <Tooltip title={'Criar Votação'}>
                                                                <IconButton sx={{color: 'green'}} disabled={loadingRequest} onClick={(): void => handleCreateVote(pauta?.id)}>
                                                                    <HowToVote/>
                                                                </IconButton>
                                                            </Tooltip>
                                                        </ShowContent>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </ShowContent>

                                        <ShowContent show={pautas?.length === 0}>
                                            <TableRow key={'no-data-pauta'}>
                                                <TableCell colSpan={8} style={{textAlign: 'center'}}>
                                                    Nenhuma Pauta registrada no sistema.
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
                                count={pagePautas?.totalPages || 1}
                                page={currentPage}
                                color="primary"
                            />
                        </Box>
                    </DefaultCard>
                </Grid>
            </Grid>

            <React.Fragment>
                <DefaultDialog onClose={(): void => setMessage('')}
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

                <ErrorNotification error={error} onClose={(): void => setError(undefined)}/>
            </React.Fragment>

        </ContainerLayout>
    );
};
