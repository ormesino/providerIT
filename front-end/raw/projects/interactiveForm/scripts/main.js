let inputs = document.querySelectorAll("input");

function limparForm() {
  inputs.forEach((input) => input.type === 'radio' ? input.checked = false : input.value = '');
  document.querySelector('select').value = "";
}