if (typeof localStorage.nome === "undefined") {
  document.getElementById('area').innerHTML = "Olá, seja bem vindo ...!";
} else {
  document.getElementById('area').innerHTML = "Olá, seja bem vindo " + localStorage.nome + "!";
  document.getElementById('btn').setAttribute('onclick', 'sair()');
  document.getElementById('btn').innerHTML = "Sair";
}

function entrar() {
  let area = document.getElementById('area');
  localStorage.setItem('nome', prompt("Qual é o seu nome?"));

  if (localStorage.nome === null || localStorage.nome === "") {
    alert("Digite seu nome novamente!");
    area.innerHTML = "Olá, seja bem vindo ...!";
  } else {
    area.innerHTML = "Olá, seja bem vindo " + localStorage.nome + "!";
    document.getElementById('btn').setAttribute('onclick', 'sair()');
    document.getElementById('btn').innerHTML = "Sair";
  }
}

function sair() {
  let option = prompt("Deseja realmente sair? (S/N)");

  if (option === "S") {
    localStorage.removeItem('nome');
    document.getElementById('area').innerHTML = "Olá, seja bem vindo ...!";
    document.getElementById('btn').setAttribute('onclick', 'entrar()');
    document.getElementById('btn').innerHTML = "Entrar";
  } else {
    alert("Você não saiu!");
  }
}