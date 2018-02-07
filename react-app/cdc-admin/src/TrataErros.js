import PubSub from "pubsub-js";

export default class TrataErros {

  publicaErros(erros) {
    if (erros.errors) {
      erros.errors.map((erro) => PubSub.publish('erro-validacao', erro)) 
    }
  } 

}