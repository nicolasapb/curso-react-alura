import { NegociacaoController } from "./controllers/NegociacaoController";
import {} from "./polyfill/fetch";

let negociacaoController = new NegociacaoController()

document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController)
document.querySelector('#btnApaga').onsubmit = negociacaoController.apaga.bind(negociacaoController)