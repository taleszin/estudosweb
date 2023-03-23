let poll = {
    pergunta: "Qual o seu professor favorito?",
    resposta: [
        "Ana Luiza", "Negreiros", "PH", "Rafael", "Thelmo"
    ],
    pollCount: 0,
    respostaWeight: [0, 0, 0, 0, 0],
    respostaPercent: [0, 0, 0, 0, 0],
    respostaSelecionada: -1
};

let pollDOM = {
    pergunta: document.querySelector(".poll .pergunta"),
    resposta: document.querySelector(".poll .respostas")
};

pollDOM.pergunta.innerText = poll.pergunta;

// Criando e adicionando cada opção de resposta da enquete na página HTML
pollDOM.resposta.innerHTML = poll.resposta.map(function(resposta, i){
    return(
        `
        <div class="resposta" onclick="markResposta(${i})">
            <div class="nome-professor">${resposta}</div>
            <div class="votos">
                <div class="barra"></div>
                <div class="porcentagem"></div>
            </div>
        </div>
        `
    );
}).join("");

// Função que marca a resposta selecionada pelo usuário e atualiza a contagem de votos
function markResposta(index) {
  poll.respostaSelecionada = index;
  poll.respostaWeight[index] += 1;
  poll.pollCount += 1;
   // Atualiza o elemento span com o total de votos
   document.getElementById("total-votes").textContent = poll.pollCount;
  // Chamando as funções para atualizar a tela com a nova porcentagem e o número total de votos
  porcentagemTela();
  totalVotosTela();
  
  let respostas = document.getElementsByClassName("resposta");
  for (let i = 0; i < respostas.length; i++) {
    if (i == index) {
    }
    if (poll.pollCount != 0) {
      let totalRespostaWeight = poll.respostaWeight.reduce((a, b) => a + b);
      let percentage = Math.round((poll.respostaWeight[i] / totalRespostaWeight) * 100);
      respostas[i].style.width = percentage + "%";
      respostas[i].querySelector('.porcentagem').textContent = percentage + "%";
    } else {
      respostas[i].style.width = "0%";
      respostas[i].querySelector('.porcentagem').textContent = "0%";
    }
  }
}

// Função que atualiza a porcentagem de votos em cada opção de resposta na página HTML
function porcentagemTela() {
  const totalVotos = poll.pollCount;
  const respostas = document.querySelectorAll(".resposta");

  respostas.forEach((resposta, index) => {
    const percentage = ((poll.respostaWeight[index] / totalVotos) * 100).toFixed(1);
    const percentageValue = resposta.querySelector(".porcentagem");
    percentageValue.textContent = `${percentage}%`;
  });
}

// Função que exibe o número total de votos na página HTML
function totalVotosTela() {
  const totalVotos = poll.pollCount;
  const totalVotosValue = document.querySelector(".total-votos");
  totalVotosValue.textContent = `Total de votos: ${totalVotos}`;
}
