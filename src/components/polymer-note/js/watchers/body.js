/**
*
*	FUNCTION: bodyChanged
*
*
*	DESCRIPTION:
*		- Event handler for changes to a note body.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2015. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2015.
*
*/

'use strict';

// MODULES //

var md = require( 'markdown-it' )();


// BODY CHANGED //

/**
* FUNCTION: bodyChanged( oldVal, newVal )
*	Event handler for changes to a note body.
*
* @param {String} oldVal - old value
* @param {String} newVal - new value
*/
function bodyChanged( oldVal, newVal ) {
	/* jslint validthis:true */
	var err,
		fcn,
		val,
		el;
	if ( typeof newVal !== 'string' ) {
		err = new TypeError( 'body::invalid assignment. Must be a string. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.body = oldVal;
		return;
	}
	if ( this.mode === 'javascript' ) {
		// TODO: this is where the magic should occur when parsing the AST and generating the new code to be evaluated.
		fcn = new Function( newVal );
		val = fcn();

		el = this.shadowRoot.querySelector( '.print' );
		if ( !el ) {
			el = document.createElement( 'polymer-print' );
			el.classList.add( 'print' );
			this.shadowRoot.appendChild( el );
		}
		el.setAttribute( 'body', val );
	}
	else if ( this.mode === 'markdown' ) {
		val = md.render( newVal );

		// TODO: hide the editor
		// TODO: bind a double-clk callback which toggles editor/rendered markdown visibility

		el = this.shadowRoot.querySelector( '.markdown' );
		if ( !el ) {
			el = document.createElement( 'polymer-github-markdown' );
			el.classList.add( 'markdown' );
			this.shadowRoot.appendChild( el );
		}
		el.$.body.innerHTML = val;
	}
	this.fire( 'change', {
		'attr': 'body',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION bodyChanged()


// EXPORTS //

module.exports = bodyChanged;
