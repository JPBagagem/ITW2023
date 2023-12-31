document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Função para verificar se uma string contém apenas números
        function isNumeric(value) {
            return /^\d+$/.test(value);
        }

        // Validar os campos
        const nome = document.querySelector('input[placeholder="Escreva o seu nome"]');
        const sobrenome = document.querySelector('input[placeholder="Escreva o seu username"]');
        const email = document.querySelector('input[placeholder="Coloque o seu email"]');
        const numeroTelemovel = document.querySelector('input[placeholder="Coloque o seu número"]');
        const password = document.querySelector('input[placeholder="Coloque a password"]');
        const confirmarPassword = document.querySelector('input[placeholder="Confirme a sua password"]');
        
        // Validar se os campos estão preenchidos
        if (
            nome.value.trim() === '' ||
            sobrenome.value.trim() === '' ||
            email.value.trim() === '' ||
            numeroTelemovel.value.trim() === '' ||
            password.value.trim() === '' ||
            confirmarPassword.value.trim() === ''
        ) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Validar se o nome e o sobrenome têm mais de três letras (ignorando espaços)
        if (nome.value.trim().replace(/\s/g, '').length < 3 || sobrenome.value.trim().replace(/\s/g, '').length < 3) {
            alert('O nome e o sobrenome devem ter mais de três letras.');
            return;
        }

        // Validar se o email contém um @
        if (!email.value.includes('@')) {
            alert('O email deve conter um "@".');
            return;
        }

        // Validar se o número de telemóvel contém apenas números
        if (!isNumeric(numeroTelemovel.value)) {
            alert('O número de telemóvel só pode conter números.');
            return;
        }

        // Validar se as senhas coincidem
        if (password.value !== confirmarPassword.value) {
            alert('As senhas não coincidem. Por favor, tente novamente.');
            return;
        }

        // Validar se um método de pagamento foi selecionado
        const metodosPagamento = document.querySelectorAll('input[name="gender"]');
        let metodoSelecionado = false;

        for (const metodo of metodosPagamento) {
            if (metodo.checked) {
                metodoSelecionado = true;
                break;
            }
        }

        if (!metodoSelecionado) {
            alert('Por favor, selecione um método de pagamento.');
            return;
        }

        // Se todas as validações passarem, você pode enviar o formulário
        alert('Formulário enviado com sucesso!');
        
        // Adicione aqui o redirecionamento
        window.location.href = 'index.html';
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