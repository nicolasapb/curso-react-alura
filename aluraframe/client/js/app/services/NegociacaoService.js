class NegociacaoService {

    constructor() {
        this._http = new HttpService()
    }

    obterNegociacoes() {
        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).
        then(periodos => {
            const negociacoes = periodos.reduce((dados, periodo) => dados.concat(periodo), [])
            return negociacoes
        }).catch(erro => { throw new Error(erro) })
    }

    obterNegociacoesDaSemana() {
        return this._http.get('negociacoes/semana')
            .then(negociacoes => negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
            .catch(erro => {
                console.log(erro)
                throw new Error('Não foi possível obter as negociações da samana')
            })
    }

    obterNegociacoesDaSemanaAnterior() {
        return this._http.get('negociacoes/anterior')
            .then(negociacoes => negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
            .catch(erro => {
                console.log(erro)
                throw new Error('Não foi possível obter as negociações da semana anterior')
            })
    }

    obterNegociacoesDaSemanaRetrasada() {
        return this._http.get('negociacoes/retrasada')
            .then(negociacoes => negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
            .catch(erro => {
                console.log(erro)
                throw new Error('Não foi possível obter as negociações semana retrasada')
            })
    }
}