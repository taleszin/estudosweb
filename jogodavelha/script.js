// Definindo variáveis globais
let jogadorAtual = "X";
let jogoAcabou = false;
let tabuleiro = ["", "", "", "", "", "", "", "", ""];

// Selecionando os elementos da tabela
const celulas = document.querySelectorAll("td");

// Adicionando um evento de clique em cada célula
celulas.forEach((celula, index) => celula.addEventListener("click", () => clicar(index)));

// Função chamada quando uma célula é clicada
function clicar(index) {
  if (jogoAcabou || tabuleiro[index] !== "") {
    return;
  }

  celulas[index].innerHTML = jogadorAtual;
  tabuleiro[index] = jogadorAtual;

  jogadorAtual = jogadorAtual === "X" ? "O" : "X";

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
