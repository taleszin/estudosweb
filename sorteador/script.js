
function sorteio(){
    var sorteio = document.querySelector("#num").value
    var aleatorio = Math.random()
    var print = document.querySelector("#print")
    aleatorio = aleatorio * sorteio
    if (sorteio == ""){ 
        alert('Insira um número !')
        Location.reload()
    }
    else
    print.innerHTML = `O número sorteado é <strong>${aleatorio.toFixed(0)}</strong>`
}