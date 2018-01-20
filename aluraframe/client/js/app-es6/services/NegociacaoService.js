import { HttpService } from "./HttpService";
import { ConnectionFactory } from "./ConnectionFactory";
import { NegociacaoDao } from "../dao/NegociacaoDao";
import { Negociacao } from "../models/Negociacao";

export class NegociacaoService {

    constructor() {
        this._http = new HttpService()
    }

    obterNegociacoes() {
        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).
        then(periodos => {
            const negociacoes = periodos.reduce((dados, periodo) => dados.concat(periodo), [])
            return negociacoes
        }).catch(erro => { throw new Error(erro) })
    }

    obterNegociacoesDaSemana() {
        return this._http.get('negociacoes/semana')
            .then(negociacoes => negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
            .catch(erro => {
                console.log(erro)
                throw new Error('Não foi possível obter as negociações da samana')
            })
    }

    obterNegociacoesDaSemanaAnterior() {
        return this._http.get('negociacoes/anterior')
            .then(negociacoes => negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
            .catch(erro => {
                console.log(erro)
                throw new Error('Não foi possível obter as negociações da semana anterior')
            })
    }

    obterNegociacoesDaSemanaRetrasada() {
        return this._http.get('negociacoes/retrasada')
            .then(negociacoes => negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
            .catch(erro => {
                console.log(erro)
                throw new Error('Não foi possível obter as negociações semana retrasada')
            })
    }

    cadastra(negociacao) {
        return new Promise((resolve, reject) => {
            ConnectionFactory
                .getConnection()
                .then(connection => new NegociacaoDao(connection))
                // tbd: filtro
                .then(dao => dao.adiciona(negociacao))
                .then(negociacao => resolve(negociacao))
                .catch(erro => reject(erro))
        })
    }

    lista() {
        return new Promise((resolve, reject) => {
            ConnectionFactory
                .getConnection()
                .then(connection => new NegociacaoDao(connection))
                .then(dao => dao.listaTodos(Negociacao))
                .then(negs => resolve(negs))
                .catch(erro => reject(erro))
        })
    }

    apaga() {
        return new Promise((resolve, reject) => {
            ConnectionFactory
                .getConnection()
                .then(connection => new NegociacaoDao(connection))
                .then(dao => dao.apagaTodos())
                .then(() => resolve())
                .catch(erro => reject(erro))
        })
    }

    importa(listaAtual) {
        return this.obterNegociacoes()
            .then(negs => negs.filter(n => !listaAtual.some(v => n.isEquals(v))))
            .catch(erro => { throw new Error(erro) })
    }
}