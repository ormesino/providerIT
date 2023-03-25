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