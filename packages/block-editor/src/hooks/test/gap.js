/**
 * Internal dependencies
 */
import { getGapCSSValue, getGapBoxControlValueFromStyle } from '../gap';

describe( 'gap', () => {
	describe( 'getGapBoxControlValueFromStyle()', () => {
		it( 'should return `null` if argument is falsey', () => {
			expect( getGapBoxControlValueFromStyle( undefined ) ).toBeNull();
			expect( getGapBoxControlValueFromStyle( '' ) ).toBeNull();
		} );
		it( 'should return box control value from string', () => {
			const expectedValue = {
				top: '88rem',
				left: '88rem',
			};
			expect( getGapBoxControlValueFromStyle( '88rem' ) ).toEqual(
				expectedValue
			);
		} );
		it( 'should return box control value from object', () => {
			const blockGapValue = {
				top: '222em',
				left: '22px',
			};
			expect( getGapBoxControlValueFromStyle( blockGapValue ) ).toEqual( {
				...blockGapValue,
			} );
		} );
		it( 'should unwrap var: values from a string into a CSS var() function', () => {
			const expectedValue = {
				top: 'var(--wp--preset--spacing--60)',
				left: 'var(--wp--preset--spacing--60)',
			};
			expect(
				getGapBoxControlValueFromStyle( 'var:preset|spacing|60' )
			).toEqual( expectedValue );
		} );
		it( 'should unwrap var: values from an object into a CSS var() function', () => {
			const expectedValue = {
				top: 'var(--wp--preset--spacing--20)',
				left: 'var(--wp--preset--spacing--60)',
			};
			const blockGapValue = {
				top: 'var:preset|spacing|20',
				left: 'var:preset|spacing|60',
			};
			expect( getGapBoxControlValueFromStyle( blockGapValue ) ).toEqual(
				expectedValue
			);
		} );
	} );
	describe( 'getGapCSSValue()', () => {
		it( 'should return `null` if argument is falsey', () => {
			expect( getGapCSSValue( undefined ) ).toBeNull();
			expect( getGapCSSValue( '' ) ).toBeNull();
		} );

		it( 'should return single value for gap if argument is valid string', () => {
			expect( getGapCSSValue( '88rem' ) ).toEqual( '88rem' );
		} );

		it( 'should return single value for gap if row and column are the same', () => {
			const blockGapValue = {
				top: '88rem',
				left: '88rem',
			};
			expect( getGapCSSValue( blockGapValue ) ).toEqual( '88rem' );
		} );

		it( 'should return shorthand value for gap if row and column are different', () => {
			const blockGapValue = {
				top: '88px',
				left: '88rem',
			};
			expect( getGapCSSValue( blockGapValue ) ).toEqual( '88px 88rem' );
		} );

		it( 'should return default value if a top or left is missing', () => {
			const blockGapValue = {
				top: '88px',
			};
			expect( getGapCSSValue( blockGapValue, '1px' ) ).toEqual(
				'88px 1px'
			);
		} );
	} );
} );
