function iniciarSistema() {
    const senhaCorreta = 2678;
    const nomeHotel = "Hotel Kars";

    alert(`Bem vindo ao ${nomeHotel}.`);
    let nomeUsuario = prompt("Por favor, informe o seu nome:");
    let senha = parseInt(prompt("Digite a senha para acessar o sistema:"));

    if (senha === senhaCorreta) {
        alert(`Bem vindo ao ${nomeHotel}, ${nomeUsuario}. É um imenso prazer ter você por aqui!`);
        inicio(nomeUsuario, nomeHotel);
    } else {
        alert("Senha incorreta. Acesso negado.");
    }
}

function inicio(nomeUsuario, nomeHotel) {
    let opcao;

    do {
        opcao = parseInt(prompt("Menu Principal:\n1 - Reservar quarto\n2 - Cadastro de Hospedes\n3 - Cadastrar eventos\n4 - Sistema Abastecimento\n5 - Orcamento Manutencao\n6 - Sair do sistema\nDigite o número da opção desejada:"));

        switch (opcao) {
            case 1:
                reservarQuarto(nomeUsuario, nomeHotel);
                break;
            case 2:
                cadastroDeHospedes(nomeUsuario, nomeHotel);
                break;
            case 3:
                evento();
            case 4:    
                iniciarSistemaAbastecimento();
            case 5:
                iniciarOrcamentoManutencao();
            case 6:
                alert(`Muito obrigado e até logo, ${nomeUsuario}.`);
                break;
            default:
                erro();
        }
    } while (opcao !== 2);
}

function cadastroDeHospedes(nomeUsuario, nomeHotel) {
    let hospedes = [];
    const maxHospedes = 15;
    let opcao;

    do {
        opcao = parseInt(prompt("Menu Cadastro de Hóspedes:\n1 - Cadastrar Hóspede\n2 - Pesquisar Hóspede\n3 - Listar Hóspedes\n4 - Voltar ao Menu Principal"));

        switch (opcao) {
            case 1:
                if (hospedes.length < maxHospedes) {
                    let nomeHospede = prompt("Informe o nome do hóspede:");
                    hospedes.push(nomeHospede);
                    alert(`Hóspede ${nomeHospede} cadastrado com sucesso!`);
                } else {
                    alert("Máximo de cadastros atingido.");
                }
                break;

            case 2:
                let nomePesquisa = prompt("Informe o nome do hóspede a ser pesquisado:");
                if (hospedes.includes(nomePesquisa)) {
                    alert(`Hóspede ${nomePesquisa} foi encontrado.`);
                } else {
                    alert("Hóspede não encontrado.");
                }
                break;

            case 3:
                if (hospedes.length === 0) {
                    alert("Nenhum hóspede cadastrado.");
                } else {
                    let listaHospedes = "Lista de Hóspedes:\n";
                    for (let i = 0; i < hospedes.length; i++) {
                        listaHospedes += `${i + 1}. ${hospedes[i]}\n`;
                    }
                    alert(listaHospedes);
                }
                break;

            case 4:
                inicio(nomeUsuario, nomeHotel);
                break;

            default:
                alert("Opção inválida.");
        }
    } while (opcao !== 4);
}

