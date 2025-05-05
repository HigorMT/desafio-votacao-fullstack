import {ContainerLayout} from '../../../layout/ContainerLayout';
import {Button, CircularProgress, Grid, IconButton, InputAdornment, TextField, Typography} from '@mui/material';
import {DefaultCard} from '../../../componentes/DefaultCard';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Votacao} from '../../../model/Votacao';
import {VotacaoApi} from '../../../services/votacao-api';
import {ErrorNotification} from '../../../componentes/ErrorNotification';
import {FieldError} from '../../../model/FieldError';
import {MascaraCPF} from '../../../utils/CpfUtils';
import {generateErrorFields, hasErrors, hasValue, isCpfValid} from '../../../utils/CommonUtils';
import {VotoEnum} from '../../../model/enum/VotoEnum';
import {OptionItem} from '../../../model/OptionItem';
import MenuItem from '@mui/material/MenuItem';
import {CooperadoApi} from '../../../services/cooperado-api';
import {ValidacaoCooperadoVoto} from '../../../model/ValidacaoCooperadoVoto';
import {Routes} from '../../../router/route-constants';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Save, Search} from '@mui/icons-material';
import {ConditionError} from '../../../model/ConditionError';
import {VotoApi} from '../../../services/voto-api';
import {Voto} from '../../../model/Voto';
import {Cooperado} from '../../../model/Cooperado';
import {DefaultDialog} from '../../../componentes/DefaultDialog';
import {StatusCoopVotoEnum} from '../../../model/enum/StatusCoopVotoEnum';
import {useVotacaoTimer} from './VotacaoTimer';
import {DateUtils} from '../../../utils/DateUtils';
import {ShowContent} from '../../../componentes/ShowContent';
import {StatusVotacaoEnum} from '../../../model/enum/StatusVotacaoEnum';
import {LoadingRequest} from '../../../componentes/LoadingRequest';

