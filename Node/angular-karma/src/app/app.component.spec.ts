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
    expect(app).toBeTruthy();
});


 


});
