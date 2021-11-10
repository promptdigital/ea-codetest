import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY, map, take, tap } from 'rxjs';
import { FestivalService } from './services/festival.service';
import { ErrorMessage, RecordLabelList } from './shared/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'EA Code Test';
  loading = false;
  recordLabels: RecordLabelList | null = null;
  errors: ErrorMessage[] = [];

  constructor(
    private festivalService: FestivalService,
  ) {}

  ngOnInit() {
    this.loadFestivals();
  }

  loadFestivals() {
    this.loading = true;
    this.festivalService.getRecordLabels()
      .pipe(
        take(1),
        tap((recordLabels) => this.recordLabels = recordLabels),
        tap(() => this.loading = false),
        catchError((errors) => {
          this.loading = false;
          this.errors = this.festivalService.getErrors(errors);
          return EMPTY;
        })
      ).subscribe();
  }
}
