//  Iniciando o banco de dados e criando a tabela
const db = window.openDatabase('db', '1.0', 'Test DB', 2 * 1024 * 1024);

db.transaction(tx => {
  tx.executeSql('CREATE TABLE IF NOT EXISTS REGISTROS (id INTEGER PRIMARY KEY, nome, nascimento, genero, situacao, cpf, rg, cep, rua, num, compl, bairro, cidade, estado)')
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
        let nascimento = results.rows.item(i).nascimento;
        tabela.innerHTML += `
          <tr>
            <td>${results.rows.item(i).id}</td>
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
            <td>${nascimento.slice(8, 10)}/${nascimento.slice(5, 7)}/${nascimento.slice(0, 4)}</td>
            <td>${results.rows.item(i).situacao}</td>
          </tr>
        `
      }
    })
  }, e => {
    console.log(e);
  });
})();

//  Função para permitir apenas letras no campo de nome completo
(function onlyLetters() {
  let input = document.querySelector('#nome');
  input.addEventListener('keypress', (e) => {
    let isString = isNaN(parseInt(e.key));
    if (isString) {
      return;
    } else {
      e.preventDefault();
    }
  });
})();

//  Função para obrigar o prenchimento de dois nomes no mínimo, exibindo uma mensagem caso o usuário tente enviar o formulário sem preencher o campo
function checkName() {
  let input = document.querySelector('#nome');
  if (input.value.length > 0) {
    let names = input.value.split(' ');
    if (names.length < 2 || names[0].length < 3 || names[1].length < 3) {
      alert('Por favor, preencha o campo "Nome Completo" com ao menos um nome e um sobrenome.');
      input.value = "";
      input.focus();
    }
  }
}

//  Função para permitir apenas números nos campos de CPF, RG, CEP e número
(function onlyNumbers() {
  let inputs = document.querySelectorAll('input');
  inputs.forEach((input) => {
    if (input.id === 'cpf' || input.id === 'rg' || input.id === 'cep' || input.id === 'num') {
      input.addEventListener('keypress', (e) => {
        if (isNaN(e.key) || e.key === ' ') {
          e.preventDefault();
        }
      })
    }
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
        document.querySelector('#cep').focus();
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
    document.querySelector('#cpf').focus();
  }
}

//  Função para definir limites para a data de nascimento
function formatDate() {
  let today = new Date();
  today.setDate(today.getDate() - 1);
  let formatedDate = today.toISOString().split('T')[0];
  document.querySelector('#nascimento').setAttribute('max', formatedDate);
  document.querySelector('#nascimento').setAttribute('min', '1910-01-01');
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

//  Função para deleter um registro do banco de dados
function deleteData() {
  let id = prompt('Digite o ID do registro que deseja excluir:');
  if (id !== null) {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM REGISTROS WHERE id = ?', [id], (tx, results) => {
        if (results.rows.length === 0) {
          alert('Registro não encontrado.');
          return;
        } else {
          let confirm = window.confirm('Tem certeza que deseja excluir este registro?');
          if (confirm) {
            db.transaction(tx => {
              tx.executeSql('DELETE FROM REGISTROS WHERE id = ?', [id])
            }, e => {
              console.log(e);
            });
            window.location.reload();
          }
        }
      })
    }, e => {
      console.log(e);
    });
  }
}

//  Função para limpar o banco de dados
function clearDB() {
  let confirm = window.confirm('Tem certeza que deseja limpar o banco de dados?');
  if (confirm) {
    db.transaction(tx => {
      tx.executeSql('DROP TABLE REGISTROS')
    }, e => {
      console.log(e);
    });
    window.location.reload();
  }
}