import React, {FunctionComponent} from 'react';
import {Routes} from './route-constants';
import {Home} from '../modules/home/Home'
import {PautaPesquisa} from '../modules/pauta/pesquisa/PautaPesquisa';
import {PautaCadastro} from '../modules/pauta/cadastro/PautaCadastro';
import {VotacaoPesquisa} from '../modules/votacao/pesquisa/VotacaoPesquisa';
import {VotacaoVoto} from '../modules/votacao/voto/VotacaoVoto';
import {NoRoutePage} from '../modules/common/NoRoutePage';

export const AppRoutes: Record<string, FunctionComponent<React.JSX.Element>> = {

    [`${Routes.HOME.path}`]:                  Home,

    [`${Routes.PAUTA_PESQUISA.path}`]:        PautaPesquisa,
    [`${Routes.PAUTA_CADASTRO.path}`]:        PautaCadastro,
    [`${Routes.PAUTA_ATUALIZACAO.path}/:id`]: PautaCadastro,

    [`${Routes.VOTACAO_PESQUISA.path}`]:      VotacaoPesquisa,
    [`${Routes.VOTACAO_VOTO.path}/:id`]:      VotacaoVoto,

    [`${Routes.PAGINA_NAO_ENCONTRADA.path}`]: NoRoutePage,

}
