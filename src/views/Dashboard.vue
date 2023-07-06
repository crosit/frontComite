<template>
  <div>

    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
    <!-- <div class="d-flex justify-content-center">
                <img class="imagenTecmm2" src="img/brand/TSJZapopan_Logo.jpg">
              </div> -->
    </base-header>

    <!--Charts-->
    <b-container fluid class="mt--7">
      <div class="d-flex justify-content-center">
                <img class="imagenTecmm2" src="img/brand/TSJZapopan_Logo.jpg">
              </div>
    </b-container>

  </div>
</template>
<script>
  // Charts
  import * as chartConfigs from '@/components/Charts/config';
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';

  // Components
  import BaseProgress from '@/components/BaseProgress';
  import StatsCard from '@/components/Cards/StatsCard';

  // Tables
  import SocialTrafficTable from './Dashboard/SocialTrafficTable';
  import PageVisitsTable from './Dashboard/PageVisitsTable';
  import {mapState} from 'vuex';


  export default {
    components: {
      LineChart,
      BarChart,
      BaseProgress,
      StatsCard,
      PageVisitsTable,
      SocialTrafficTable
    },
    data() {
      return {
        bigLineChart: {
          allData: [
            [0, 20, 10, 30, 15, 40, 20, 60, 60],
            [0, 20, 5, 25, 10, 30, 15, 40, 40]
          ],
          activeIndex: 0,
          chartData: {
            datasets: [
              {
                label: 'Performance',
                data: [0, 20, 10, 30, 15, 40, 20, 60, 60],
              }
            ],
            labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          },
          extraOptions: chartConfigs.blueChartOptions,
        },
        bandera: 0,
        redBarChart: {
          chartData: {
            labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
              label: 'Sales',
              data: [25, 20, 30, 22, 17, 29]
            }]
          },
          extraOptions: chartConfigs.blueChartOptions
        }
      };
    },
    computed: {
    
    ...mapState([ 'user']),
  },
    methods: {
      initBigChart(index) {
        
        let chartData = {
          datasets: [
            {
              label: 'Performance',
              data: this.bigLineChart.allData[index]
            }
          ],
          labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        };
        this.bigLineChart.chartData = chartData;
        this.bigLineChart.activeIndex = index;
      },
      reload(){
        if(this.bandera == 0){
          this.bandera = 1;
          this.$router.push({ path: this.$route.path })
      }
    }
    },
    mounted() {
      this.initBigChart(0);
      this.reload();
    }
  };
</script>
<style>

.imagenTecmm2{
  width: 100%;
  height: 100%;
  max-width: 300px;
  max-height: 300px;
  margin-top: -40px;
  z-index: 100;
  border-radius: 15px;
}
.el-table .cell{
  padding-left: 0px;
  padding-right: 0px;
}
</style>
