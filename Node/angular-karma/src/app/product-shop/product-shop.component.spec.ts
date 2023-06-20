import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductShopComponent } from './product-shop.component';

describe('ProductShopComponent', () => {
  let component: ProductShopComponent;
  let fixture: ComponentFixture<ProductShopComponent>;
  let reporter:any;
  
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductShopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  //   axeDevTools.run(component).then((results:any) => {
  //     console.log(results);
    
  //  });
  });
});
