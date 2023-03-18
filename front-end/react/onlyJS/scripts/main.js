function entrar() {
  let area = document.getElementById('area');
  let name = prompt("Qual é o seu nome?");
  
  if (name === null || name === "") {
    alert("Digite seu nome novamente!");
    area.innerHTML = "Olá, seja bem vindo ...!";
  } else {
    area.innerHTML = "Olá, seja bem vindo " + name + "!";
  }
}