import {
  Component,
  OnInit
} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  ChartDataSets,
  ChartOptions
} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  text: any;
  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
  lineChartOptions: (ChartOptions & { annotation: any });
  lineChartLegend = false;
  lineChartType = 'line';

  constructor(private  http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('assets/demo.csv', {responseType: 'text'}).subscribe((data) => {
      const tableLines = data.split('\n');
      const result = [];
      const tableHeaders = tableLines[0].toLocaleLowerCase().split(',');
      for (let i = 1; i < tableLines.length - 1; i++) {
        const obj = {};
        const currentLine = tableLines[i].split(',');
        for (let j = 0; j < tableHeaders.length; j++) {
          obj[tableHeaders[j]] = currentLine[j];
        }
        result.push(obj);
      }
      const chartLabel = [];
      const chartData = [];
      result.forEach((item) => {
        chartLabel.push(item.year);
        chartData.push(item.score);

      });
      this.lineChartData = [
        {
          data: chartData,
        }
      ];
      this.lineChartLabels = chartLabel;
    });

    this.lineChartOptions = {
      responsive: true,
      scales: {
        xAxes: [{}],
        yAxes: [
          {
            id: 'y-axis-0',
            position: 'left',
          },
          {
            id: 'y-axis-1',
            position: 'right',
            gridLines: {
              color: 'rgba(255,0,0,0.3)',
            },
            ticks: {
              fontColor: 'red',
            }
          }
        ]
      },
      annotation: {
        annotations: [
          {
            type: 'line',
            mode: 'vertical',
            scaleID: 'x-axis-0',
            value: 'March',
            borderColor: 'orange',
            borderWidth: 2,
            label: {
              enabled: false
            }
          },
        ],
      },
    };

  }
}