export const VotacaoVoto = (): React.JSX.Element => {

    //region Constants

    const messageError = 'Não foi possível localizar a votação selecionada.';

    const [loadingRequest, setLoadingRequest] = useState<boolean>(false);
    const [validacaoCoop, setValidacaoCoop] = useState<ValidacaoCooperadoVoto>();
    const [cooperado, setCooperado] = useState<Cooperado>(new Cooperado());
    const [loadingCpf, setLoadingCpf] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [votacao, setVotacao] = useState<Votacao>(new Votacao());
    const [fieldError, setFieldError] = useState<FieldError>({});
    const [tick, setTick] = useState<number>(0);
    const [voto, setVoto] = useState<Voto>(new Voto());
    const navigate = useNavigate();
    const [error, setError] = useState<any>();
    const {id} = useParams();

    //endregion

    //region Hooks

    const {tempoRestante} = useVotacaoTimer({
        dataInicio:      votacao.dataInicio,
        duracaoSegundos: votacao.duracaoSegundos,
    }, tick);

    const votacaoEncerrada: boolean = useMemo((): boolean => {
        return (tempoRestante !== null && tempoRestante <= 0) || votacao?.status === StatusVotacaoEnum.ENCERRADA
    }, [tempoRestante, votacao?.status]);

    const bottomBar: () => React.JSX.Element = useCallback((): React.JSX.Element => {
        return (
            <>
                <Button onClick={(): void => {
                    window.location.reload()
                }}
                        variant={'contained'}
                        color={'primary'}
                        autoFocus>
                    Novo Voto
                </Button>

                <Button onClick={(): void => navigate(`${Routes.VOTACAO_PESQUISA.path}`)}
                        variant={'contained'}
                        color={'warning'}
                        autoFocus>
                    Gerenciamento
                </Button>
            </>
        );
    }, [navigate]);

    const handleEndVote: () => void = useCallback((): void => {
        setLoadingRequest(true);
        VotacaoApi.endVote(votacao?.id).then((response: Votacao): void => {
            setLoadingRequest(false);
        }).catch((error: any): void => {
            setLoadingRequest(false);
            setError(error);
        });
    }, [votacao?.id]);

    const validationCpf: () => void = useCallback((): void  => {
        setLoadingCpf(true);
        CooperadoApi.validatingVote(cooperado?.cpf || '').then((response: ValidacaoCooperadoVoto): void => {
            setLoadingCpf(false);
            setValidacaoCoop(response);

            if (response.status === StatusCoopVotoEnum.ABLE_TO_VOTE) {
                handleFindByCpf();
            }

        }).catch((error: any): void => {
            setLoadingCpf(false);
            setError(error);
        });
    }, [cooperado?.cpf]);

    useEffect(() => {
        const interval = setInterval((): void => {
            setTick(t => t + 1);
        }, 1000);

        if (votacaoEncerrada) {
            return (): void => clearInterval(interval);
        }
    }, [tempoRestante, votacaoEncerrada]);

    useEffect((): void => {
        if (id) {
            const _id: number = Number(id);
            if (!isNaN(_id)) {
                setLoading(true);
                VotacaoApi.findById(_id).then((response: Votacao): void => {
                    setLoading(false);
                    setVotacao(response);
                }).catch((error: any): void => {
                    setLoading(false);
                    setError(error);
                });
            } else {
                setError(messageError);
            }
        } else {
            setError(messageError);
        }
    }, [id]);

    useEffect((): void => {
        if (error === messageError) {
            setTimeout((): void => navigate(`${(Routes.VOTACAO_PESQUISA.path)}`), 3000);
        }
    }, [error, navigate]);

    useEffect((): void => {
        if (votacaoEncerrada && votacao?.status !== StatusVotacaoEnum.ENCERRADA) {
            handleEndVote();
        }
    }, [handleEndVote, votacao?.status, votacaoEncerrada]);

    //endregion

    //region Handles

    const handleBlurCpf: () => void = (): void => {
        if (loadingCpf) {
            return;
        }

        const cpfValid: boolean = handleValidateCpf(cooperado?.cpf);

        if (cpfValid) {
            validationCpf();
        }
    }

    const handleFindByCpf = (): void => {
        setLoadingCpf(true);
        CooperadoApi.findByCpf(cooperado?.cpf).then((response: Cooperado): void => {
            setVoto({...voto, id: {cooperadoId: response?.id, votacaoId: votacao?.id}});
            setLoadingCpf(false);
            setCooperado(response);
        }).catch((error: any): void => {
            setLoadingCpf(false);
            setError(error);
        })
    }

    const handleValidCpf = (event: any): boolean => {
        const cpf = event?.target?.value;
        setCooperado({...cooperado, cpf: cpf});

        return handleValidateCpf(cpf);
    };

    const handleValidateCpf = (cpf?: string): boolean => {
        const valid = cpf && isCpfValid(cpf);
        if (!valid) {
            setFieldError({...fieldError, cpfError: 'CPF inválido. Deve conter 11 dígitos.'});
            return false;
        }

        setFieldError({...fieldError, cpfError: ''});
        return true;
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const {name, value} = event.target;
        setVoto({...voto, [name]: value});
    };

    const handleValidate: () => boolean = (): boolean => {
        const conditions: ConditionError[] = [
            {key: 'cpfError', condition: !hasValue(cooperado?.cpf)},
            {key: 'decisaoError', condition: !hasValue(voto?.decisao)},
        ];

        const _FieldError = generateErrorFields(conditions, {...fieldError});

        setFieldError(_FieldError);

        return hasErrors(_FieldError);
    }

    const handleSave: () => void = (): void => {

        const containsErrors: boolean = handleValidate();

        if (!containsErrors) {
            setLoading(true);

            VotoApi.vote(voto).then((response: Voto): void => {
                setLoading(false);
                setSuccess(true);
            }).catch((error: any): void => {
                setLoading(false);
                setError(error)
            });
        }
    }

    const onCloseCoopBlock = (): void => {
        setCooperado(new Cooperado());
        setVoto(new Voto());
    }

    //endregion

    return (
        <ContainerLayout>

            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <DefaultCard>
                        <Grid item xs={12}>
                            <ShowContent show={!votacaoEncerrada}>
                                <Typography variant={'h2'} fontWeight={'bold'} color={'#7c2727'}>
                                    A Votação termina em: {DateUtils.formatarTempo(tempoRestante)}
                                </Typography>
                            </ShowContent>
                            <ShowContent show={votacaoEncerrada}>
                                <Typography variant={'h2'} fontWeight={'bold'} color={'#7c2727'}>
                                    A Votação encerrada!
                                </Typography>
                            </ShowContent>
                        </Grid>
                    </DefaultCard>
                </Grid>

                <Grid item xs={12}>
                    <DefaultCard title={'Dados da Pauta'}>
                        <Grid item xs={12}>
                            <TextField placeholder={`Informe o Nome da Pauta`}
                                       value={votacao?.pauta?.nome || ''}
                                       label="Nome da Pauta"
                                       variant="outlined"
                                       disabled={true}
                                       name="nome"
                                       fullWidth
                                       id="nome"
                                       required/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField placeholder={`Informe a Descrição da Pauta`}
                                       value={votacao?.pauta?.descricao || ''}
                                       variant="outlined"
                                       label="Descrição"
                                       name="descricao"
                                       disabled={true}
                                       id="descricao"
                                       fullWidth
                                       required
                                       rows={5}/>
                        </Grid>
                    </DefaultCard>
                </Grid>

                <Grid item xs={12}>
                    <DefaultCard>
                        <ShowContent show={!!cooperado?.nome}>
                            <Grid item xs={12}>
                                <TextField helperText={'Dado fictício gerado através da integração com a API 4Devs'}
                                           value={cooperado?.nome || ''}
                                           label="Nome do Cooperado"
                                           variant="outlined"
                                           disabled={true}
                                           name="nome"
                                           fullWidth
                                           id="nome"
                                           required/>
                            </Grid>
                        </ShowContent>

                        <Grid item xs={6}>
                            <TextField onBlur={async (): Promise<void> => handleBlurCpf()}
                                       placeholder={'Informe o CPF do Cooperado'}
                                       helperText={fieldError?.cpfError}
                                       error={!!fieldError?.cpfError}
                                       value={cooperado?.cpf || ''}
                                       InputProps={{
                                           inputComponent: MascaraCPF as any,
                                           endAdornment:   (
                                                               <InputAdornment position="end">
                                                                   {loadingCpf ? (
                                                                       <CircularProgress size={20}/>
                                                                   ) : (
                                                                       <IconButton onClick={handleBlurCpf} edge="end" disabled={votacaoEncerrada}>
                                                                           <Search/>
                                                                       </IconButton>
                                                                   )}
                                                               </InputAdornment>
                                                           )
                                       }}
                                       disabled={votacaoEncerrada}
                                       label={`CPF do Cooperado`}
                                       onChange={handleValidCpf}
                                       variant="outlined"
                                       id={`cpf_coop`}
                                       name="cpf"
                                       fullWidth
                                       required/>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField disabled={votacaoEncerrada || validacaoCoop?.status !== StatusCoopVotoEnum.ABLE_TO_VOTE}
                                       placeholder={'Informe a decisão sobre a pauta'}
                                       label="Deseja Aprovar a Pauta em Votação?"
                                       value={voto?.decisao || ''}
                                       onChange={handleChange}
                                       variant={'outlined'}
                                       name={'decisao'}
                                       fullWidth
                                       select>
                                {VotoEnum.getOptions().map(({label, value}: OptionItem<VotoEnum>, index: number): any =>
                                    (
                                        <MenuItem value={value} key={`option-${index?.toString()}`}>{label}</MenuItem>
                                    )
                                )}
                            </TextField>
                        </Grid>
                    </DefaultCard>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <DefaultCard>
                    <Grid item xs={12} justifyContent={'center'}>
                        <Button onClick={(): void => navigate(`${Routes.VOTACAO_PESQUISA.path}`)}
                                startIcon={<DeleteForeverIcon/>}
                                style={{marginRight: '10px'}}
                                variant={'contained'}
                                disabled={loading}
                                color={'error'}>
                            Cancelar
                        </Button>

                        <Button startIcon={loading ? <CircularProgress size={20}/> : <Save/>}
                                disabled={loading || votacaoEncerrada}
                                variant={'contained'}
                                onClick={handleSave}
                                color={'primary'}>
                            Salvar
                        </Button>
                    </Grid>
                </DefaultCard>
            </Grid>

            <React.Fragment>
                <DefaultDialog
                    bottomBar={
                        <Button onClick={(): void => setValidacaoCoop(new ValidacaoCooperadoVoto())}
                                variant={'contained'}
                                color={'primary'}
                                autoFocus>
                            Fechar
                        </Button>
                    }
                    message={'Este Cooperado não pode votar para a decisão desta Pauta.'}
                    open={validacaoCoop?.status === StatusCoopVotoEnum.UNABLE_TO_VOTE}
                    onClose={onCloseCoopBlock}
                    title={'Aviso'}
                />

                <DefaultDialog
                    bottomBar={
                        <Button onClick={(): void => setValidacaoCoop(new ValidacaoCooperadoVoto())}
                                variant={'contained'}
                                color={'primary'}
                                autoFocus>
                            Fechar
                        </Button>
                    }
                    message={'Este Cooperado não pode votar para a decisão desta Pauta.'}
                    open={validacaoCoop?.status === StatusCoopVotoEnum.UNABLE_TO_VOTE}
                    onClose={onCloseCoopBlock}
                    title={'Aviso'}
                />

                <DefaultDialog
                    message={'Voto do Cooperado registrado com sucesso.'}
                    bottomBar={bottomBar()}
                    title={'Sucesso'}
                    open={success}
                />

                <LoadingRequest loading={loadingRequest}/>

                <ErrorNotification error={error} onClose={(): void => setError(undefined)}/>
            </React.Fragment>

        </ContainerLayout>
    );
};
