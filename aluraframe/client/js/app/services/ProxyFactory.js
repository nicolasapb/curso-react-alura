class ProxyFactory {
    static create(objeto, props, acao) {
        return new Proxy(objeto, {

            get(target, prop, receiver) {
                if (props.includes(prop) &&
                    ProxyFactory._isFunction(target[prop])) {
                    return function() {
                        const retorno = Reflect.apply(target[prop], target, arguments)
                        return acao(target)
                        return retorno
                    }
                }

                return Reflect.get(target, prop, receiver)
            },

            set(target, prop, value, receiver) {
                const retorno = Reflect.set(target, prop, value, receiver)
                if (props.includes(prop)) acao(target)
                return retorno
            }
        })
    }

    static _isFunction(func) {
        return typeof(func) == typeof(Function)
    }
}