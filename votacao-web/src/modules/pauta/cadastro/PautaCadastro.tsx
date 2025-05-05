import {ContainerLayout} from '../../../layout/ContainerLayout';
import React, {useEffect, useState} from 'react';
import {Button, CircularProgress, Grid, TextField} from '@mui/material';
import {FieldError} from '../../../model/FieldError';
import {Pauta} from '../../../model/Pauta';
import {ConditionError} from '../../../model/ConditionError';
import {generateErrorFields, hasErrors, hasValue} from '../../../utils/CommonUtils';
import {DurationSelector} from '../../../componentes/DurationSelector';
import {DefaultCard} from '../../../componentes/DefaultCard';
import {useNavigate, useParams} from 'react-router-dom';
import {Routes} from '../../../router/route-constants';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Save} from '@mui/icons-material';
import {PautaApi} from '../../../services/pauta-api';
import {DefaultDialog} from '../../../componentes/DefaultDialog';
import {ErrorNotification} from '../../../componentes/ErrorNotification';

export const PautaCadastro = (): React.JSX.Element => {

    //region Constants
    const messageError = 'Não foi possível localizar a Pauta selecionada.';

    const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [verify, setVerify] = useState<boolean>(false);
    const [fieldError, setFieldError] = useState<FieldError>({});
    const [pauta, setPauta] = useState<Pauta>(new Pauta());
    const navigate = useNavigate();
    const [error, setError] = useState<any>();
    const {id} = useParams();

    //endregion

    //region Hooks

    useEffect((): void => {

    }, []);

    useEffect((): void => {
        if (verify) {
            handleValidate();
        }
    }, [pauta, verify]);

    useEffect((): void => {
        if (id) {
            const _id: number = Number(id);
            if (!isNaN(_id)) {
                setLoading(true);
                PautaApi.findById(_id).then((response: Pauta): void => {
                    setLoading(false);
                    setPauta(response);
                }).catch((error: any): void => {
                    setLoading(false);
                    setError(error);
                });
            } else {
                setError(messageError);
            }
        }
    }, [id]);

    useEffect((): void => {
        if (error === messageError) {
            setTimeout((): void => navigate(`${(Routes.PAUTA_PESQUISA.path)}`), 3000);
        }
    }, [error, navigate]);

    //endregion

    //region Handles

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const {name, value} = event.target;
        setPauta({...pauta, [name]: value});
    };

    const handleValidate: () => boolean = (): boolean => {
        const conditions: ConditionError[] = [
            {key: 'descricaoError', condition: !hasValue(pauta?.descricao)},
            {key: 'duracaoError', condition: !hasValue(pauta?.duracao)},
            {key: 'nomeError', condition: !hasValue(pauta?.nome)},
        ];

        const _FieldError = generateErrorFields(conditions, {...fieldError});

        setFieldError(_FieldError);

        return hasErrors(_FieldError);
    }

    const handleSave: () => void = (): void => {
        if (loading) {
            return;
        }

        const containsErrors: boolean = handleValidate();

        setVerify(true);
        if (!containsErrors) {
            setLoading(true);
            const requisition: Promise<Pauta> = (id ? PautaApi.update(pauta, id) : PautaApi.create(pauta));

            requisition.then((response: Pauta): void => {
                setSaveSuccess(true);
                setLoading(false);
            }).catch((error: any): void => {
                setLoading(false);
                setError(error);
            });
        }
    };

    //endregion

    return (
        <ContainerLayout>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <DefaultCard title={'Dados Básicos'}>
                        <Grid item xs={12}>
                            <TextField placeholder={`Informe o Nome da Pauta`}
                                       helperText={fieldError?.nomeError}
                                       error={!!fieldError?.nomeError}
                                       inputProps={{maxLength: 100}}
                                       value={pauta?.nome || ''}
                                       onChange={handleChange}
                                       label="Nome da Pauta"
                                       variant="outlined"
                                       name="nome"
                                       fullWidth
                                       id="nome"
                                       required/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField placeholder={`Informe a Descrição da Pauta`}
                                       helperText={fieldError?.descricaoError}
                                       error={!!fieldError?.descricaoError}
                                       value={pauta?.descricao || ''}
                                       onChange={handleChange}
                                       variant="outlined"
                                       label="Descrição"
                                       name="descricao"
                                       id="descricao"
                                       fullWidth
                                       required
                                       rows={5}/>
                        </Grid>

                        <Grid item xs={6}>
                            <DurationSelector onChange={(duracao: string): void => setPauta({...pauta, duracao})}
                                              placeHolder={'Informe a duração da votação da pauta Ex: 10:00:00'}
                                              label={'Duração da votação da Pauta'}
                                              error={fieldError?.duracaoError}
                                              value={pauta?.duracao}
                                              required/>
                        </Grid>
                    </DefaultCard>
                </Grid>

                <Grid item xs={12}>
                    <DefaultCard>
                        <Grid item xs={12} justifyContent={'center'}>
                            <Button onClick={(): void => navigate(`${Routes.PAUTA_PESQUISA.path}`)}
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
            </Grid>

            <React.Fragment>
                <DefaultDialog title={'Dados Salvos com Sucesso'} open={saveSuccess}
                               bottomBar={
                                   <Button onClick={(): void => navigate(`${Routes.PAUTA_PESQUISA.path}`)}
                                           variant={'contained'}
                                           color={'primary'}
                                           autoFocus>
                                       Tela de Gerenciamento
                                   </Button>
                               }
                />

                <ErrorNotification error={error} onClose={(): void => setError(undefined)} />
            </React.Fragment>

        </ContainerLayout>
    );
};
