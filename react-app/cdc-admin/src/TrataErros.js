import PubSub from "pubsub-js";

export default class TrataErros {

  publicaErros(erros) {
    erros.errors.map((erro) => PubSub.publish('erro-validacao', erro)) 
  } 

}