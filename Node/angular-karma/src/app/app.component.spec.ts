import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import axeDevTools from '@axe-devtools/browser';




describe('AppComponent', () => {
  let reporter:any;
  beforeEach(async () => {
    axeDevTools.init('wcag2', function() {
      // done();
    });
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app',async  () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.debugElement.nativeElement;
    // const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    const results = await axeDevTools.run(app);
    // @ts-ignore
    axeDevToolsReporter.logTestResult(results);
    console.log(results);
});


  it(`should have as title 'angular_proj1'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular_proj1');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('angular_proj1 app is running!');
  // });
});
