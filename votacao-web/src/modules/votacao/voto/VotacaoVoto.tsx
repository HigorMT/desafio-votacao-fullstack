import {ContainerLayout} from '../../../layout/ContainerLayout';
import {Button, CircularProgress, Grid, TextField} from '@mui/material';
import {DefaultCard} from '../../../componentes/DefaultCard';
import React, {useCallback, useEffect, useState} from 'react';
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
import {Save} from '@mui/icons-material';
import {ConditionError} from '../../../model/ConditionError';
import {VotoApi} from '../../../services/voto-api';
import {Voto} from '../../../model/Voto';
import {Cooperado} from '../../../model/Cooperado';
import {DefaultDialog} from '../../../componentes/DefaultDialog';
import {StatusCoopVotoEnum} from '../../../model/enum/StatusCoopVotoEnum';

export const VotacaoVoto = (): React.JSX.Element => {

    //region Constants

    const [validacaoCoop, setValidacaoCoop] = useState<ValidacaoCooperadoVoto>()
    const [cooperado, setCooperado] = useState<Cooperado>(new Cooperado());
    const [loadingCpf, setLoadingCpf] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [votacao, setVotacao] = useState<Votacao>(new Votacao());
    const [fieldError, setFieldError] = useState<FieldError>({});
    const [voto, setVoto] = useState<Voto>(new Voto());
    const navigate = useNavigate();
    const [error, setError] = useState<any>();
    const {id} = useParams();

    //endregion

    //region Hooks

    useEffect((): void => {

    }, []);

    useEffect((): void => {
        if (id) {
            const _id: number = Number(id);
            setLoadingCpf(true);
            if (!isNaN(_id)) {
                VotacaoApi.findById(_id).then((response: Votacao): void => {
                    setLoadingCpf(false);
                    setVotacao(response);
                }).catch((error: any): void => {
                    setLoadingCpf(false);
                    setError(error);
                });
            }
        } else {

        }
    }, [id]);

    const bottomBar = useCallback((): React.JSX.Element => {
        return (
            <>
                <Button onClick={(): void => { window.location.reload() }}
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
    
    //endregion

    //region Handles

    const handleBlurCpf: () => void = (): void => {
        if (loadingCpf) {
            return;
        }

        const cpfValid: boolean = handleValidateCpf(cooperado?.cpf);

        if (cpfValid) {
            setLoadingCpf(true);
            CooperadoApi.validatingVote(cooperado?.cpf || '').then((response: ValidacaoCooperadoVoto): void => {
                setLoadingCpf(false);
                setValidacaoCoop(response);

                if(response.status === StatusCoopVotoEnum.ABLE_TO_VOTE) {
                    handleFindByCpf();
                }

            }).catch((error: any): void => {
                setLoadingCpf(false);
                setError(error);
            });
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

        // if (!verificaDigitosVerificadoresCPF(cpf)) {
        //     setFieldError({...fieldError, cpfError: 'CPF inválido'});
        //     return false;
        // }

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
                        <Grid item xs={6}>
                            <TextField onBlur={async (): Promise<void> => handleBlurCpf()}
                                       placeholder={'Informe o CPF do Cooperado'}
                                       helperText={fieldError?.cpfError}
                                       error={!!fieldError?.cpfError}
                                       value={cooperado?.cpf || ''}
                                       InputProps={{
                                           inputComponent: MascaraCPF as any,
                                           endAdornment:   loadingCpf && <CircularProgress size={20}/>
                                       }}
                                       label={`CPF do Cooperado`}
                                       onChange={handleValidCpf}
                                       variant="outlined"
                                       id={`cpf_coop`}
                                       name="cpf"
                                       fullWidth
                                       required/>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                placeholder={'Informe a decisão sobre a pauta'}
                                label="Deseja Aprovar a Pauta em Votação?"
                                value={voto?.decisao || ''}
                                onChange={handleChange}
                                variant={'outlined'}
                                name={'decisao'}
                                fullWidth
                                select
                            >
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
                                variant={'contained'}
                                onClick={handleSave}
                                disabled={loading}
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

                <ErrorNotification error={error} onClose={(): void => setError(undefined)}/>
            </React.Fragment>

        </ContainerLayout>
    );
};
