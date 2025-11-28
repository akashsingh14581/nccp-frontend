<template>
  <div>
    <h3>Line Chart</h3>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

export default {
  extends: Line,
  props: ['chartData'],
  mounted() {
    this.renderChart(this.chartData, { responsive: true, maintainAspectRatio: false });
  },
};
</script>
