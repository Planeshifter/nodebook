/**
*
*	FUNCTION: onRemoveIconClick
*
*
*	DESCRIPTION:
*		- Event listener invoked when a user clicks a remove icon.
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

/**
* FUNCTION: onRemoveIconClick( evt, detail, sender )
*	Event listener invoked when a user clicks a remove icon.
*
* @param {Event} evt - standard event object
* @param details - e.detail
* @param {DOMElement} sender - reference to the node that declared the event handler
*/
function onRemoveIconClick( evt ) {
	/* jslint validthis:true */
	var notes = this.notes,
		len = notes.length,
		uid,
		i;

	if ( evt.path[ 0 ].className !== 'note' ) {
		return;
	}
	evt.preventDefault();

	// Get the note's unique identifier:
	uid = evt.path[ 0 ].uid;

	// Find the note and remove it from the list of notes...
	for ( i = 0; i < len; i++ ) {
		if ( notes[ i ].uid === uid ) {
			break;
		}
	}
	notes.splice( i, 1 );
	return false;
} // end FUNCTION onDoubleClick()


// EXPORTS //

module.exports = onRemoveIconClick;
