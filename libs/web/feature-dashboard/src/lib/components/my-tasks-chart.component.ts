import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  input,
  OnDestroy,
  viewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Chart, ChartConfiguration } from 'chart.js/auto';

export interface MyTasksChartStats {
  todo: number;
  in_progress: number;
  done: number;
}

@Component({
  selector: 'df-my-tasks-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule],
  templateUrl: './my-tasks-chart.component.html',
  styleUrl: './my-tasks-chart.component.scss',
})
export class MyTasksChartComponent implements AfterViewInit, OnDestroy {
  readonly stats = input.required<MyTasksChartStats>();
  readonly userName = input('You');

  private readonly canvasRef =
    viewChild<ElementRef<HTMLCanvasElement>>('chartCanvas');

  private chart?: Chart;
  private viewReady = false;

  constructor() {
    effect(() => {
      this.stats();
      if (this.viewReady) {
        this.updateChart();
      }
    });
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.updateChart();
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  private updateChart(): void {
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) {
      return;
    }

    const stats = this.stats();
    const labels = ['To Do', 'In Progress', 'Done'];
    const data = [stats.todo, stats.in_progress, stats.done];
    const colors = ['#2563eb', '#d97706', '#16a34a'];

    if (this.chart) {
      this.chart.data.datasets[0].data = data;
      this.chart.update();
      return;
    }

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Tasks',
            data,
            backgroundColor: colors,
            borderRadius: 8,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.label}: ${ctx.parsed.y} tasks`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
          },
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1, precision: 0 },
            grid: { color: '#f1f5f9' },
            border: { display: false },
          },
        },
      },
    };

    this.chart = new Chart(canvas, config);
  }
}
