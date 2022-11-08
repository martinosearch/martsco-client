import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { interval, Observable } from 'rxjs';
import { Forfait } from '../models/forfait';
import { ForfaitService } from '../services/forfait.service';

@Component({
  selector: 'app-forfait-state',
  templateUrl: './forfait-state.component.html',
  styleUrls: ['./forfait-state.component.scss']
})

export class ForfaitStateComponent implements OnInit, OnDestroy {
  displayedColumns = ['title', 'value'];
  serial = new Observable<string>();
  currentForfait = new Forfait();
  initialAmount = 10000;
  useAmount = 0;
  remainAmount = 10000;
  index = 0;
  chart: Chart;
  updateFlag = true;

  options: any = {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'Graphe des consommations'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      type: 'datetime',
      labels: {
        overflow: 'justify'
      }
    },
    yAxis: {
      title: {
        text: 'Forfait restant'
      },
      min: 0,
    },
    tooltip: {
      valueSuffix: ' FCFA'
    },
    plotOptions: {
      spline: {
        lineWidth: 4,
        states: {
          hover: {
            lineWidth: 4
          }
        },
        marker: {
          enabled: true
        },
        pointInterval: 3600000 * 24, // on second
        pointStart: Date.now()
      }
    },
    series: [],
    navigation: {
      menuItemStyle: {
        fontSize: '10px'
      }
    }
  };

  constructor(
    public dialog: MatDialog,
    public forfaitService: ForfaitService,
    public router: Router
  ) { }

  ngOnInit() {
    this.chart = new Chart(this.options);
    this.serial = this.forfaitService.getEstablishmentSerial();
    this.setRemain();
    const source = interval(30000);
    source.subscribe(() => this.setRemain());
  }

  ngOnDestroy() { }


  // add point to chart serie
  setRemain() {
    this.forfaitService.getCurrentForfait().subscribe(response => {
      this.currentForfait = response;

      // we update the chart
      this.useAmount = this.useAmount + 100;
      this.remainAmount = this.remainAmount - this.useAmount;
      this.chart.addPoint([this.remainAmount, this.index], 0);
      this.index = this.index++;

      const dataSerie1 = [];
      for (const conso of this.currentForfait.forfaitConsommations) {
        const tempData1 = [];
        tempData1.push(new Date(conso.consoDate).getTime());
        tempData1.push(conso.remainAmount);
        dataSerie1.push(tempData1);
      }

      const series1: any = {
        name: 'Conso. réelle',
        data: dataSerie1
      };

      const series2: any = {
        name: 'Date d\'épuisement',
        data: [[new Date(this.currentForfait.expirationDate).getTime(), 0]]
      };

      console.log('update!');
      this.options.plotOptions.pointStart = new Date(this.currentForfait.activationDate).getTime();
      this.chart.removeSeries(0);
      this.chart.removeSeries(0);
      this.chart.addSeries(series1, true, false);
      this.chart.addSeries(series2, true, false);
    });
  }
}
