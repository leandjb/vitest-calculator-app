import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';
import { describe, it, test, expect, vi} from 'vitest';

describe('CalculatorServices', () => {

	let service: CalculatorService;

	beforeEach( ()=> {
		TestBed.configureTestingModule({});
		service = TestBed.inject(CalculatorService);

		vi.clearAllMocks();
		//vi.resetAllMocks();
	});

	it('should be service created ', () => {
		expect(service).toBeTruthy();
	});

	it('should be created with default values', ()=> {

		//console.log(service);
		expect(service.resultText()).toBe("0")
		expect(service.subResultText()).toBe("0")
		expect(service.lastOperator()).toBe("+")
	})

	it('should set resultText, subResultText to "0" when C is pressed', ()=> {

		service.resultText.set('654')
		service.resultText.set('987')

		//console.log({ resultTextValue: service.resultText() })
		
		service.constructNumber('C');
		
		//console.log({ resultTextValue: service.resultText() })

		expect(service.resultText()).toBe('0');
		expect(service.subResultText()).toBe('0');
	})

	it('should update resultText with 4 number inputs', ()=> {

		service.constructNumber('1')
		service.constructNumber('9')
		service.constructNumber('9')
		service.constructNumber('3')
		expect(service.resultText()).toBe('1993')

	})

	it('should handle operators correctly', ()=> {
		const operators = ['+', '-', '*', '/']

		operators.forEach((operator) => {
			service.resultText.set('1908');
			service.constructNumber(operator)
			expect(service.lastOperator()).toBe(operator);
			expect(service.resultText()).toBe('0');
		});
			
	})

	it('should calculate result correctly for addition', ()=> {
		service.constructNumber('9')
		service.constructNumber('+')
		service.constructNumber('8')
		service.constructNumber('=')

		expect(service.resultText()).toBe('17')
	})

	it('should calculate result correctly for substraction', ()=> {
		service.constructNumber('7')
		service.constructNumber('-')
		service.constructNumber('6')
		service.constructNumber('=')

		expect(service.resultText()).toBe('1')
	})
	
	it('should calculate result correctly for multiplication', ()=> {
		service.constructNumber('5')
		service.constructNumber('*')
		service.constructNumber('4')
		service.constructNumber('=')

		expect(service.resultText()).toBe('20')
	})
	
	it('should calculate result correctly for division', ()=> {
		service.constructNumber('9')
		service.constructNumber('/')
		service.constructNumber('3')
		service.constructNumber('=')

		expect(service.resultText()).toBe('3')
	})

	it('should handle decimal point', ()=>{
		service.constructNumber('8');
		service.constructNumber('.');
		service.constructNumber('1');
		service.constructNumber('/');
		service.constructNumber('2');
		service.constructNumber('.');
		service.constructNumber('0');
		service.constructNumber('=');

		expect(service.resultText()).toBe('4.05');
	})	

	it('should handle with double decimal point', ()=>{
		service.constructNumber('9');
		service.constructNumber('7');
		service.constructNumber('2');
		service.constructNumber('.');
		service.constructNumber('.');
		service.constructNumber('5');
		service.constructNumber('3');
		service.constructNumber('0');
		service.constructNumber('1');
		service.constructNumber('.');
		service.constructNumber('.');
	
		expect(service.resultText()).toBe('972.5301')
	})


	it('should handle sign change +/-', ()=>{
		service.constructNumber('1')	
		service.constructNumber('9')	
		service.constructNumber('0')	
		service.constructNumber('8')	
		service.constructNumber('+/-')	
		expect.soft(service.resultText()).toBe('-1908')
		service.constructNumber('+/-')	
		expect(service.resultText()).toBe('1908')
	})

	it('should handle backspace', ()=>{
		service.constructNumber('6')
		service.constructNumber('4')
		expect(service.resultText()).toBe('64')

		service.constructNumber('Backspace')
		expect(service.resultText()).toBe('6')

		service.constructNumber('Backspace')
		expect(service.resultText()).toBe('0')
	})

	it('should handle backspace with negative numbers', ()=>{
		service.resultText.set('-15')
		service.constructNumber('Backspace')

		expect.soft(service.resultText()).toBe('-1')
		service.constructNumber('Backspace')
		expect(service.resultText()).toBe('0')
	})

	it('should handle max length to be 10 characters', ()=>{
		const consoleSpy = vi
		const maxLength = 10

		for(let i=0; i < maxLength; i++){
			service.constructNumber('3')
		}

		expect(service.resultText().length).toBe(maxLength)
		expect(service.resultText()).toBe('3333333333')
	})

	it('should decimal number start with zero', ()=> {
		service.constructNumber('.')
		service.constructNumber('.')

		expect(service.resultText()).toBe('0.')
	})

	it('should handle invalid input with SPY', ()=>{
		const consoleSpy = vi.spyOn(console, 'log')
		const wrongInput: string = 'ABC'

		service.resultText.set('20')
		service.constructNumber(wrongInput)

		//console.log(service.resultText())
		expect(service.resultText()).toBe('20')


		expect(consoleSpy).toHaveBeenCalled();
		expect(consoleSpy).toHaveBeenCalledWith('Invalid input', 'ABC');

	})

	it('should have max 10 characters with SPY', ()=>{
		const consoleSpy = vi.spyOn(console, 'log')

		//delete logs message on console
		consoleSpy.mockImplementation( ()=>{});


		for (let  i=0; i<20; i++)  {
			service.constructNumber('1');
		}

		//expect(consoleSpy).not.toHaveBeenCalled();

		expect(service.resultText().length).toBe(10);
		expect(service.resultText()).toBe('1111111111');

		expect(consoleSpy).toHaveBeenCalled();
		expect(consoleSpy).toHaveBeenCalledTimes(10);
	})
});
