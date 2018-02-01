/* Código simplório, apenas para fornecer o serviço para a aplicação */
var api = {}

// var dataAtual = new Date();
// var dataAnterior = new Date();
// dataAnterior.setDate(dataAtual.getDate() - 7);
// var dateRetrasada = new Date();
// dateRetrasada.setDate(dataAtual.getDate() - 14);

var autores = [
      { id: 1, nome : 'Geraldo', email : 'teste@teste.com', senha: 1234 },
      { id: 2, nome : 'Finn', email : 'kek@kek.com', senha: 1234 },
      { id: 3, nome : 'Jake', email : 'lol@lol.com', senha: 1234 }
    ];


api.autores = function(req, res) {
    // var negociacoesAtuais = negociacoes.filter(function(negociacao) {
    //     return negociacao.data > dataAnterior;
    // });
    res.json(autores);
};

// api.listaAnterior = function(req, res) {
   
//    var negociacoesAnteriores = negociacoes.filter(function(negociacao) {
//         return negociacao.data < dataAtual && negociacao.data > dateRetrasada;
//     });
// 	setTimeout(function() {
// 		res.json(negociacoesAnteriores);	
// 	}, 500);
    
// };

// api.listaRetrasada = function(req, res) {

//    var negociacoesRtrasadas = negociacoes.filter(function(negociacao) {
//         return negociacao.data < dataAnterior;
//     });
//     res.json(negociacoesRtrasadas);
    
// };

api.novoAutor = function(nome, email, senha) {
    let id = autores.length + 1
    return {id, nome, email, senha}
}

api.cadastraAutor = function(req, res) {
//    req.body._data = new Date(req.body._data);
   console.log('Dado recebido via POST:')
   console.log(req.body);
   req.body = api.novoAutor(req.body.nome, req.body.email, req.body.senha)
   console.log(req.body)
   autores.push(req.body); 
   res.status(200).json(autores);
};

module.exports = api;