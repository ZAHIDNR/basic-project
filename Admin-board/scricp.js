// Line Chart
const lineCtx = document.getElementById('myChart').getContext('2d');
new Chart(lineCtx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: '',
      data: [10, 25, 10, 30, 10, 30],
      fill: false,
      borderColor: '#d946ef',
      borderWidth: 3,
      tension: 0.5,
      pointRadius: 0,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#aaa' }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#aaa' }
      }
    }
  }
});

// Bar Chart
const barCtx = document.getElementById('barChart').getContext('2d');
new Chart(barCtx, {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Jun'],
    datasets: [{
      label: '',
      data: [54000, 70000, 50000, 75000, 65000],
      backgroundColor: 'rgba(108, 99, 255, 0.7)',
      borderRadius: 4,
      barThickness: 40,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#ccc' }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: {
          color: '#ccc',
          callback: function(value) {
            return value / 1000 + 'K';
          }
        },
        beginAtZero: true
      }
    }
  }
});
