import PubSub from 'pubsub-js'

export default class LogicaTimeline {
    "use strict";
    constructor(fotos) {
        this.fotos = fotos
    }

    like(fotoId) {
        const urlLike = `http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`

        fetch(urlLike, { method: 'POST' })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Erro ao executar a operação')
                }
            })
            .then(liker => {
                const fotoEncontrada = this.fotos.find(foto => foto.id === fotoId)
                fotoEncontrada.likeada = !fotoEncontrada.likeada

                const possivelLiker = fotoEncontrada.likers.find(likerAtual => likerAtual.login === liker.login)

                if (possivelLiker === undefined) {
                    fotoEncontrada.likers.push(liker)
                } else {
                    fotoEncontrada.likers = fotoEncontrada.likers.filter(likerAtual => likerAtual.login !== liker.login)
                } 

                PubSub.publish('timeline', this.fotos)
            })
            .catch(erro => console.log(erro))   
    }

    comentar(fotoId, texto) {
        const urlComentario = `http://localhost:8080/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({ texto }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch(urlComentario, requestInfo)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Erro ao realizar o comentário')
                }
            })
            .then(comentario => { 
                const fotoEncontrada = this.fotos.find(foto => foto.id === fotoId)

                fotoEncontrada.comentarios.push(comentario)
                
                PubSub.publish('timeline', this.fotos)
            })
            .catch(erro => console.log(erro))
    }
}