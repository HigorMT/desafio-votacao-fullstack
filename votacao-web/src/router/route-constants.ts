export class RouteProps {
    path?: string;
    title?: string;
}

export enum RouteEnum {

    HOME = 'HOME',

    PAUTA_PESQUISA = 'PAUTA_PESQUISA',
    PAUTA_CADASTRO = 'PAUTA_CADASTRO',
    PAUTA_ATUALIZACAO = 'PAUTA_ATUALIZACAO',

    VOTACAO_PESQUISA = 'VOTACAO_PESQUISA',
    VOTACAO_VOTO = 'VOTACAO_VOTO',


    PAGINA_NAO_ENCONTRADA = 'PAGINA_NAO_ENCONTRADA'
}

export type RoutesProps = Record<RouteEnum, RouteProps>;

export const Routes: RoutesProps = {

    HOME:                  {path: '/',                title: 'Home'                     },

    PAUTA_PESQUISA:        {path: '/pautas',          title: 'Gerenciamento de Pautas'  },
    PAUTA_CADASTRO:        {path: '/pautas/cadastro', title: 'Cadastro de Pauta'        },
    PAUTA_ATUALIZACAO:     {path: '/pautas/edicao',   title: 'Atualização de Pauta'     },

    VOTACAO_PESQUISA:      {path: '/votacao',         title: 'Gerenciamento de Votação' },
    VOTACAO_VOTO:          {path: '/votacao/voto',    title: 'Voto'                     },

    PAGINA_NAO_ENCONTRADA: {path: '*',    title: 'Página não encontrada.'               },
}
