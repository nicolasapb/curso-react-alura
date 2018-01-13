class NegociacaoController {
    constructor() {
        const $ = document.querySelector.bind(document)
        this._inputData = $('#data')
        this._inputQuantidade = $('#quantidade')
        this._inputValor = $('#valor')
    }

    adiciona(event) {
        event.preventDefault()
            // const dateHelper = new DateHelper();

        const negociacao = new Negociacao(
            DateHelper.textToDate(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        )

        console.log('negociacao', negociacao)
        console.log('data:', DateHelper.dateToText(negociacao.data))

    }
}