import { Component, Inject, OnInit } from '@angular/core';

import { ProgressService } from '../../../services/progress/progress.service';
import { ProgressState, ProgressStatus } from '../../../services/progress/progress.types';

@Component({
  selector: 'app-progress-indicator',
  styleUrls: ['./components/shared/progress-indicator/progress-indicator.component.css'],
  templateUrl: './components/shared/progress-indicator/progress-indicator.component.html'
})
export class ProgressIndicatorComponent implements OnInit {
  public message?: string = 'Working, please wait...';
  public show: boolean = false;

  public constructor(@Inject(ProgressService) private _progressService: ProgressService) {
  }

  public ngOnInit(): void {
    this._progressService.onStateChanged.subscribe(this._onProgressStateChanged.bind(this));
  }

  private _onProgressStateChanged(newState: ProgressState): void {
    this.show = newState.status === ProgressStatus.Working;
    this.message = newState.message;
  }
}
