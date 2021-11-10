import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { FestivalAPIService } from './festival-api.service';

import { FESTIVAL_RESPONSE_MOCK, RECORD_LABELS_MOCK } from './festival-api.service.mocks';
import { FestivalService } from './festival.service';

describe('FestivalService', () => {
  let service: FestivalService;
  let httpMock: HttpTestingController;
  let festivalAPIService: FestivalAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FestivalService,
        FestivalAPIService,
      ],
    });
    service = TestBed.inject(FestivalService);
    festivalAPIService = TestBed.inject(FestivalAPIService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get records labels with bands and festivals in alphabetical order', async () => {
    spyOn(festivalAPIService, 'getFestivals').and.returnValue(of(FESTIVAL_RESPONSE_MOCK));
    const recordLabelsData = await firstValueFrom(service.getRecordLabels());
    expect(recordLabelsData).toBeTruthy();
    expect(recordLabelsData).toEqual(RECORD_LABELS_MOCK);
  });

  it('should return null when no record labels return from api', async () => {
    spyOn(festivalAPIService, 'getFestivals').and.returnValue(of('') as any);
    const recordLabelsData = await firstValueFrom(service.getRecordLabels());
    expect(recordLabelsData).toBeNull();
  });

  it('should show error messages if api fails with http status code', () => {
    const errors = service.getErrors(new HttpErrorResponse({
      error: 'Too many requests',
      status: 429
    }));

    expect(errors.length).toEqual(1);
    expect(errors[0].message).toEqual('Too many requests');
  });

  it('should show error messages if api fails without http status code', () => {
    const errors = service.getErrors(new HttpErrorResponse({
      error: 'Too many requests',
    }));

    expect(errors.length).toEqual(1);
    expect(errors[0].message).toEqual('Unable to connect to server');
  });
});
