class NegociacaoController {
    adiciona(event) {
        event.preventDefault()
        const $ = document.querySelector.bind(document)
        let inputData = $('#data')
        let inputQuantidade = $('#quantidade')
        let inputValor = $('#valor')
        console.log('data', inputData.value)
        console.log('quantidade', inputQuantidade.value)
        console.log('valor', inputValor.value)
    }
}