function reservarQuarto(nomeUsuario, nomeHotel) {
    let quartosDisponiveis = new Array(20).fill(false); // Inicializa 20 quartos como desocupados
    let valorDiaria, diasHospedagem;

    do {
        valorDiaria = parseFloat(prompt("Informe o valor da diária:"));
        diasHospedagem = parseInt(prompt("Informe a quantidade de dias de hospedagem:"));

        if (valorDiaria <= 0 || diasHospedagem <= 0 || diasHospedagem > 30) {
            alert("Valor Inválido. Por favor, insira os dados novamente.");
        }
    } while (valorDiaria <= 0 || diasHospedagem <= 0 || diasHospedagem > 30);

    let gratuidade = 0;
    let meiaHospedagem = 0;
    let totalPagar = 0;

    while (true) {
        let nomeHospede = prompt("Informe o nome do hóspede (ou 'PARE' para encerrar):");
        if (nomeHospede.toUpperCase() === "PARE") break;

        let idadeHospede = parseInt(prompt(`Informe a idade de ${nomeHospede}:`));

        if (idadeHospede < 6) {
            alert(`${nomeHospede} possui gratuidade`);
            gratuidade++;
        } else if (idadeHospede > 60) {
            alert(`${nomeHospede} paga meia`);
            meiaHospedagem++;
            totalPagar += (valorDiaria / 2) * diasHospedagem;
        } else {
            totalPagar += valorDiaria * diasHospedagem;
        }

        let numeroQuarto;
        do {
            numeroQuarto = parseInt(prompt("Informe o número do quarto (1 a 20):"));
            if (numeroQuarto < 1 || numeroQuarto > 20) {
                alert("Número de quarto inválido.");
            } else if (quartosDisponiveis[numeroQuarto - 1]) {
                alert("Quarto já está ocupado.");
            }
        } while (numeroQuarto < 1 || numeroQuarto > 20 || quartosDisponiveis[numeroQuarto - 1]);

        quartosDisponiveis[numeroQuarto - 1] = true; // Marca o quarto como ocupado

        let confirmar = prompt("Deseja confirmar a reserva? (Sim/Não):").toUpperCase();
        if (confirmar !== "SIM") {
            alert("Reserva cancelada. Retornando ao menu inicial.");
            return;
        }
    }

    alert(`Quantidade de gratuidades: ${gratuidade}`);
    alert(`Quantidade de meias hospedagens: ${meiaHospedagem}`);
    alert(`Valor total a pagar: R$ ${totalPagar.toFixed(2)}`);
}

function evento() {
    alert("Bem vindo ao Sistema de Reservas de Eventos do Hotel!");

    // Parte 1: Quantidade de Convidados
    let numeroConvidados = verificarNumeroConvidados();
    let auditório = verificarAuditório(numeroConvidados);
    alert("Agora vamos ver a agenda do evento.");

    // Parte 2: Agenda do evento
    let diaSemana = verificarDisponibilidade();
    let nomeEmpresa = prompt("Qual o nome da empresa que fará o evento?");
    alert(`Auditório reservado para ${nomeEmpresa}. ${diaSemana.dia} às ${diaSemana.hora}hs.`);

    // Parte 3: Garçons
    let horasEvento = parseInt(prompt("Qual a duração do evento em horas?"));
    let garcons = calcularGarcons(numeroConvidados, horasEvento);
    alert(`São necessários ${garcons} garçons.`);
    let custoGarcons = garcons * horasEvento * 10.50;
    alert(`Custo: R$ ${custoGarcons.toFixed(2)}`);
    alert("Agora vamos calcular o buffet do hotel para o evento.");

    // Parte 4: Buffet
    calcularBuffet(numeroConvidados);

    // Parte 5: Conferência de custos e reserva
    let custoBuffet = calcularBuffet(numeroConvidados);
    let custoTotal = custoGarcons + custoBuffet;

    exibirRelatorio(nomeEmpresa, diaSemana, numeroConvidados, horasEvento, garcons, custoGarcons, custoBuffet, custoTotal);
}

function verificarNumeroConvidados() {
    let numeroConvidados;
    do {
        numeroConvidados = parseInt(prompt("Qual o número de convidados para o seu evento?"));
        if (numeroConvidados <= 0 || numeroConvidados > 350) {
            alert("Número de convidados inválido.");
        }
    } while (numeroConvidados <= 0 || numeroConvidados > 350);

    return numeroConvidados;
}

function verificarAuditório(numeroConvidados) {
    let auditórioLaranja = 150;
    let cadeirasAdicionais = 70;

    if (numeroConvidados <= auditórioLaranja) {
        let cadeirasNecessarias = numeroConvidados - auditórioLaranja;
        cadeirasNecessarias = cadeirasNecessarias > 0 ? cadeirasNecessarias : 0;

        alert(`Use o auditório Laranja (inclua mais ${cadeirasNecessarias} cadeiras)`);
        return "Auditório Laranja";
    } else {
        alert("Use o auditório Colorado.");
        return "Auditório Colorado";
    }
}

