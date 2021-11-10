import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AppComponent } from './app.component';
import { FestivalAPIService } from './services/festival-api.service';
import { FestivalService } from './services/festival.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let festivalService: FestivalService;
  let festivalAPIService: FestivalAPIService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        FestivalService,
        FestivalAPIService,
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    festivalService = TestBed.inject(FestivalService);
    festivalAPIService = TestBed.inject(FestivalAPIService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'EA Code Test'`, () => {
    expect(component.title).toEqual('EA Code Test');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Result');
  });

  it('should load festivals', () => {
    spyOn(festivalService, 'getRecordLabels').and.returnValue(of({}));
    component.ngOnInit();
    expect(component.loading).toEqual(false);
    expect(festivalService.getRecordLabels).toHaveBeenCalled();
  });

  it('should show error messages if api fails', () => {
    spyOn(festivalAPIService, 'getFestivals').and.callFake(() => throwError( () => new HttpErrorResponse({
      error: 'Too many requests',
      status: 429
    })));
    component.loadFestivals();
    expect(component.loading).toEqual(false);
    expect(component.errors.length).toEqual(1);
    expect(component.errors[0].message).toEqual('Too many requests');
  });
});
