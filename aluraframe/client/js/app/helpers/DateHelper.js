class DateHelper {
    textToDate(texto) {
        return new Date(...texto
            .split('-')
            .map((value, i) => value - i % 2)
        )
    }

    dateToText(data) {
        return data.getDate() + '/' +
            (data.getMonth() + 1) + '/' +
            data.getFullYear()
    }
}