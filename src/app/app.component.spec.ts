import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('example that should be -8', () => {
    const num1 = 8;
    const num2 = -16;

    const result = num1 + num2;

    expect(result).not.toBe("-8");
    expect(result).toBe(-8);
  })

  test('should render router-outlet', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const compiled = fixture.nativeElement as HTMLElement;

    // console.log(compiled.innerHTML)

    const routerOutlet = compiled.querySelector('router-outlet');

    expect(routerOutlet).toBeTruthy();
  })
});


