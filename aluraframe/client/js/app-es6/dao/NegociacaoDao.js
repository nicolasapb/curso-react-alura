// import { Negociacao } from "../models/Negociacao"; 

export class NegociacaoDao {

    constructor(connection) {
        this._connection = connection
        this._store = 'negociacoes'
    }

    adiciona(obj) {
        return new Promise((resolve, reject) => {
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(obj)

            request.onsuccess = e => resolve(obj)

            request.onerror = e => {
                console.log(e.target.error)
                reject(e.target.error.name)
            }
        })
    }

    listaTodos(Obj) {
        return new Promise((resolve, reject) => {
            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor()

            let list = []
            cursor.onsuccess = e => {
                let atual = e.target.result
                if (atual) {
                    let dado = atual.value
                    let args = Object.values(dado)

                    list.push(Reflect.construct(Obj, args))
                    atual.continue()
                } else {
                    resolve(list)
                }
            }

            cursor.onerror = e => {
                console.log(e.target.error)
                reject(e.target.error.name)
            }
        })
    }

    apagaTodos() {
        return new Promise((resolve, reject) => {
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear()

            request.onsuccess = e => resolve()

            request.onerror = e => {
                console.log(e.target.error)
                reject(e.target.error.name)
            }
        })
    }
}