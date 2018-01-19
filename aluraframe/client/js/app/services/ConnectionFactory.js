var stores = ['negociacoes']
var version = 4
var dbnName = 'aluraframe'

class ConnectionFactory {

    constructor() {
        throw new Error('Não é possível instancinar ConnectionFactory')
    }

    static getConnection() {
        return new Promise((resolve, reject) => {

            let openRequest = window.indexedDB.open(dbnName, version)

            openRequest.onupgradeneeded = e => {

            }

            openRequest.onerror = e => {

            }

            openRequest.onsuccess = e => {

            }

        })
    }

}