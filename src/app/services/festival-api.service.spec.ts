import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FestivalAPIService } from './festival-api.service';
import { FESTIVAL_RESPONSE_MOCK } from './festival-api.service.mocks';

describe('FestivalAPIService', () => {
  let service: FestivalAPIService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FestivalAPIService],
    });
    service = TestBed.inject(FestivalAPIService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getFestivals', () => {
    it('should return an Observable<Festival>', () => {
      const subscriber = jasmine.createSpyObj(['next']);

      service.getFestivals().subscribe(subscriber);

      const testRequest = httpMock.expectOne(service.API_FESTIVALS);
      testRequest.flush(FESTIVAL_RESPONSE_MOCK);

      expect(testRequest.request.method).toBe('GET');
      expect(subscriber.next).toHaveBeenCalledWith(FESTIVAL_RESPONSE_MOCK);
    });
  });
});
