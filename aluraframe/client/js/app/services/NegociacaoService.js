class NegociacaoService {

    obterNegociacoesDaSemana() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()

            xhr.open('GET', 'negociacoes/semana', true)

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {

                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(
                                new Date(objeto.data),
                                objeto.quantidade,
                                objeto.valor)))
                    } else {
                        console.log('res?', xhr.responseText)
                        reject('Não foi possível obter as negociações da samana')
                    }
                }
            }
            xhr.send()
        })
    }

    obterNegociacoesDaSemanaAnterior() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()

            xhr.open('GET', 'negociacoes/anterior', true)

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(
                                new Date(objeto.data),
                                objeto.quantidade,
                                objeto.valor)))
                    } else {
                        console.log('res?', xhr.responseText)
                        reject('Não foi possível obter as negociações da semana anterior', )
                    }
                }
            }
            xhr.send()
        })
    }

    obterNegociacoesDaSemanaRetrasada() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()

            xhr.open('GET', 'negociacoes/retrasada', true)

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(
                                new Date(objeto.data),
                                objeto.quantidade,
                                objeto.valor)))
                    } else {
                        console.log('res?', xhr.responseText)
                        reject('Não foi possível obter as negociações semana retrasada', )
                    }
                }
            }
            xhr.send()
        })
    }
}