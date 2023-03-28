//  Iniciando o banco de dados e criando a tabela
const db = window.openDatabase('db', '1.0', 'Test DB', 2 * 1024 * 1024);

db.transaction(tx => {
  tx.executeSql('CREATE TABLE IF NOT EXISTS REGISTROS (nome, nascimento, genero, situacao, cpf, rg, cep, rua, num, compl, bairro, cidade, estado)')
}, e => {
  console.log(e);
});

//  Função para carregar os dados do banco de dados na tabela
(function loadData() {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM REGISTROS', [], (tx, results) => {
      let registros = results.rows.length;
      let tabela = document.querySelector('.dataTable tbody');

      //  Esconder a tabela caso não haja registros
      if (registros === 0) {
        document.querySelector('.tableContainer').style.visibility = 'hidden';
      } else {
        document.querySelector('.tableContainer').style.visibility = 'visible';
      }

      //  Preencher a tabela com os dados do banco de dados
      for (let i = 0; i < registros; i++) {
        tabela.innerHTML += `
          <tr>
            <td>${results.rows.item(i).nome}</td>
            <td>${results.rows.item(i).rg}</td>
            <td>${results.rows.item(i).cpf}</td>
            <td>${results.rows.item(i).cep}</td>
            <td>${results.rows.item(i).rua}</td>
            <td>${results.rows.item(i).num}</td>
            <td>${results.rows.item(i).compl}</td>
            <td>${results.rows.item(i).bairro}</td>
            <td>${results.rows.item(i).cidade}</td>
            <td>${results.rows.item(i).estado}</td>
            <td>${results.rows.item(i).genero}</td>
            <td>${results.rows.item(i).nascimento}</td>
            <td>${results.rows.item(i).situacao}</td>
          </tr>
        `
      }
    })
  }, e => {
    console.log(e);
  });
})();

//  Função para pegar o CEP e preencher os campos de endereço
function getCEP() {
  let cep = document.querySelector('#cep').value;
  let url = `https://viacep.com.br/ws/${cep}/json/`;

  //  Chamada da API e inserção dos dados recebidos nos campos do formulário
  if (cep.length !== 0) {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.logradouro === undefined || cep.length !== 8) {
          throw new Error;
        }
        document.querySelector('#rua').value = data.logradouro;
        document.querySelector('#bairro').value = data.bairro;
        document.querySelector('#cidade').value = data.localidade;
        document.querySelector('#estado').value = data.uf;
      })
      .catch(() => {
        alert('CEP não encontrado.');
        document.querySelector('#cep').value = "";
        document.querySelector('#rua').value = "";
        document.querySelector('#bairro').value = "";
        document.querySelector('#cidade').value = "";
        document.querySelector('#estado').value = "";
      });
  }
}

//  Função para validar o CPF
function validateCPF() {
  let cpf = document.querySelector('#cpf').value;
  let soma = 0;
  let resto;

  if (cpf.length === 11 && cpf != "00000000000") {
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf[i]) * (10 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    if (resto != parseInt(cpf[9])) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf[i]) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    if (resto != parseInt(cpf[10])) return false;

    return true;
  } else {
    return false;
  }
}

//  Função para formatar o CPF
function formatCPF() {
  let cpf = document.querySelector('#cpf').value;
  if (validateCPF()) {
    let cpfFormat = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    document.querySelector('#cpf').value = cpfFormat;
  } else {
    document.querySelector('#cpf').value = '';
    alert('Digite um CPF válido!');
  }
}

//  Função para limpar os campos do formulário
function clearForm() {
  let inputs = document.querySelectorAll("input");

  inputs.forEach((input) => {
    if (input.type === 'radio') {
      input.checked = false;
    } else {
      input.value = '';
      input.type = 'text';
    }
  });
  document.querySelector('select').value = "";
}

//  Função para salvar os dados no banco de dados
function saveData() {
  let nome = document.getElementById('nome').value;
  let nascimento = document.getElementById('nascimento').value;
  let genero = document.getElementById('genero').value;

  let situacao = document.getElementsByName('situacao');
  for (let radio of situacao) {
    if (radio.checked) {
      situacao = radio.value;
    }
  }

  let cpf = document.getElementById('cpf').value;
  let rg = document.getElementById('rg').value;
  let cep = document.getElementById('cep').value;
  let rua = document.getElementById('rua').value;
  let num = document.getElementById('num').value;
  let compl = document.getElementById('compl').value || '';
  let bairro = document.getElementById('bairro').value;
  let cidade = document.getElementById('cidade').value;
  let estado = document.getElementById('estado').value;

  db.transaction(tx => {
    tx.executeSql('INSERT INTO REGISTROS (nome, nascimento, genero, situacao, cpf, rg, cep, rua, num, compl, bairro, cidade, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [nome, nascimento, genero, situacao, cpf, rg, cep, rua, num, compl, bairro, cidade, estado])
  }, e => {
    console.log(e);
  });
}

//  Função para limpar o banco de dados
function clearDB() {
  db.transaction(tx => {
    tx.executeSql('DROP TABLE REGISTROS')
  }, e => {
    console.log(e);
  });
  window.location.reload();
}