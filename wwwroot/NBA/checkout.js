$(document).ready(function () {
    $('form').submit(function (event) {
        // Resetar as mensagens de erro
        $('.error').remove();

        // Validar o email
        var email = $('input[type="text"][placeholder="Escreva o seu email"]').val();
        if (email.length < 3 || email.indexOf('@') === -1) {
            event.preventDefault();
            alert('Email deve conter @');
            return;
        }

        // Validar o nome
        var nome = $('input[placeholder="Escreva o seu nome"]').val();
        if (nome.length < 3) {
            event.preventDefault();
            alert('Nome deve ter mais de três letras');
            return;
        }

        // Validar a morada
        var morada = $('input[placeholder="Escreva a sua morada"]').val();
        if (morada.length < 3) {
            event.preventDefault();
            alert('Morada deve ter mais de três letras');
            return;
        }

        // Validar o número do cartão de crédito, ano de validade e código postal
        var numeroCartao = $('input[placeholder="Coloque o seu número"]').val();
        var anoValidade = $('input[placeholder="Ano de validade do cartão"]').val();
        var codigoPostal = $('input[placeholder="Escreva o seu código postal"]').val();

        if (!/^\d+$/.test(numeroCartao)) {
            event.preventDefault();
            alert('Número do cartão de crédito deve conter apenas números');
            return;
        }

        if (!/^\d+$/.test(anoValidade)) {
            event.preventDefault();
            alert('Ano de validade deve conter apenas números');
            return;
        }

        if (!/^\d+$/.test(codigoPostal)) {
            event.preventDefault();
            alert('Código Postal deve conter apenas números');
            return;
        }

        // Exibir mensagem de sucesso apenas se todos os campos estiverem corretos
        alert('Formulário aceite');

        window.location.href = 'index.html';

        // Impedir o envio padrão do formulário
        event.preventDefault();
    });
});

$(document).ready(function () {
    $('input[name="gender"]').change(function () {
        // Ocultar todos os campos de número primeiro
        $('.payment-input').hide();

        // Mostrar o campo de número correspondente à opção selecionada
        if ($(this).attr('id') === 'dot-1') {
            $('#cardNumber').show();
        } else if ($(this).attr('id') === 'dot-2') {
            $('#mbwayNumber').show();
        }
    });
    $("#price").text(localStorage.getItem("quantidadepagar").replace('"','').replace('"',''))
});