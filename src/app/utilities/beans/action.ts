import { ProgressSpinnerMode } from "@angular/material/progress-spinner";

export class Action {
  progressId: number;
  progressDeterminate = true;
  progressValue = 0;
  progressMessage = "";
  bufferValue = 50;
  mode: ProgressSpinnerMode = 'determinate';
}
