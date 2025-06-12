let chartMode = 'percent';
let chart;
let totalSavings = 0;
const goals = [];

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
  updateChart([net, taxes], ['Net Income', 'Removed For Taxes'], gross);
}

function updateChart(data, labels, grossTotal) {
  const ctx = document.getElementById('pieChart').getContext('2d');
  if (chart) chart.destroy();

  let displayData = [...data];
  if (chartMode === 'percent') {
    displayData = data.map(x => ((x / grossTotal) * 100).toFixed(1));
  }

  chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: displayData,
        backgroundColor: ['#4caf50', '#e57373']
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

function toggleChartMode() {
  chartMode = (chartMode === 'percent') ? 'dollar' : 'percent';
  calculateEarnings();
}

function addSaveGoal() {
  const name = document.getElementById('goalName').value.trim();
  const amount = parseFloat(document.getElementById('goalAmount').value);
  if (name && !isNaN(amount) && amount > 0) {
    goals.push({ name, amount });
    totalSavings += amount;
    document.getElementById('goalName').value = '';
    document.getElementById('goalAmount').value = '';
    updateGoals();
  }
}

function updateGoals() {
  const list = document.getElementById('goalList');
  list.innerHTML = '';
  goals.forEach(g => {
    const li = document.createElement('li');
    li.textContent = `${g.name}: $${g.amount.toFixed(2)}`;
    list.appendChild(li);
  });
  document.getElementById('savingsSummary').textContent = `Current Savings: $${totalSavings.toFixed(2)}`;
}