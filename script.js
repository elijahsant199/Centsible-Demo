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
  updateChart([gross - taxes, taxes], ['Net Income', 'Removed For Taxes']);
}

let chart;
function updateChart(data, labels) {
  const ctx = document.getElementById('pieChart').getContext('2d');
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: ['#66bb6a', '#ef5350']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });
}