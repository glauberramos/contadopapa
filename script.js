document.addEventListener("DOMContentLoaded", function() {
	document.getElementById('cube').addEventListener("click", function() {
    	document.getElementById('cube').classList.add("show-next");
  	});
});

var pessoas = [
    { nome: 'Glauber Ramos', pagou: 153.33 },
    { nome: 'Gabriel Andrade', pagou: 0 },
    { nome: 'Diogo Ribeiro', pagou: 47.11 },
    { nome: 'Thaisse dos Campos', pagou: 98.12 },
    { nome: 'Pedro Palaoro', pagou: 11.32 },
    { nome: 'Rodrigo Testa', pagou: 22 },
    { nome: 'Déia Veleoe', pagou: 98.12 },
    { nome: 'Lucas Valadares', pagou: 165 },
    { nome: 'Fernanada Paganini', pagou: 33 }
];
 
var resultado = {
	totalConta: 0,
    valorPorPessoa: 0,
    final: []
}
    
//calcula total da conta
$(pessoas).each(function(index1, input1) {
    resultado.totalConta += input1.pagou;
});
 
//calcula valor por pessoa
resultado.valorPorPessoa = resultado.totalConta/pessoas.length;
 
//calcula quem tem que pagar pra quem
$(pessoas).each(function(index2, input2) {
    if (precisaPagar(input2)) {
        $(pessoas).each(function(index3, input3) {
        	if(precisaReceber(input3)) {
				calculaQuantoVaiPagar(input2, input3);            	
            }
    	});
    }
});


function precisaReceber(pessoa) {
	return pessoa.pagou > resultado.valorPorPessoa;
}

function precisaPagar(pessoa) {
	return pessoa.pagou < resultado.valorPorPessoa;
}

function calculaQuantoVaiPagar(pessoaDevendo, pessoaRecebendo) {
	var pessoaDevendoTemQuePagar = resultado.valorPorPessoa - pessoaDevendo.pagou;
	var pessoaRecebendoTemQueReceber = pessoaRecebendo.pagou - resultado.valorPorPessoa;

	if (pessoaDevendoTemQuePagar > 0 && pessoaRecebendoTemQueReceber > 0) {
		if(pessoaDevendoTemQuePagar < pessoaRecebendoTemQueReceber) {
			pagaDivida(pessoaDevendo, pessoaRecebendo, pessoaDevendoTemQuePagar);
		} else {
			pagaDivida(pessoaDevendo, pessoaRecebendo, pessoaRecebendoTemQueReceber);
		}
	}
}

function pagaDivida(pessoaDevendo, pessoaRecebendo, valor) {
	pessoaRecebendo.pagou = pessoaRecebendo.pagou - valor; 
	pessoaDevendo.pagou = pessoaDevendo.pagou + valor;

	escreveQuantoVaiPagar(pessoaDevendo, pessoaRecebendo, valor);
}

function escreveQuantoVaiPagar(pessoaDevendo, pessoaRecebendo, valor) {
	resultado.final.push(
        pessoaDevendo.nome + ' pagar ' + Math.round(valor*100)/100 + ' para ' + pessoaRecebendo.nome);
}
