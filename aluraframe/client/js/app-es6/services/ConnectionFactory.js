var ConnectionFactory = (() => {

    const stores = ['negociacoes']
    const version = 4
    const dbnName = 'aluraframe'
    let connection = null
    let close = null

    return class ConnectionFactory {

        constructor() {
            throw new Error('Não é possível instancinar ConnectionFactory')
        }

        static getConnection() {
            return new Promise((resolve, reject) => {

                if (connection) {
                    resolve(connection)
                    return
                }

                let openRequest = window.indexedDB.open(dbnName, version)

                openRequest.onupgradeneeded = e => {
                    ConnectionFactory._createConnection(e.target.result);
                }

                openRequest.onsuccess = e => {
                    if (!connection) {
                        connection = e.target.result
                        close = connection.close.bind(connection)
                        connection.close = () => {
                            throw new Error('Voce nao pode fechar diretamente uma conexao')
                        }
                    }

                    resolve(connection)
                }

                openRequest.onerror = e => {
                    console.log(e.target.error)
                    reject(e.target.error.name)
                }

            })
        }

        static closeConnection() {
            if (connection) {
                close()
                connection = null
            }
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