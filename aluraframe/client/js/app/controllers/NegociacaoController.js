class NegociacaoController {
    constructor() {
        const $ = document.querySelector.bind(document)
        this.inputData = $('#data')
        this.inputQuantidade = $('#quantidade')
        this.inputValor = $('#valor')
    }

    adiciona(event) {
        event.preventDefault()
        console.log('data', this.inputData.value)
        console.log('quantidade', this.inputQuantidade.value)
        console.log('valor', this.inputValor.value)
    }
}