function verificarDisponibilidade() {
    let diaSemana;
    let hora;

    do {
        diaSemana = prompt("Qual o dia do evento? (segunda, terça, quarta, quinta, sexta, sábado, domingo)").toLowerCase();
    } while (!["segunda", "terça", "quarta", "quinta", "sexta", "sábado", "domingo"].includes(diaSemana));

    do {
        hora = parseInt(prompt("Qual é a hora do evento? (somente a hora inteira)"));
        if (hora < 0 || hora > 23) {
            alert("Horário inválido.");
        }
    } while (hora < 0 || hora > 23);

    if (["sábado", "domingo"].includes(diaSemana)) {
        if (hora < 7 || hora > 15) {
            alert("Auditório não disponível nesse horário no fim de semana.");
            return verificarDisponibilidade();
        }
    } else {
        if (hora < 7 || hora > 23) {
            alert("Auditório não disponível nesse horário nos dias de semana.");
            return verificarDisponibilidade();
        }
    }

    return { dia: diaSemana, hora: hora };
}

function calcularGarcons(numeroConvidados, horasEvento) {
    let garconsNecessarios = Math.ceil(numeroConvidados / 12);
    garconsNecessarios += Math.floor(horasEvento / 2); // Um garçom adicional a cada 2 horas de evento
    return garconsNecessarios;
}

function calcularBuffet(numeroConvidados) {
    let litrosCafe = numeroConvidados * 0.2;
    let litrosAgua = numeroConvidados * 0.5;
    let totalSalgados = numeroConvidados * 7;

    alert(`O evento precisará de ${litrosCafe.toFixed(1)} litros de café, ${litrosAgua.toFixed(1)} litros de água, e ${totalSalgados} salgados.`);

    let custoCafe = litrosCafe * 0.80;
    let custoAgua = litrosAgua * 0.40;
    let custoSalgados = Math.ceil(totalSalgados / 100) * 34; // Custo do cento de salgados

    let custoTotalBuffet = custoCafe + custoAgua + custoSalgados;
    alert(`Custo total com buffet: R$ ${custoTotalBuffet.toFixed(2)}`);
    return custoTotalBuffet;
}

function exibirRelatorio(nomeEmpresa, diaSemana, numeroConvidados, horasEvento, garcons, custoGarcons, custoBuffet, custoTotal) {
    alert(`Relatório do Evento:
    Auditório reservado: ${nomeEmpresa}
    Dia: ${diaSemana.dia}, às ${diaSemana.hora}hs
    Convidados: ${numeroConvidados}
    Duração: ${horasEvento} horas
    Garçons: ${garcons}
    Custo com garçons: R$ ${custoGarcons.toFixed(2)}
    Custo com buffet: R$ ${custoBuffet.toFixed(2)}
    Custo total do evento: R$ ${custoTotal.toFixed(2)}
    `);

    let aceitaValores = prompt("Gostaria de efetuar a reserva? S/N").toLowerCase();

    if (aceitaValores === "s") {
        alert("Reserva efetuada com sucesso.");
    } else {
        alert("Reserva cancelada.");
    }
}

function iniciarSistemaAbastecimento() {
    alert("Bem-vindo ao sistema de verificação de abastecimento do Hotel!");

    // Recebendo os valores dos combustíveis para os dois postos
    let precoAlcoolWayne = parseFloat(prompt("Informe o preço do Álcool no Wayne Oil:"));
    let precoGasolinaWayne = parseFloat(prompt("Informe o preço da Gasolina no Wayne Oil:"));
    let precoAlcoolStark = parseFloat(prompt("Informe o preço do Álcool no Stark Petrol:"));
    let precoGasolinaStark = parseFloat(prompt("Informe o preço da Gasolina no Stark Petrol:"));

    // Validando as entradas
    if (isNaN(precoAlcoolWayne) || isNaN(precoGasolinaWayne) || isNaN(precoAlcoolStark) || isNaN(precoGasolinaStark)) {
        alert("Por favor, insira valores numéricos válidos.");
        return;
    }

    // Quantidade fixa de litros para abastecimento
    let litros = 42;

    // Cálculo de qual combustível é mais vantajoso (regra dos 30%)
    let vantagemWayne = verificarVantagem(precoAlcoolWayne, precoGasolinaWayne);
    let vantagemStark = verificarVantagem(precoAlcoolStark, precoGasolinaStark);

    // Cálculo dos custos em cada posto
    let custoWayne = calcularCusto(vantagemWayne, precoAlcoolWayne, precoGasolinaWayne, litros);
    let custoStark = calcularCusto(vantagemStark, precoAlcoolStark, precoGasolinaStark, litros);

    // Exibindo o relatório com o posto mais barato e a melhor opção de combustível
    exibirRelatorio(vantagemWayne, vantagemStark, custoWayne, custoStark);
}

