class DateHelper {

    constructor() {
        throw new Error('Esta classe não pode ser instanciada')
    }

    static textToDate(texto) {
        return new Date(...texto
            .split('-')
            .map((value, i) => value - i % 2)
        )
    }

    static dateToText(data) {
        return data.getDate() + '/' +
            (data.getMonth() + 1) + '/' +
            data.getFullYear()
    }
}