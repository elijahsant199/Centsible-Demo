function showTab(tabName) {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => tab.style.display = 'none');
  document.getElementById(tabName).style.display = 'block';
}

function calculateEarnings() {
  const rate = parseFloat(document.getElementById('rate').value) || 0;
  const hours = parseFloat(document.getElementById('hours').value) || 0;
  const bonus = parseFloat(document.getElementById('bonus').value) || 0;
  const gross = (rate * hours) + bonus;
  const taxes = gross * 0.1308;
  const net = gross - taxes;
  document.getElementById('earningsResult').innerText =
    `Gross: $${gross.toFixed(2)} | Taxes: $${taxes.toFixed(2)} | Net: $${net.toFixed(2)}`;
}