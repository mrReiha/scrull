/**
 * @xCode 110110011000011011011000101101011101100010110001001000001101100110000101110110011000011000100000110110001010011111011001100001001101100110000100110110011000011100100000110110011000100000100000110110011000000111011000101010101101100010101101001000001101100110000010110110001011000111011011100011001101100010101000
 * @name Scrull
 * @description Making scroll-bars more attracitve
 * @author Reiha Hosseini (@mrReiha) <iam@reiha.net>
 * @version v0.0.1
 * @since 07/2015
 * @license GPL
 */
;!( function( w, d ) {

	'use strict';
	
	var reqAnim = reqAnim || requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame || function( p ) { setTimeout( p, 1000 / 16 ); },
	
		scrolling = function( e ) {
	
			this.indicator.style.top = ( this.scrollTop * this.itemHeight / this.height ) + 'px';
	
		},
		
		scrullTo = function( px ) {
		
			var scroll = function() {
					
					var time;
					
					prog = ( new Date - start ) / duration;
					
					if ( prog > 1 )
						prog = 1;
					
					time = ( easeInOut && easeInOut( prog ) ) || ( ease.inOutCube && ease.inOutCube( prog ) ) ||
							( function( t ) { return ( --t ) * t * t + 1; } )( prog );
					
					LM.scrollTop = top + ( diff * time );
					
					if ( prog < 1 )
						reqAnim( scroll );
					
				},
				
				px = Math.min( d.documentElement.offsetHeight - screen.availHeight ),
				
				LM = this || ( DEScrolling ? d.documentElement : d.body ),
				top = LM.scrollTop,
				diff = px - top,
				
				prog = 0,
				
				start = new Date,
				duration = 500; // Miliseconds
			
			reqAnim( scroll );
			
		},
		
		DEScrolling = !!~navigator.userAgent.search( /firefox|msie|trident/i ),
		
		LMs = d.querySelectorAll( '.scrull' ),
		
		item,
		i = LMs.length,

		innerDiv,
		wrapper,
		scruller,
		indicator,
		
		indicatorHeight,
		
		isLtr,
		
		scrullPadding = 25;
		
	while ( item = LMs[ --i ] ) {
	
		( innerDiv = d.createElement( 'div' ) ).className = 'inner-scrull';
		( wrapper = d.createElement( 'div' ) ).className = 'scrull-wrapper';
		( scruller = d.createElement( 'div' ) ).className = 'scruller';
		( indicator = d.createElement( 'div' ) ).className = 'indicator';
		
		scruller.appendChild( indicator );
		
		innerDiv.innerHTML = item.innerHTML;
		
		item.innerHTML = '';
		
		innerDiv.appendChild( wrapper );
		item.appendChild( innerDiv );
		item.appendChild( scruller );
		
		innerDiv.indicator = indicator;
		innerDiv.height = innerDiv.offsetHeight;
		innerDiv.itemHeight = item.offsetHeight;
		
		indicatorHeight = Math.ceil( innerDiv.itemHeight * 100 / innerDiv.height );
		indicatorHeight = Math.min( indicatorHeight, 100 );
		indicatorHeight = Math.max( indicatorHeight, 10 );
		
		indicator.style.height = indicatorHeight + '%';
		
		/**
		 * =================================================================================
		 * ========= Pixel-way =============================================================
		 * =================================================================================
		 */
		// indicator.style.height = ( innerDiv.itemHeight * scruller.offsetHeight / innerDiv.height ) + 'px';
		
		innerDiv.addEventListener( 'scroll', scrolling, false );
		
		isLtr = getComputedStyle( item ).direction == 'ltr';
		scruller.style[ isLtr ? 'right' : 'left' ] = 0;
		
		innerDiv.style.width = ( parseInt( getComputedStyle( item ).width ) + scrullPadding ) + 'px';
		innerDiv.style.height = ( parseInt( getComputedStyle( item ).height ) + scrullPadding ) + 'px';
	
	};
	
})( this, document );
