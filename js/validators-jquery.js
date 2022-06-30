//altera valores padrões do validator para adicionar a classe invalid-feedback no elemento criado abaixo do campo para mostrar o erro
jQuery.validator.setDefaults({
    errorElement: 'span',
    errorPlacement: function (error, element) {
        error.addClass('invalid-feedback');
        element.closest('.form-outline').append(error);
    },
    highlight: function (element, errorClass, validClass) {
        $(element).addClass('is-invalid');
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).removeClass('is-invalid');
    }
});

//adiciona o método regexp para verificar se o valor do campo está de acordo com a expressão regular
$.validator.addMethod('regexp', function (value, element, param) {
    return this.optional(element) || value.match(param);
},
    'O valor não corresponde ao formato padrão.');

//Adiciona método para validar o login, se possui usuário no local storage e a senha é correta
$.validator.addMethod('validateLogin', function (param) {
    return (!param || loginValido());
},
    'Nome de usuário ou senha inválidos.');

//Adiciona método para validar se o nome de usuário já existe no localstorage
$.validator.addMethod('validateUsernameExists', function (value, param) {
    return (!param || (!usernameExistsInLocalStorage(value)));
},
    'Este nome de usuário já está sendo usado, informe outro.');

//Adiciona método para validar se o email já existe no localstorage
$.validator.addMethod('validateEmailExists', function (value, param) {
    return (!param || (!emailExistsInLocalStorage(value)));
},
    'Este email já está sendo usado, informe outro.');

//altera as mensagens padrão para os métodos
jQuery.extend(jQuery.validator.messages, {
    required: "Este campo é obrigatório.",
    remote: "Corrija este campo.",
    email: "Informe um e-mail válido.",
    url: "Insira uma URL válida.",
    date: "Insira uma data válida.",
    dateISO: "Insira uma data válida (ISO).",
    number: "Insira um número válido.",
    digits: "Insira apenas dígitos.",
    creditcard: "Digite um número de cartão de crédito válido.",
    equalTo: "Entre com o mesmo valor novamente.",
    accept: "Insira um valor com uma extensão válida.",
    maxlength: jQuery.validator.format("Não insira mais de {0} caracteres."),
    minlength: jQuery.validator.format("Insira pelo menos {0} caracteres."),
    rangelength: jQuery.validator.format("Insira um valor entre {0} e {1} caracteres."),
    range: jQuery.validator.format("Insira um valor entre {0} e {1}."),
    max: jQuery.validator.format("Insira um valor menor ou igual a {0}."),
    min: jQuery.validator.format("Insira um valor maior ou igual a {0}.")
});

//adiciona validações ao formulário de registro de usuários
$('#form-register').validate({
    rules: {
        registerName: {
            required: true
        },
        registerUsername: {
            required: true,
            validateUsernameExists: true
        },
        registerEmail: {
            required: true,
            validateEmailExists: true
        },
        registerPassword: {
            required: true,
            // mínimo 8 caracteres, pelo menos uma letra, um número e um caracter especial
            regexp: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        },
        registerRepeatPassword: {
            equalTo: '#registerPassword',
            required: true
        }
    },
    messages: {
        registerPassword: {
            regexp: "Mínimo 8 caracteres, uma letra, um número e um caracter especial."
        },
        registerRepeatPassword: {
            equalTo: "Senha deve ser a mesma informada no campo Senha."
        }
    },
    submitHandler: function (form) {
        createUserLocalStorage();
        form.submit();
    }
});

// Adiciona validações ao formulário de login
$('#form-login').validate({
    rules: {
        loginName: {
            required: true
        },
        loginPassword: {
            required: true,
            validateLogin: true
        }
    },
    submitHandler: function (form) {
        login();
        form.submit();
    }
});

// Adiciona validações ao formulário de contato
$('#form-send-contact').validate({
    rules: {
        contactName: {
            required: true
        },
        contactEmail: {
            required: true
        },
        cocontactSubject: {
            required: true
        },
        contactMsg: {
            required: true
        }
    },
    submitHandler: function (form) {
        sendContact();
        form.submit();
    }
});