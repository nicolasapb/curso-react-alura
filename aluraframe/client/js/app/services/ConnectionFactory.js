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
                ConnectionFactory._createConnection(e.target.result);
            }

            openRequest.onsuccess = e => {
                resolve(e.target.result)
            }

            openRequest.onerror = e => {
                console.log(e.target.error)
                reject(e.target.error.name)
            }

        })
    }

    // c => connection
    // s => store
    static _createConnection(c) {
        stores.forEach(s => {
            if (c.objectStoreNames.contains(s)) c.deleteObjectStore(s);
            c.createObjectStore(s, { autoIncrement: true });
        });
    }
}