class NegociacaoController {
    constructor() {
        const $ = document.querySelector.bind(document)
        this._inputData = $('#data')
        this._inputQuantidade = $('#quantidade')
        this._inputValor = $('#valor')
    }

    adiciona(event) {
        event.preventDefault()
        let data = new Date(...this._inputData
            .value
            .split('-')
            .map((value, i) => value - i % 2)
        )

        const negociacao = new Negociacao(
            data,
            this._inputQuantidade.value,
            this._inputValor.value
        )

        console.log('data:',
            negociacao.data.getDate() + '/' +
            (negociacao.data.getMonth() + 1) + '/' +
            negociacao.data.getFullYear()
        )

    }
}