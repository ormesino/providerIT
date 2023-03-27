let db = openDatabase('db', '1.0', 'Banco de Dados Teste', 2 * 1024 * 1024);

function getCEP() {
  let cep = document.querySelector('#cep').value;
  let url = `https://viacep.com.br/ws/${cep}/json/`;

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

function formatCPF() {
  let cpf = document.querySelector('#cpf').value;
  let cpfFormat = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  document.querySelector('#cpf').value = cpfFormat;
}

function cleanForm() {
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