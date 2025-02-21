/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */

import { getBlockGapCSS, getAlignmentsInfo } from './utils';
import { getGapBoxControlValueFromStyle } from '../hooks/gap';
import { shouldSkipSerialization } from '../hooks/utils';

export default {
	name: 'default',
	label: __( 'Flow' ),
	inspectorControls: function DefaultLayoutInspectorControls() {
		return null;
	},
	toolBarControls: function DefaultLayoutToolbarControls() {
		return null;
	},
	getLayoutStyle: function getLayoutStyle( {
		selector,
		style,
		blockName,
		hasBlockGapSupport,
		layoutDefinitions,
	} ) {
		const blockGapStyleValue = getGapBoxControlValueFromStyle(
			style?.spacing?.blockGap
		);
		// If a block's block.json skips serialization for spacing or
		// spacing.blockGap, don't apply the user-defined value to the styles.
		const blockGapValue =
			blockGapStyleValue?.top &&
			! shouldSkipSerialization( blockName, 'spacing', 'blockGap' )
				? blockGapStyleValue?.top
				: '';

		let output = '';

		// Output blockGap styles based on rules contained in layout definitions in theme.json.
		if ( hasBlockGapSupport && blockGapValue ) {
			output += getBlockGapCSS(
				selector,
				layoutDefinitions,
				'default',
				blockGapValue
			);
		}
		return output;
	},
	getOrientation() {
		return 'vertical';
	},
	getAlignments( layout ) {
		const alignmentInfo = getAlignmentsInfo( layout );
		if ( layout.alignments !== undefined ) {
			if ( ! layout.alignments.includes( 'none' ) ) {
				layout.alignments.unshift( 'none' );
			}
			return layout.alignments.map( ( alignment ) => ( {
				name: alignment,
				info: alignmentInfo[ alignment ],
			} ) );
		}
		const { contentSize, wideSize } = layout;

		const alignments = [
			{ name: 'left' },
			{ name: 'center' },
			{ name: 'right' },
		];

		if ( contentSize ) {
			alignments.unshift( { name: 'full' } );
		}

		if ( wideSize ) {
			alignments.unshift( { name: 'wide', info: alignmentInfo.wide } );
		}

		alignments.unshift( { name: 'none', info: alignmentInfo.none } );

		return alignments;
	},
};
