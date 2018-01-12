class Negociacao {

    constructor(data, quant, valor) {
        this.data = data
        this.quantidade = quant
        this.valor = valor
        this.volume = this.quantidade * this.valor
    }

    getVolume() {
        return this.volume
    }
}