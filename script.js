document.addEventListener("DOMContentLoaded", function() {
	//click event
    $('#adiciona').click(function() {
        $('#pessoas .pessoa').last().after('<div class=\"pessoa\">Nome: <input class=\"name\" type=\"text\"></input> Pagou <input placeholder="R$: 00.00" class=\"number\" type=\"text\"></input></div>')
    });        

    $('#calcula').click(function() {
        pessoas = [];

        resultado = {
            totalConta: 0,
            valorPorPessoa: 0,
            final: []
        };

        $('#resultado').text('');

        $('.pessoa').each(function () {
            pessoas.push({ nome: $(this).find('.name').val(), pagou: Number($(this).find('.number').val()) });
        });

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

        $('#resultado').html($('#resultado').html() + 'Valor total da conta: ' + resultado.totalConta + '<br>');
        $('#resultado').html($('#resultado').html() + 'Valor por pessoa: ' + Math.round(resultado.valorPorPessoa*100)/100 + '<br>');

        for (var string in resultado.final) {
            $('#resultado').html($('#resultado').html() + resultado.final[string] + '<br>');
        };
    });
});

var resultado = {
    totalConta: 0,
    valorPorPessoa: 0,
    final: []
}

var pessoas = [];


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
        pessoaDevendo.nome + ' pagar ' + roundMoney(Math.round(valor*100)/100) + ' para ' + pessoaRecebendo.nome);
}

function roundMoney(money) {
    var integer = Math.floor(money);
    var fraction = Math.round((money % 1 *100)/10)*10;

    return parseFloat(integer + '.' + fraction);
}
