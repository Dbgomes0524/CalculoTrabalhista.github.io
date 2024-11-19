// Função para calcular o desconto do INSS
function calcularINSS(salarioBruto) {
    let inss = 0;

    if (salarioBruto <= 1320.00) {
        inss = salarioBruto * 0.075;
    } else if (salarioBruto <= 2571.29) {
        inss = (1320.00 * 0.075) + ((salarioBruto - 1320.00) * 0.09);
    } else if (salarioBruto <= 3856.94) {
        inss = (1320.00 * 0.075) + ((2571.29 - 1320.00) * 0.09) + ((salarioBruto - 2571.29) * 0.12);
    } else if (salarioBruto <= 7507.49) {
        inss = (1320.00 * 0.075) + ((2571.29 - 1320.00) * 0.09) + ((3856.94 - 2571.29) * 0.12) + ((salarioBruto - 3856.94) * 0.14);
    }
    
    return inss;
}

// Função para calcular o desconto do IRPF
function calcularIRPF(salarioBruto, inss) {
    const baseCalculo = salarioBruto - inss;
    let irpf = 0;

    if (baseCalculo <= 2112.00) {
        irpf = 0;
    } else if (baseCalculo <= 2826.65) {
        irpf = (baseCalculo - 2112.00) * 0.075;
    } else if (baseCalculo <= 3751.06) {
        irpf = (2826.65 - 2112.00) * 0.075 + (baseCalculo - 2826.65) * 0.15;
    } else if (baseCalculo <= 4664.68) {
        irpf = (2826.65 - 2112.00) * 0.075 + (3751.06 - 2826.65) * 0.15 + (baseCalculo - 3751.06) * 0.225;
    } else {
        irpf = (2826.65 - 2112.00) * 0.075 + (3751.06 - 2826.65) * 0.15 + (4664.68 - 3751.06) * 0.225 + (baseCalculo - 4664.68) * 0.275;
    }

    return irpf;
}

// Função principal que calcula e exibe o resultado
function calcularSalario() {
    const valorHora = parseFloat(document.getElementById('valorHora').value);
    const horasTrabalhadas = parseFloat(document.getElementById('horasTrabalhadas').value);
    const valeTransporte = document.getElementById('valeTransporte').value.toUpperCase();
    const outrasDeducoes = parseFloat(document.getElementById('outrasDeducoes').value);

    // Verifica se o valor da hora é 0 para sair do sistema
    if (valorHora === 0) {
        alert("Saindo do sistema...");
        return;
    }

    // Cálculo do salário bruto
    const salarioBruto = valorHora * horasTrabalhadas;

    // Cálculo do INSS
    const descontoINSS = calcularINSS(salarioBruto);

    // Cálculo do IRPF
    const descontoIRPF = calcularIRPF(salarioBruto, descontoINSS);

    // Cálculo do Vale Transporte
    const descontoValeTransporte = valeTransporte === "S" ? salarioBruto * 0.06 : 0;

    // Outras deduções
    const outrasDeducoesValidas = isNaN(outrasDeducoes) ? 0 : outrasDeducoes;

    // Cálculo do salário líquido
    const salarioLiquido = salarioBruto - descontoINSS - descontoIRPF - descontoValeTransporte - outrasDeducoesValidas;

    // Exibe os resultados
    document.getElementById('resultado').style.display = 'block';
    document.getElementById('salarioBruto').textContent = salarioBruto.toFixed(2);
    document.getElementById('descontoINSS').textContent = descontoINSS.toFixed(2);
    document.getElementById('descontoIRPF').textContent = descontoIRPF.toFixed(2);
    document.getElementById('descontoValeTransporte').textContent = descontoValeTransporte.toFixed(2);
    document.getElementById('outrasDeducoesResultado').textContent = outrasDeducoesValidas.toFixed(2);
    document.getElementById('salarioLiquido').textContent = salarioLiquido.toFixed(2);
}
