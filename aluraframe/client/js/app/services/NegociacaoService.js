class NegociacaoService {
    obterNegociacoesDaSemana(cb) {
        const xhr = new XMLHttpRequest()

        xhr.open('GET', 'negociacoes/semana', true)

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {

                    cb(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(
                            new Date(objeto.data),
                            objeto.quantidade,
                            objeto.valor)))

                } else {
                    console.log('res?', xhr.responseText)
                    cb('Não foi possível obter as negociações.', null)
                }
            }
        }

        xhr.send()
    }
}