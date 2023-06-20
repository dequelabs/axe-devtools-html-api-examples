import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsComponent } from './product-details.component';
import axeDevTools from '@axe-devtools/browser';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  beforeEach(async () => {
    let reporter:any;
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailsComponent ]
    })
    .compileComponents();
    axeDevTools.init('wcag2', function() {
      });

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should check for a11y', async  () => {
    expect(component).toBeTruthy();
    const app = fixture.debugElement.nativeElement;
    const results = await axeDevTools.run(app);
    // @ts-ignore
    axeDevToolsReporter.logTestResult(results);
  });
});
