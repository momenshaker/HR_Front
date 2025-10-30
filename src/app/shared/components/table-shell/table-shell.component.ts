import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-table-shell',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card class="table-shell">
      <mat-card-header *ngIf="title">
        <mat-card-title>{{ title }}</mat-card-title>
        <mat-card-subtitle *ngIf="subtitle">{{ subtitle }}</mat-card-subtitle>
        <ng-content select="[table-actions]"></ng-content>
      </mat-card-header>
      <mat-card-content>
        <ng-content></ng-content>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .table-shell {
        width: 100%;
        overflow: auto;
      }
      mat-card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableShellComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
}
