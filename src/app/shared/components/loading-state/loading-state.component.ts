import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-state',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="loading-state" *ngIf="loading">
      <mat-spinner diameter="32"></mat-spinner>
    </div>
  `,
  styles: [
    `
      .loading-state {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingStateComponent {
  @Input() loading = false;
}
