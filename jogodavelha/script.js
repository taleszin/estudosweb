// Definindo variáveis globais
let jogadorAtual = "X";
let jogoAcabou = false;
let tabuleiro = ["", "", "", "", "", "", "", "", ""];

// Selecionando os elementos da tabela
const celulas = document.querySelectorAll("td");
const modoDeJogo = prompt("Escolha o modo de jogo: Digite 1 para jogar contra outra pessoa ou 2 para jogar contra a máquina");

if (modoDeJogo === "1") {
  // Modo de jogo para jogar contra outra pessoa
  alert("Você escolheu jogar contra outra pessoa. Faça sua jogada!");
} else if (modoDeJogo === "2") {
  // Modo de jogo para jogar contra a máquina
  alert("Você escolheu jogar contra a máquina. Boa sorte!");
  jogadaMaquina();
} else {
  // Modo de jogo inválido
  alert("Opção inválida. Por favor, escolha 1 ou 2.");
}

// Adicionando um evento de clique em cada célula
celulas.forEach((celula, index) => celula.addEventListener("click", () => clicar(index)));

// Função chamada quando uma célula é clicada
function clicar(index) {
  if (jogoAcabou || tabuleiro[index] !== "") {
    return;
  }

  celulas[index].innerHTML = jogadorAtual;
  tabuleiro[index] = jogadorAtual;

  if (verificarVitoria()) {
    setTimeout(() => {
      alert(`Jogador ${jogadorAtual === "X" ? "O" : "X"} venceu!`);
      jogoAcabou = true;
      exibirConfirm();
    }, 100);
  } else if (verificarEmpate()) {
    setTimeout(() => {
      alert("Deu empate!");
      jogoAcabou = true;
      exibirConfirm();
    }, 100);
  }

  jogadorAtual = jogadorAtual === "X" ? "O" : "X";
  
  if (modoDeJogo === "2" && !jogoAcabou) {
    // Se o modo de jogo é contra a máquina, chama jogadaMaquina() após a jogada do jogador humano
    jogadaMaquina();
  }
}

// Função para fazer a jogada da máquina
function jogadaMaquina() {
  // Chamada da função minimax
  const jogada = minimax(tabuleiro, "O").indice;
  celulas[jogada].innerHTML = "O";
  tabuleiro[jogada] = "O";

  jogoAcabou = verificarVitoria() || verificarEmpate();

  if (verificarVitoria()) {
    setTimeout(() => {
      alert(`Jogador ${jogadorAtual} venceu!`);
      exibirConfirm();
    }, 100);
  } else if (verificarEmpate()) {
    setTimeout(() => {
      alert("Deu empate!");
      exibirConfirm();
    }, 100);
  }

  jogadorAtual = "X";
}

// Função de avaliação do estado do jogo
function avaliarEstado(tabuleiro, jogador) {
  // Definir valor de cada posição do tabuleiro para o jogador atual
  const valores = {
    X: -1,
    O: 1,
    "": 0
  };

  let valor = 0;

  // Verificar cada combinação vencedora e atualizar o valor de acordo com o estado do tabuleiro
  for (let i = 0; i < combinacoesVitoria.length; i++) {
    const [a, b, c] = combinacoesVitoria[i];
    const soma = valores[tabuleiro[a]] + valores[tabuleiro[b]] + valores[tabuleiro[c]];
    if (soma === 3) {
      valor += 10;
    } else if (soma === -3) {
      valor -= 10;
    }
  }

  return valor;
}

// Função para verificar se há um vencedor
function verificarVitoria() {
  const combinacoesVitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < combinacoesVitoria.length; i++) {
    const [a, b, c] = combinacoesVitoria[i];
    if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
      return true;
    }
  }

  return false;
}




// Função para verificar se há um vencedor
function verificarVitoria() {
  const combinacoesVitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < combinacoesVitoria.length; i++) {
    const [a, b, c] = combinacoesVitoria[i];
    if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
      return true;
    }
  }

  return false;
}

// Função para verificar se houve empate
function verificarEmpate() {
  return tabuleiro.every(celula => celula !== "");
}

// Função para exibir o confirm
function exibirConfirm() {
  const jogarNovamente = confirm("Deseja jogar novamente?");
  if (jogarNovamente) {
    location.reload();
  } else {
    alert("OK");
  }
}

// Centralizando tabela
const section = document.querySelector("section");
const tableWrapper = document.querySelector(".table-wrapper");
tableWrapper.style.marginTop = `${(section.offsetHeight - tableWrapper.offsetHeight) / 2}px`;

//função que o chatgpt deu pra ser a inteligência da máquina
function minimax(novoTabuleiro, jogador) {
  // Verificar se o estado atual é um estado final (ou seja, se alguém ganhou ou se deu empate)
  if (verificarVitoria(novoTabuleiro, "X")) {
    return { valor: -10 };
  } else if (verificarVitoria(novoTabuleiro, "O")) {
    return { valor: 10 };
  } else if (verificarEmpate(novoTabuleiro)) {
    return { valor: 0 };
  }

  // Criar um array para armazenar os valores de cada jogada
  const jogadas = [];

  // Para cada posição vazia no tabuleiro, criar um objeto com o índice e o valor
  for (let i = 0; i < novoTabuleiro.length; i++) {
    if (novoTabuleiro[i] === "") {
      const jogada = {};
      jogada.indice = i;
      novoTabuleiro[i] = jogador;
       // Chamar recursivamente a função minimax com o tabuleiro atualizado e o jogador trocado
  if (jogador === "O") {
    const resultado = minimax(novoTabuleiro, "X");
    jogada.valor = resultado.valor;
  } else {
    const resultado = minimax(novoTabuleiro, "O");
    jogada.valor = resultado.valor;
  }

  // Desfazer a jogada para que o próximo loop possa usar o tabuleiro original
  novoTabuleiro[i] = "";

  // Adicionar a jogada ao array de jogadas
  jogadas.push(jogada);
}
}

// Escolher a jogada com o maior valor se o jogador for "O", ou a jogada com o menor valor se o jogador for "X"
let melhorJogada;
if (jogador === "O") {
let melhorValor = -Infinity;
for (let i = 0; i < jogadas.length; i++) {
if (jogadas[i].valor > melhorValor) {
melhorValor = jogadas[i].valor;
melhorJogada = i;
}
}
} else {
let melhorValor = Infinity;
for (let i = 0; i < jogadas.length; i++) {
if (jogadas[i].valor < melhorValor) {
melhorValor = jogadas[i].valor;
melhorJogada = i;
}
}
}

// Retornar a jogada escolhida com seu índice e valor
return jogadas[melhorJogada];
}