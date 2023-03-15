class ValidaCPF {
  constructor(cpf) {
    this.cpf = false;
    if (typeof cpf !== 'string') return;

    cpf = cpf.replace(/\D+/g, '');

    if (cpf.length !== 11) return;
    if (ValidaCPF.isSequencia(cpf)) return;

    this.cpf = cpf;
  }

  static isSequencia(cpf) {
    return cpf[0].repeat(cpf.length) === cpf;
  }

  valida() {
    if (!this.cpf) return false;

    const cpfParcial = this.cpf.slice(0, -2);
    const digito1 = ValidaCPF.criaDigito(cpfParcial);
    const digito2 = ValidaCPF.criaDigito(cpfParcial + digito1);
    const novoCpf = cpfParcial + digito1 + digito2;

    return novoCpf === this.cpf;
  }

  static criaDigito(cpfParcial) {
    const total = cpfParcial.split('').reduce((acc, vlr, i) => {
      acc += Number(vlr) * (cpfParcial.length + 1 - i);
      return acc;
    }, 0);

    const digito = 11 - (total % 11);
    return digito > 9 ? '0' : String(digito);
  }
}
