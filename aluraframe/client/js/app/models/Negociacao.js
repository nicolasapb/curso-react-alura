class Negociacao {

    constructor(data, quant, valor) {
        this._data = data
        this._quantidade = quant
        this._valor = valor
    }

    get volume() {
        return this._quantidade * this._valor
    }

    get data() {
        return this._data
    }

    get quantidade() {
        return this._quantidade
    }

    get valor() {
        return this._valor
    }
}