'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, stores, version, dbnName, connection, close, ConnectionFactory;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            stores = ['negociacoes'];
            version = 4;
            dbnName = 'aluraframe';
            connection = null;
            close = null;

            _export('ConnectionFactory', ConnectionFactory = function () {
                function ConnectionFactory() {
                    _classCallCheck(this, ConnectionFactory);

                    throw new Error('Não é possível instancinar ConnectionFactory');
                }

                _createClass(ConnectionFactory, null, [{
                    key: 'getConnection',
                    value: function getConnection() {
                        return new Promise(function (resolve, reject) {

                            if (connection) {
                                resolve(connection);
                                return;
                            }

                            var openRequest = window.indexedDB.open(dbnName, version);

                            openRequest.onupgradeneeded = function (e) {
                                ConnectionFactory._createConnection(e.target.result);
                            };

                            openRequest.onsuccess = function (e) {
                                if (!connection) {
                                    connection = e.target.result;
                                    close = connection.close.bind(connection);
                                    connection.close = function () {
                                        throw new Error('Voce nao pode fechar diretamente uma conexao');
                                    };
                                }

                                resolve(connection);
                            };

                            openRequest.onerror = function (e) {
                                console.log(e.target.error);
                                reject(e.target.error.name);
                            };
                        });
                    }
                }, {
                    key: 'closeConnection',
                    value: function closeConnection() {
                        if (connection) {
                            close();
                            connection = null;
                        }
                    }
                }, {
                    key: '_createConnection',
                    value: function _createConnection(c) {
                        stores.forEach(function (s) {
                            if (c.objectStoreNames.contains(s)) c.deleteObjectStore(s);
                            c.createObjectStore(s, { autoIncrement: true });
                        });
                    }
                }]);

                return ConnectionFactory;
            }());

            _export('ConnectionFactory', ConnectionFactory);
        }
    };
});
//# sourceMappingURL=ConnectionFactory.js.map