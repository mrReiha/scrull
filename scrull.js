/**
 * ##### 110110011000011011011000101101011101100010110001001000001101100110000101110110011000011000100000110110001010011111011001100001001101100110000100110110011000011100100000110110011000100000100000110110011000000111011000101010101101100010101101001000001101100110000010110110001011000111011011100011001101100010101000
 *
 * @name Scrull
 * @description Making scroll-bars more attracitve
 *
 * @author Reiha Hosseini ( @mrReiha ) <iam@reiha.net>
 * @version v0.0.4
 * @since 07/2015
 *
 * @license GPL
 */
;!( function( w, d ) {

	'use strict';

	var reqAnim = reqAnim || requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame || function( p ) { setTimeout( p, 1000 / 16 ); },

		scrolling = function( e ) {

			/**
			 * =================================================================================
			 * ========= Pixel-way =============================================================
			 * =================================================================================
			 */
			// this.indicator.style.top = ( this.scrollTop * this.itemHeight / this.height ) + 'px';

			this.indicator.style.top = ( this.scrollTop * 100 / this.height ) + '%';

		},

        scrullIt = function( item ) {

			var innerDiv,
				wrapper,
				scruller,
				indicator,

				lastScrulledLM,

                dragging = false,
				startY,

				tempH,

				indicatorHeight,

				isLtr,

				styles = getComputedStyle( item );

			if ( !~item.className.search( /scrull/gi ) )
				item.className = item.className ? item.className + ' scrull' : 'scrull';

            ( innerDiv = d.createElement( 'div' ) ).className = 'inner-scrull';
    		( wrapper = d.createElement( 'div' ) ).className = 'scrull-wrapper';
    		( scruller = d.createElement( 'div' ) ).className = 'scruller';
    		( indicator = d.createElement( 'div' ) ).className = 'indicator';

    		scruller.appendChild( indicator );

			if ( lastScrulledLM = item.querySelector( '.inner-scrull' ) )
				innerDiv.innerHTML = lastScrulledLM.innerHTML;
			else
				innerDiv.innerHTML = item.innerHTML;

    		item.innerHTML = '';

    		innerDiv.appendChild( wrapper );
    		item.appendChild( innerDiv );
    		item.appendChild( scruller );

    		innerDiv.indicator = indicator;
    		innerDiv.height = innerDiv.offsetHeight;
    		innerDiv.itemHeight = item.offsetHeight;

    		indicatorHeight = Math.ceil( innerDiv.itemHeight * 100 / innerDiv.height ) + Math.ceil( scrullPadding * 100 / innerDiv.height );
    		indicatorHeight = Math.min( indicatorHeight, 100 );

            indicator.addEventListener( 'mousedown', function( e ) {

                dragging = true;

				startY = e.clientY;

				tempH = this.getBoundingClientRect().top - scruller.getBoundingClientRect().top;

				if ( !~d.body.className.search( /no\-selection/gi ) )
					d.body.className += ' no-selection';

            }, false );

            d.addEventListener( 'mousemove', function( e ) {

                var offset,

					y,

					destTop,

					scrullerPos,
					itemPos,
					indicatorPos;

                if ( !dragging )
                    return;

				y = e.clientY;

				itemPos = item.getBoundingClientRect();
				indicatorPos = indicator.getBoundingClientRect();


				offset = ( ( tempH + ( y - itemPos.top ) - ( startY - itemPos.top ) ) *
						( innerDiv.height - itemPos.height ) ) / ( itemPos.height - indicatorPos.height );

				/**
				 * =================================================================================
				 * ========= Less accurate =========================================================
				 * ========= But more readable way =================================================
				 * =================================================================================
				 */

				// scrullerPos = scruller.getBoundingClientRect();
				// destTop = y - scrullerPos.top;

				// if ( destTop < 0 )
				// 		destTop = 0;

				// offset = ( destTop * innerDiv.height / scrullerPos.height ) - startY;

                innerDiv.scrollTop = offset;

            }, false );

            w.addEventListener( 'mouseup', function( e ) {

                dragging = false;

				if ( ~d.body.className.search( /no\-selection/gi ) )
					d.body.className = d.body.className.replace( /\s?no\-selection/gi, '' );

            }, false );

    		indicator.style.height = indicatorHeight + '%';

    		if ( indicatorHeight < 100 & !~item.className.search( /show\-scruller/gi ) )
    			item.className += ' show-scruller';

			if ( indicatorHeight == 100 && ~item.className.search( /show\-scruller/gi ) )
				item.className = item.className.replace( /\s?show\-scruller/gi, '' );

    		// .rel == position: relative
    		if ( styles.position == 'static' )
    			item.className += ' rel';

    		/**
    		 * =================================================================================
    		 * ========= Pixel-way =============================================================
    		 * =================================================================================
    		 */
    		// indicator.style.height = ( innerDiv.itemHeight * scruller.offsetHeight / innerDiv.height ) + 'px';

    		innerDiv.addEventListener( 'scroll', scrolling, false );

    		isLtr = styles.direction == 'ltr';

    		scruller.style[ isLtr ? 'right' : 'left' ] = 0;
			scruller.className += isLtr ? ' is-ltr' : ' is-rtl';

    		innerDiv.style.width = ( parseInt( styles.width ) + scrullPadding ) + 'px';
    		innerDiv.style.height = ( parseInt( styles.height ) + scrullPadding ) + 'px';

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

		scrullPadding = 25;

	while ( item = LMs[ --i ] )
        scrullIt( item );

	w.addEventListener( 'resize', function( e ) {

		i = LMs.length;

		while ( item = LMs[ --i ] )
	        scrullIt( item );

	}, false );

    w.scrullTo = scrullTo;
    w.scrullIt = scrullIt;

})( this, document );
