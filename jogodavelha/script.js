// Definindo variáveis globais
let jogadorAtual = "X";
let jogoAcabou = false;
let tabuleiro = ["", "", "", "", "", "", "", "", ""];

// Selecionando os elementos da tabela
const celulas = document.querySelectorAll("td");

// Adicionando um evento de clique em cada célula
celulas.forEach(celula => celula.addEventListener("click", clicar));

// Função chamada quando uma célula é clicada
function clicar() {
    for (let i = 0; i < celulas.length; i++) {
        celulas[i].addEventListener("click", function() {
          alert(`vez do jogador ${jogadorAtual}`);
        });
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