function verificarVantagem(precoAlcool, precoGasolina) {
    let alcool30MaisBarato = precoGasolina * 0.7;
    if (precoAlcool <= alcool30MaisBarato) {
        return "álcool";
    } else {
        return "gasolina";
    }
}

function calcularCusto(combustivel, precoAlcool, precoGasolina, litros) {
    if (combustivel === "álcool") {
        return precoAlcool * litros;
    } else {
        return precoGasolina * litros;
    }
}

function exibirRelatorio(vantagemWayne, vantagemStark, custoWayne, custoStark) {
    let postoMaisBarato;
    let combustivelMaisBarato;

    if (custoWayne < custoStark) {
        postoMaisBarato = "Wayne Oil";
        combustivelMaisBarato = vantagemWayne;
        alert(`O posto mais barato é o Wayne Oil. Abasteça com ${combustivelMaisBarato}. Custo total: R$ ${custoWayne.toFixed(2)}`);
    } else if (custoStark < custoWayne) {
        postoMaisBarato = "Stark Petrol";
        combustivelMaisBarato = vantagemStark;
        alert(`O posto mais barato é o Stark Petrol. Abasteça com ${combustivelMaisBarato}. Custo total: R$ ${custoStark.toFixed(2)}`);
    } else {
        alert(`Os dois postos têm o mesmo custo. Escolha qualquer um.`);
    }
}

function iniciarOrcamentoManutencao() {
    let continuar = true;
    let menorValor = Infinity;
    let empresaMenorValor = "";

    while (continuar) {

        let nomeEmpresa = prompt("Informe o nome da empresa:");
        let valorPorAparelho = parseFloat(prompt("Informe o valor do serviço por aparelho:"));
        let quantidadeAparelhos = parseInt(prompt("Informe a quantidade de aparelhos em manutenção:"));
        let percentualDesconto = parseFloat(prompt("Informe o percentual de desconto (caso não tenha, informe 0):"));
        let quantidadeMinimaParaDesconto = parseInt(prompt("Informe a quantidade mínima de aparelhos para que o desconto seja aplicado:"));

        if (isNaN(valorPorAparelho) || isNaN(quantidadeAparelhos) || isNaN(percentualDesconto) || isNaN(quantidadeMinimaParaDesconto)) {
            alert("Por favor, insira valores numéricos válidos.");
            continue;
        }

        let valorTotal = valorPorAparelho * quantidadeAparelhos;

        // Aplicação do desconto caso a quantidade de aparelhos seja maior que a mínima informada
        if (quantidadeAparelhos >= quantidadeMinimaParaDesconto) {
            let desconto = (percentualDesconto / 100) * valorTotal;
            valorTotal -= desconto;
        }

        // Mostrando o total calculado para a empresa
        alert(`O serviço de ${nomeEmpresa} custará R$ ${valorTotal.toFixed(2)}`);

        // Comparar para identificar o menor valor
        if (valorTotal < menorValor) {
            menorValor = valorTotal;
            empresaMenorValor = nomeEmpresa;
        }

        // Perguntar ao usuário se deseja informar mais empresas
        let resposta = prompt("Deseja informar novos dados? (S/N)").toUpperCase();
        if (resposta === 'N') {
            continuar = false;
        }
    }

    // Exibindo o orçamento de menor valor
    alert(`O orçamento de menor valor é o de ${empresaMenorValor} por R$ ${menorValor.toFixed(2)}`);
}



function erro() {
    alert("Opção inválida. Por favor, escolha uma opção válida do menu.");
}

iniciarSistema();
