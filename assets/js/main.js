class ValidaFormulario {
  constructor() {
    this.formulario = document.querySelector('.formulario');
    this.events();
  }

  events() {
    this.formulario.addEventListener('submit', (e) => {
      this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const fildsValids = this.fildsIsValid();

    if (fildsValids) {
      alert('Formulário Enviado');
      this.formulario.submit();
    }
  }

  fildsIsValid() {
    let valid = true;

    for (let errorText of this.formulario.querySelectorAll('.error-text')) {
      errorText.remove();
    }

    for (let campo of this.formulario.querySelectorAll('.validad')) {
      const label = campo.previousElementSibling.innerHTML.replace(':', '');

      if (!campo.value) {
        this.createError(campo, `Campo "${label}" não pode estar em branco.`);
        valid = false;
      } else {
        if (campo.classList.contains('cpf')) {
          if (!this.validCPF(campo)) valid = false;
        }

        if (campo.classList.contains('usuario')) {
          if (!this.validUsuario(campo)) valid = false;
        }

        if (campo.classList.contains('senha')) {
          if (!this.passwordValid()) valid = false;
        }
      }
    }

    return valid;
  }

  passwordValid() {
    let valid = true;

    const password = this.formulario.querySelector('.senha');
    const repeatPassword = this.formulario.querySelector('.repete-senha');

    if (password.value !== repeatPassword.value) {
      this.createError(
        password,
        `Campo "Senha" e "Repetir Senha" precisam ser iguais.`
      );
      this.createError(
        repeatPassword,
        `Campo "Senha" e "Repetir Senha" precisam ser iguais.`
      );

      valid = false;
    }

    if (
      !password.value.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{4,}$/
      )
    ) {
      this.createError(
        password,
        `Senha precisa ter no minimo 4 caracteres (Letra Maiúscula, Minúscula, Caractere Especial e Números)`
      );

      valid = false;
    }

    return valid;
  }

  createError(campo, msg) {
    const div = document.createElement('div');
    div.innerText = msg;
    div.classList.add('error-text');
    campo.insertAdjacentElement('afterend', div);
  }

  validCPF(campo) {
    const cpf = new ValidaCPF(campo.value);

    if (!cpf.valida()) {
      this.createError(campo, 'CPF inválido.');
      return false;
    }

    return true;
  }

  validUsuario(campo) {
    let valid = true;
    const usuario = campo.value;

    if (usuario.length < 3 || usuario.length > 12) {
      this.createError(campo, 'Usuário precisa ter entre 3 e 12 caracteres.');
      valid = false;
    }

    if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.createError(
        campo,
        'Nome de usuário precisa conter apenas letras e/ou número.'
      );
    }

    return valid;
  }
}

const formulario = new ValidaFormulario();
