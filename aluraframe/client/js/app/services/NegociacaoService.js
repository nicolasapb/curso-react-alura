'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoService = function () {
    function NegociacaoService() {
        _classCallCheck(this, NegociacaoService);

        this._http = new HttpService();
    }

    _createClass(NegociacaoService, [{
        key: 'obterNegociacoes',
        value: function obterNegociacoes() {
            return Promise.all([this.obterNegociacoesDaSemana(), this.obterNegociacoesDaSemanaAnterior(), this.obterNegociacoesDaSemanaRetrasada()]).then(function (periodos) {
                var negociacoes = periodos.reduce(function (dados, periodo) {
                    return dados.concat(periodo);
                }, []);
                return negociacoes;
            }).catch(function (erro) {
                throw new Error(erro);
            });
        }
    }, {
        key: 'obterNegociacoesDaSemana',
        value: function obterNegociacoesDaSemana() {
            return this._http.get('negociacoes/semana').then(function (negociacoes) {
                return negociacoes.map(function (objeto) {
                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da samana');
            });
        }
    }, {
        key: 'obterNegociacoesDaSemanaAnterior',
        value: function obterNegociacoesDaSemanaAnterior() {
            return this._http.get('negociacoes/anterior').then(function (negociacoes) {
                return negociacoes.map(function (objeto) {
                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana anterior');
            });
        }
    }, {
        key: 'obterNegociacoesDaSemanaRetrasada',
        value: function obterNegociacoesDaSemanaRetrasada() {
            return this._http.get('negociacoes/retrasada').then(function (negociacoes) {
                return negociacoes.map(function (objeto) {
                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações semana retrasada');
            });
        }
    }, {
        key: 'cadastra',
        value: function cadastra(negociacao) {
            return new Promise(function (resolve, reject) {
                ConnectionFactory.getConnection().then(function (connection) {
                    return new NegociacaoDao(connection);
                })
                // tbd: filtro
                .then(function (dao) {
                    return dao.adiciona(negociacao);
                }).then(function (negociacao) {
                    return resolve(negociacao);
                }).catch(function (erro) {
                    return reject(erro);
                });
            });
        }
    }, {
        key: 'lista',
        value: function lista() {
            return new Promise(function (resolve, reject) {
                ConnectionFactory.getConnection().then(function (connection) {
                    return new NegociacaoDao(connection);
                }).then(function (dao) {
                    return dao.listaTodos(Negociacao);
                }).then(function (negs) {
                    return resolve(negs);
                }).catch(function (erro) {
                    return reject(erro);
                });
            });
        }
    }, {
        key: 'apaga',
        value: function apaga() {
            return new Promise(function (resolve, reject) {
                ConnectionFactory.getConnection().then(function (connection) {
                    return new NegociacaoDao(connection);
                }).then(function (dao) {
                    return dao.apagaTodos();
                }).then(function () {
                    return resolve();
                }).catch(function (erro) {
                    return reject(erro);
                });
            });
        }
    }, {
        key: 'importa',
        value: function importa(listaAtual) {
            return this.obterNegociacoes().then(function (negs) {
                return negs.filter(function (n) {
                    return !listaAtual.some(function (v) {
                        return n.isEquals(v);
                    });
                });
            }).catch(function (erro) {
                throw new Error(erro);
            });
        }
    }]);

    return NegociacaoService;
}();
//# sourceMappingURL=NegociacaoService.js.map