// Quantidade: botões + e -
document.addEventListener('DOMContentLoaded', function () {
  const minusBtn = document.querySelector('.quantity-btn.minus');
  const plusBtn = document.querySelector('.quantity-btn.plus');
  const input = document.querySelector('.quantity-input');

  if (minusBtn && plusBtn && input) {
    // Botão de diminuir
    minusBtn.addEventListener('click', function () {
      let value = parseInt(input.value, 10) || 1;
      value = Math.max(1, value - 1);
      input.value = value;
    });

    // Botão de aumentar
    plusBtn.addEventListener('click', function () {
      let value = parseInt(input.value, 10) || 1;
      const max = parseInt(input.max, 10) || 99;
      value = Math.min(max, value + 1);
      input.value = value;
    });

    // Impede digitar valor fora do min/max
    input.addEventListener('input', function () {
      let value = parseInt(input.value, 10) || 1;
      const max = parseInt(input.max, 10) || 99;
      if (value < 1) value = 1;
      if (value > max) value = max;
      input.value = value;
    });
  }
});