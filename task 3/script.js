// Random stock data generation (for demonstration purposes)
function generateRandomData() {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        date: `2025-03-${i + 1}`,
        price: Math.random() * 100 + 50, // Random price between 50 and 150
      });
    }
    return data;
  }
  
  // Moving Average Calculation
  function calculateMovingAverage(data, period) {
    const movingAverages = [];
    for (let i = period - 1; i < data.length; i++) {
      const sum = data.slice(i - period + 1, i + 1).reduce((acc, val) => acc + val.price, 0);
      movingAverages.push({
        date: data[i].date,
        price: sum / period,
      });
    }
    return movingAverages;
  }
  
  // Strategy Implementation (Example: Buy when price crosses above MA)
  function applyStrategy(data, maData) {
    const strategyResults = [];
    for (let i = 1; i < maData.length; i++) {
      const currentPrice = data[i + (maData.length - data.length)];
      const previousPrice = data[i - 1 + (maData.length - data.length)];
      const previousMA = maData[i - 1];
      const currentMA = maData[i];
  
      if (currentPrice.price > currentMA.price && previousPrice.price <= previousMA.price) {
        strategyResults.push(`Buy Signal: ${data[i + (maData.length - data.length)].date}`);
      }
    }
    return strategyResults;
  }
  
  // Set up chart
  function createChart(data, maData) {
    const labels = data.map(item => item.date);
    const prices = data.map(item => item.price);
    const maPrices = maData.map(item => item.price);
  
    const ctx = document.getElementById('chart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Price',
            borderColor: 'blue',
            data: prices,
            fill: false,
          },
          {
            label: 'Moving Average',
            borderColor: 'red',
            data: maPrices,
            fill: false,
            borderDash: [5, 5],
          },
        ],
      },
    });
  }
  
  // Event listeners
  document.getElementById('apply-strategy').addEventListener('click', function() {
    const maPeriod = parseInt(document.getElementById('ma-period').value, 10);
    const data = generateRandomData();
    const maData = calculateMovingAverage(data, maPeriod);
    const strategyResults = applyStrategy(data, maData);
  
    // Display strategy results
    const strategyResultText = strategyResults.length > 0 ? strategyResults.join('<br>') : 'No signals found.';
    document.getElementById('strategy-result').innerHTML = strategyResultText;
  
    // Create or update chart
    createChart(data, maData);
  });
  