import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Band, BandList, ErrorMessage, Festival } from '../shared/models';
import { FestivalAPIService } from './festival-api.service';

@Injectable()
export class FestivalService {

  constructor(private festivalApiService: FestivalAPIService) {}

  getRecordLabels(): Observable<any> {
    return this.festivalApiService.getFestivals().pipe(
      map(festivals => this.formatFestivals(festivals)),
    )
  }

  private formatFestivals(festivals: Festival[]) {
    if ( !festivals ) return null;

    const bands: Band[] = [];
    festivals.forEach((festival: Festival) => {
      // NOTE: adding 'N/A' for festival name and recordLabel if its not available assuming business logic requires to show all available data.
      festival.bands?.forEach( (band: Band) => {
        bands.push({
          ...band,
          recordLabel: band.recordLabel || 'N/A',
          festival: festival.name || 'N/A'
        });
      })
    });

    const recordLabels = this.groupRecordLabels(bands);
    Object.keys(recordLabels).forEach((key) => {
      recordLabels[key] = this.groupBands(recordLabels[key]);
    });

    return recordLabels;
  }

  getErrors(error: HttpErrorResponse) {
    let errors: ErrorMessage[] = [];

    if ( error.status === 0 ) {
      errors.push({
        message: 'Unable to connect to server'
      })
    } else {
      errors = [{
        message: error.error
      }];
    }
    return errors;
  }

  private groupRecordLabels(bands: Band[]) {
    return bands.reduce((recordLabelsList: any, band) => {
      if( !recordLabelsList[band.recordLabel] ) recordLabelsList[band.recordLabel] = [];
      recordLabelsList[band.recordLabel].push(band);
      return recordLabelsList;
    }, {})
  }

  private groupBands(bands: Band[]) {
    return bands.reduce((bandList: BandList, band: Band) => {
      if ( !bandList[band.name] ) bandList[band.name] = [];
      bandList[band.name].push({
        name: band.festival
      });
      return bandList;
    }, {})
  }
}
