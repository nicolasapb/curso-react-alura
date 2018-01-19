class NegociacaoController {
    constructor() {
        const $ = document.querySelector.bind(document)
        this._inputData = $('#data')
        this._inputQuantidade = $('#quantidade')
        this._inputValor = $('#valor')

        this._ordemAtual = ''

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem'
        )

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto'
        )

        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos(Negociacao))
            .then(negociacoes => negociacoes
                .forEach(negociacao => this._listaNegociacoes
                    .adiciona(negociacao)
                )
            )
            .catch(erro => this._mensagem.texto = erro)
    }

    adiciona(event) {
        event.preventDefault()

        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adiciona(this._criaNegociacao()))
            .then(negociacao => this._adiciona(negociacao))
            .catch(erro => this._mensagem.texto = erro)
    }


    importaNegociacoes() {
        const service = new NegociacaoService()

        service
            .obterNegociacoes()
            .then(negs => {
                negs.forEach(neg => this._listaNegociacoes.adiciona(neg))
                this._mensagem.texto = 'Negociações importadas com sucesso.'
            })
            .catch()
    }

    apaga() {
        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(() => this._apaga())
            .catch(erro => this._mensagem.texto = erro)
    }

    ordena(coluna) {
        console.log(coluna)
        if (this._ordemAtual === coluna) {
            this._listaNegociacoes.inverteOrdem()
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna])
        }
        this._ordemAtual = coluna
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textToDate(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        )
    }

    _limpaFormulario() {
        this._inputData.value = ''
        this._inputQuantidade.value = 1
        this._inputValor.value = 0.0
        this._inputData.focus()
    }

    _adiciona(negociacao) {
        this._listaNegociacoes.adiciona(negociacao)
        this._mensagem.texto = 'Negociação adicionada com sucesso'
        this._limpaFormulario()
        this.ordena('data')
    }

    _apaga() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociaçõe apagadas com sucesso';
    }

}