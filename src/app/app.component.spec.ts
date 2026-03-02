import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });


/*
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'zoneless-calculator' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('zoneless-calculator');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Hello, zoneless-calculator'
    );
  });
*/

  it('should be 5', () => {
	  expect(3 + 2).toBe(5)
  })
 
  it('should be -8', () => {
	const num1 = 8;
	const num2 = -16;

	const result = num1 + num2;

	expect(result).not.toBe("-8");
	expect(result).toBe(-8);

  })
	
  test('should render router-outlet', () => {
	const fixture = TestBed.createComponent(AppComponent)
	const compiled = fixture.nativeElement as HTMLElement;

	//console.log(compiled.innerHTML);

	const routerOutlet = compiled.querySelector('router-outlet');

	//console.log(routerOutlet)
	expect(routerOutlet).toBeTruthy();

  });


  it('should render router-outlet with CCS classes', () => {
	  const fixture = TestBed.createComponent(AppComponent);
	  const compiled = fixture.nativeElement as HTMLElement;

	  const divElement = compiled.querySelector('div');
	  const mustHaveClasses = 'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(" ");
	  

	  divElement ?.classList.forEach( className => {
	        //console.log(divElement ?.classList.value);
		expect(mustHaveClasses).toContain(className);
	  })
  });
  
  it('should render buyMeABeer link', () => {
	  const fixture = TestBed.createComponent(AppComponent);
	  const compiled = fixture.nativeElement as HTMLElement;
	  const aElement = compiled.querySelector('a');
	  expect(aElement).toBeTruthy();

	  const attTitle = aElement?.getAttribute('title');
	  const attHref = aElement!.getAttribute('href');
	  const attTarget = aElement!.getAttribute('target');
	  const expectedTitle = 'Buy me a beer';
	  const expectedHref = 'https://www.buymeacoffee.com/scottwindon';
	  const expectedTarget = '_blank';

	  expect(attTitle).toBe(expectedTitle);
	  expect(attHref).toBe(expectedHref);
	  expect(attTarget).toBe(expectedTarget);
  });
  
});
