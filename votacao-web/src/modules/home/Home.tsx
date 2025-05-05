import {ContainerLayout} from '../../layout/ContainerLayout';
import {Grid, List, ListItem, ListItemText, Typography} from '@mui/material';
import {DefaultCard} from '../../componentes/DefaultCard';

export const Home = () => {
    return (
        <ContainerLayout>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <DefaultCard style={{height: 'calc(100vh - 210px)', minHeight: '530px', overflow: 'auto'}}>
                        <Grid item xs={12}>
                            <Typography variant={'h4'} fontWeight={'bold'}>
                                Bem-vindo ao sistema de gerenciamento de votações.
                            </Typography>
                        </Grid>

                        <Grid item xs={12} style={{marginTop: '20px'}}>
                            <Typography variant={'subtitle1'}>
                                Este sistema foi desenvolvido para atender ao desafio <a href="https://github.com/dbserver/desafio-votacao-fullstack/tree/main" style={{color: '#B0B0B0'}}>Votação Full-Stack</a>.
                            </Typography>
                        </Grid>

                        <Grid item xs={12} style={{display: 'grid', justifyContent: 'center', marginTop: '20px'}}>
                            <Typography variant="subtitle2" color="text.secondary">
                                O Front-end utiliza tecnologias modernas e bem estabelecidas no ecossistema React. A seguir, alguns pontos importantes sobre as dependências principais utilizadas:
                            </Typography>

                            <Grid container spacing={2} justifyContent="center">
                                <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                                    <DefaultCard style={{height: 'auto', background: '#071020FF', width: '520px'}}>
                                        <Grid item xs={12}>
                                            <List sx={{textAlign: 'center'}}>
                                                <ListItem>
                                                    <ListItemText
                                                        primary="⚛️ React 19"
                                                        secondary="Última versão estável com otimizações de hooks e rendering."
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        primary="🎨 Material UI v5.11"
                                                        secondary="Biblioteca de componentes para construção de UI responsiva."
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        primary="🧪 Testing Library"
                                                        secondary="Ferramentas modernas para testes unitários em React."
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        primary="🔤 TypeScript 4.9"
                                                        secondary="Tipagem estática para segurança e produtividade."
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        primary="🚦 React Router DOM v6"
                                                        secondary="Gerenciamento de rotas no frontend de forma declarativa."
                                                    />
                                                </ListItem>
                                            </List>
                                        </Grid>
                                    </DefaultCard>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} style={{display: 'grid', justifyContent: 'center', marginTop: '20px'}}>
                            <Typography variant="subtitle2" color="text.secondary">
                                A API Java foi construída com base no ecossistema Spring Boot, garantindo escalabilidade, organização e extensibilidade. Alguns pontos de destaque:
                            </Typography>

                            <Grid container spacing={2} justifyContent="center">
                                <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                                    <DefaultCard style={{height: 'auto', background: '#071020FF', width: '520px'}}>
                                        <Grid item xs={12}>
                                            <List sx={{textAlign: 'center'}}>
                                                <ListItem>
                                                    <ListItemText primary="🌐 Spring Boot Web & JPA" secondary="Responsável pelas APIs REST e persistência com banco de dados."/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText primary="📦 Spring Validation" secondary="Validações declarativas nos DTOs e entidades."/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText primary="🛰️ OpenFeign" secondary="Integração de APIs externas de forma simples e desacoplada."/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText primary="🧬 MapStruct" secondary="Conversão rápida e segura entre DTOs e entidades."/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText primary="📊 Flyway + PostgreSQL" secondary="Controle de versão do banco de dados com migrações automatizadas."/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText primary="🧪 JUnit 5 + Mockito" secondary="Testes automatizados com foco em cobertura e confiabilidade."/>
                                                </ListItem>
                                            </List>
                                        </Grid>
                                    </DefaultCard>
                                </Grid>
                            </Grid>
                        </Grid>

                    </DefaultCard>
                </Grid>
            </Grid>
        </ContainerLayout>
    );
};
