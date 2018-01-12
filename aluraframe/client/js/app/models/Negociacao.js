class Negociacao {

    constructor(data, quant, valor) {
        this._data = data
        this._quantidade = quant
        this._valor = valor
    }

    getVolume() {
        return this._quantidade * this._valor
    }

    getData() {
        return this._data
    }

    getQuantidade() {
        return this._quantidade
    }

    getValor() {
        return this._valor
    }
}