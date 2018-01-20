'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ListaNegociacoes = require('../models/ListaNegociacoes');

var _Mensagem = require('../models/Mensagem');

var _NegociacaoView = require('../views/NegociacaoView');

var _MensagemView = require('../views/MensagemView');

var _NegociacaoService = require('../services/NegociacaoService');

var _DateHelper = require('../helpers/DateHelper');

var _Bind = require('../helpers/Bind');

var _Negociacao = require('../models/Negociacao');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoController = function () {
    function NegociacaoController() {
        _classCallCheck(this, NegociacaoController);

        var $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._service = new _NegociacaoService.NegociacaoService();

        this._listaNegociacoes = new _Bind.Bind(new _ListaNegociacoes.ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

        this._mensagem = new _Bind.Bind(new _Mensagem.Mensagem(), new _MensagemView.MensagemView($('#mensagemView')), 'texto');

        this._ordemAtual = '';
        this._init();
    }

    _createClass(NegociacaoController, [{
        key: '_init',
        value: function _init() {
            var _this = this;

            this._service.lista().then(function (negs) {
                return negs.forEach(function (neg) {
                    return _this._listaNegociacoes.adiciona(neg);
                });
            }).catch(function (erro) {
                return _this._mensagem.texto = erro;
            });

            setInterval(function () {
                return _this.importaNegociacoes();
            }, 3000);
        }
    }, {
        key: 'adiciona',
        value: function adiciona(event) {
            var _this2 = this;

            event.preventDefault();

            this._service.cadastra(this._criaNegociacao()).then(function (negociacao) {
                return _this2._adiciona(negociacao);
            }).catch(function (erro) {
                return _this2._mensagem.texto = erro;
            });
        }
    }, {
        key: 'importaNegociacoes',
        value: function importaNegociacoes() {
            var _this3 = this;

            this._service.importa(this._listaNegociacoes.negociacoes).then(function (negs) {
                negs.forEach(function (neg) {
                    return _this3._listaNegociacoes.adiciona(neg);
                });
                _this3._mensagem.texto = 'Negociações importadas com sucesso.';
            }).catch(function (erro) {
                return _this3._mensagem.texto = erro;
            });
        }
    }, {
        key: 'apaga',
        value: function apaga() {
            var _this4 = this;

            this._service.apaga().then(function () {
                return _this4._apaga();
            }).catch(function (erro) {
                return _this4._mensagem.texto = erro;
            });
        }
    }, {
        key: 'ordena',
        value: function ordena(coluna) {
            if (this._ordemAtual === coluna) {
                this._listaNegociacoes.inverteOrdem();
            } else {
                this._listaNegociacoes.ordena(function (a, b) {
                    return a[coluna] - b[coluna];
                });
            }
            this._ordemAtual = coluna;
        }
    }, {
        key: '_criaNegociacao',
        value: function _criaNegociacao() {
            return new _Negociacao.Negociacao(_DateHelper.DateHelper.textToDate(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
        }
    }, {
        key: '_limpaFormulario',
        value: function _limpaFormulario() {
            this._inputData.value = '';
            this._inputQuantidade.value = 1;
            this._inputValor.value = 0.0;
            this._inputData.focus();
        }
    }, {
        key: '_adiciona',
        value: function _adiciona(negociacao) {
            this._listaNegociacoes.adiciona(negociacao);
            this._mensagem.texto = 'Negociação adicionada com sucesso';
            this._limpaFormulario();
            this.ordena('data');
        }
    }, {
        key: '_apaga',
        value: function _apaga() {
            this._listaNegociacoes.esvazia();
            this._mensagem.texto = 'Negociaçõe apagadas com sucesso';
        }
    }]);

    return NegociacaoController;
}();
//# sourceMappingURL=NegociacaoController.js.map