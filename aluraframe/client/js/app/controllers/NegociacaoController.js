class NegociacaoController {
    constructor() {
        const $ = document.querySelector.bind(document)
        this._inputData = $('#data')
        this._inputQuantidade = $('#quantidade')
        this._inputValor = $('#valor')

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia'
        )

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto'
        )
    }

    adiciona(event) {
        event.preventDefault()
        this._listaNegociacoes.adiciona(this._criaNegociacao())
        this._mensagem.texto = 'Negociação adicionada com sucesso'
        this._limpaFormulario()
    }

    importaNegociacoes() {
        const service = new NegociacaoService()

        service.obterNegociacoesDaSemana()
            .then(negs => {
                negs.forEach(neg => this._listaNegociacoes.adiciona(neg))
                this._mensagem.texto = 'Negociações da semana importadas com sucesso.'
            })
            .catch(erro => this._mensagem.texto = erro)

        service.obterNegociacoesDaSemanaAnterior()
            .then(negs => {
                negs.forEach(neg => this._listaNegociacoes.adiciona(neg))
                this._mensagem.texto = 'Negociações da semana anterior importadas com sucesso.'
            })
            .catch(erro => this._mensagem.texto = erro)

        service.obterNegociacoesDaSemanaRetrasada()
            .then(negs => {
                negs.forEach(neg => this._listaNegociacoes.adiciona(neg))
                this._mensagem.texto = 'Negociações da semana retrasada importadas com sucesso.'
            })
            .catch(erro => this._mensagem.texto = erro)

        /* service.obterNegociacoesDaSemana((err, negociacoes) => {
            if (err) {
                this._mensagem.texto = err
                return
            }

            negociacoes.forEach(
                negociacao => this._listaNegociacoes.adiciona(negociacao)
            )

            service.obterNegociacoesDaSemanaAnterior((err, negociacoes) => {
                if (err) {
                    this._mensagem.texto = err
                    return
                }

                negociacoes.forEach(
                    negociacao => this._listaNegociacoes.adiciona(negociacao)
                )

                service.obterNegociacoesDaSemanaRetrasada((err, negociacoes) => {
                    if (err) {
                        this._mensagem.texto = err
                        return
                    }

                    negociacoes.forEach(
                        negociacao => this._listaNegociacoes.adiciona(negociacao)
                    )

                    this._mensagem.texto = 'Negociações importadas com sucesso.'
                })

            })

        }) */

    }

    apaga() {
        this._listaNegociacoes.esvazia()
        this._mensagem.texto = 'Negociaçõe apagadas com sucesso'
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textToDate(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        )
    }

    _limpaFormulario() {
        this._inputData.value = ''
        this._inputQuantidade.value = 1
        this._inputValor.value = 0.0
        this._inputData.focus()
    }
}