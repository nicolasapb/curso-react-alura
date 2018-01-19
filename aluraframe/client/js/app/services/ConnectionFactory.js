var ConnectionFactory = (() => {

    let stores = ['negociacoes']
    let version = 4
    let dbnName = 'aluraframe'
    let connection = null

    return class ConnectionFactory {

        constructor() {
            throw new Error('Não é possível instancinar ConnectionFactory')
        }

        static getConnection() {
            return new Promise((resolve, reject) => {

                if (connection) {
                    console.log('conexao ja existe')
                    resolve(connection)
                    return
                }

                console.log('criando conexao...')
                let openRequest = window.indexedDB.open(dbnName, version)

                openRequest.onupgradeneeded = e => {
                    ConnectionFactory._createConnection(e.target.result);
                }

                openRequest.onsuccess = e => {
                    if (!connection) connection = e.target.result
                    resolve(connection)
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
})()