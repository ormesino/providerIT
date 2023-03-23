function limparForm() {
  let inputs = document.querySelectorAll("input");

  inputs.forEach((input) => input.type === 'radio' ? input.checked = false : input.value = '');
  document.querySelector('select').value = "";
}

function enviarDados() {
  let inputs = document.querySelectorAll("input");
  let dados = [];

  inputs.forEach((input) => {
    if (input.type === 'radio') {
      if (input.checked) {
        dados.push(input.value);
      }
    } else {
      dados.push(input.value);
    }
  });

  dados.push(document.querySelector('select').value);

  db.transaction(function (tx) {
    tx.executeSql('INSERT INTO dados (nome, email, cpf, endereco, cidade, estado, casa, resumo, cargo, descricao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', dados, function (tx, results) {
      console.log('Dados inseridos com sucesso!');
    }, function (tx, error) {
      console.log('Erro ao inserir dados: ' + error.message);
    });
  });
}