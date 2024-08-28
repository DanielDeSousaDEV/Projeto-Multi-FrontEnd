export function cpfValidator (cpf: string): boolean {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]+/g, '');

    // Verifica se o CPF tem 11 dígitos ou se é uma sequência repetida (ex: 111.111.111-11)
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    // Calcula o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = soma % 11;
    let primeiroDigitoVerificador = resto < 2 ? 0 : 11 - resto;

    // Calcula o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = soma % 11;
    let segundoDigitoVerificador = resto < 2 ? 0 : 11 - resto;

    // Verifica se os dígitos verificadores são iguais aos calculados
    return (
        primeiroDigitoVerificador === parseInt(cpf.charAt(9)) &&
        segundoDigitoVerificador === parseInt(cpf.charAt(10))
    );
}