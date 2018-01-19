class NegociacaoController {
    constructor() {
        const $ = document.querySelector.bind(document)
        this._inputData = $('#data')
        this._inputQuantidade = $('#quantidade')
        this._inputValor = $('#valor')
        this._service = new NegociacaoService()

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

        this._ordemAtual = ''
        this._init()
    }

    _init() {
        this._service
            .lista()
            .then(negs => negs.forEach(neg => this._listaNegociacoes.adiciona(neg)))
            .catch(erro => this._mensagem.texto = erro)

        setInterval(() => this.importaNegociacoes(), 5000)
    }

    adiciona(event) {
        event.preventDefault()

        this._service
            .cadastra(this._criaNegociacao())
            .then(negociacao => this._adiciona(negociacao))
            .catch(erro => this._mensagem.texto = erro)

    }

    importaNegociacoes() {
        this._service
            .obterNegociacoes()
            .then(negs =>
                negs.filter(neg =>
                    !this._listaNegociacoes.negociacoes
                    .some(n => JSON.stringify(n) == JSON.stringify(neg))
                )
            )
            .then(negs => {
                negs.forEach(neg => this._listaNegociacoes.adiciona(neg))
                this._mensagem.texto = 'Negociações importadas com sucesso.'
            })
            .catch()
    }

    apaga() {
        this._service
            .apaga()
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