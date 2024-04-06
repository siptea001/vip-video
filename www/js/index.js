"use strict";
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function ( t ) {
	return typeof t
} : function ( t ) {
	return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
};
! function () {
	var e = document.getElementsByTagName( "img" ),
		n = document.getElementById( "search" ),
		o = document.getElementById( "toTop" ),
		r = utils.win( "clientHeight" );

	function i () {
		for ( var t = 0; t < e.length; t++ ) {
			utils.offset( e[ t ] )
				.top < utils.win( "scrollTop" ) + utils.win( "clientHeight" ) && a( e[ t ] )
		}
	}

	function a ( t ) {
		var e = t.getAttribute( "realImg" );
		if ( e && !t.loaded ) {
			var n = new Image;
			n.src = e, n.onload = function () {
				t.src = this.src, n = null, t.loaded = !0
			}
		}
	}
	i(), o.onclick = function () {
		var t = utils.win( "scrollTop" ),
			e = t / 500 * 30,
			n = setInterval( function () {
				if ( ( t = utils.win( "scrollTop" ) ) <= e ) return utils.win( "scrollTop", 0 ), void clearInterval( n );
				t -= e, utils.win( "scrollTop", t )
			}, 30 )
	}, window.onscroll = function () {
		var t = utils.win( "scrollTop" );
		i(),
			function () {
				var t = utils.win( "scrollTop" );
				r < t ? ( n.style.display = "block", n.style.position = "fixed", n.style.zIndex = "3" ) : n.style.display = "none"
			}(), o.style.display = r < t ? "block" : "none"
	}
}(),
function () {
	var t = document.getElementById( "banner" ),
		e = t.getElementsByTagName( "img" ),
		n = t.getElementsByTagName( "ul" )[ 0 ].getElementsByTagName( "li" ),
		o = null,
		r = -1;

	function i () {
		++r > e.length - 1 && ( r = 0 ), a()
	}

	function a () {
		for ( var t = 0; t < e.length; t++ ) t == r ? ( utils.css( e[ t ], "zIndex", 1 ), animate( e[ t ], {
			opacity: 1
		}, {
			duration: 600,
			callback: function () {
				for ( var t = utils.siblings( this ), e = 0; e < t.length; e++ ) utils.css( t[ e ], {
					opacity: 0
				} )
			}
		} ) ) : utils.css( e[ t ], "zIndex", 0 );
		! function () {
			for ( var t = 0; t < n.length; t++ ) n[ t ].className = t == r ? "show" : ""
		}()
	}
	clearInterval( o ), o = setInterval( i, 2e3 ), t.onmouseover = function () {
			clearInterval( o )
		}, t.onmouseout = function () {
			o = setInterval( i, 2e3 )
		},
		function () {
			for ( var t = 0; t < n.length; t++ ) ! function ( t ) {
				n[ t ].onmouseover = function () {
					r = t, a()
				}
			}( t )
		}()
}(),
function () {
	function t ( t ) {
		this.progress = t, this.prg = 0, this.width = document.documentElement.clientWidth, this.timer = 0
	}
	t.prototype = {
			start: function () {
				var t = this;
				t.onchange(), t.timer = setInterval( function () {
					t.prg >= t.random( [ 40, 80 ] ) ? clearInterval( t.timer ) : t.prg += t.random( 3 ), t.progress.style.width = t.prg / 100 * t.width +
						"px"
				}, 15 )
			},
			onchange: function () {
				var t = this;
				document.onreadystatechange = function () {
					"complete" === document.readyState && ( clearInterval( t.timer ), setInterval( function () {
						100 <= t.prg ? ( clearInterval( t.timer ), t.prg = 100, t.progress.style.display = "none" ) : t.prg += t.random( 1 ),
							t.progress.style.width = t.prg / 100 * t.width + "px"
					}, 5 ) )
				}
			},
			random: function ( t ) {
				if ( "object" !== ( void 0 === t ? "undefined" : _typeof( t ) ) ) return Math.random() * t;
				var e = t[ 1 ] - t[ 0 ];
				return Math.random() * e * 10 + t[ 0 ]
			}
		}, new t( document.getElementById( "progress" ) )
		.start()
}(), {
	moviePageNow: 1,
	tvPageNow: 1,
	tvPageNum: 1,
	init: function () {
		this._bindEvents(), this._getTvs(), this.openConsoleOutput()
	},
	_bindEvents: function () {
		this._bindHotMovieEvents(), this._bindMovieEvents(), this._bindTvEvents()
	},
	_bindHotMovieEvents: function () {
		var r = this;
		document.getElementById( "change_hot" )
			.addEventListener( "click", function ( t ) {
				t.preventDefault(), utils.ajax( {
					url: "/hot",
					type: "POST",
					dataType: "json",
					data: {
						type: "movie"
					},
					success: function ( t ) {
						if ( t.movies ) {
							var e = t.movies,
								n = [ e[ 0 ], e[ 1 ], e[ 2 ] ],
								o = [ e[ 3 ], e[ 4 ], e[ 5 ] ];
							r.renderHotMovies( {
								list: n
							}, {
								list: o
							} )
						}
					}
				} )
			} )
	},
	renderHotMovies: function ( t, e ) {
		var n =
			'\n                {{#list}}\n                <li>\n                    <a href="/play/{{url}}"><img src="/www/uploads/movie/{{id}}.jpg" realImg="" alt=""></a>\n                    <p>{{title}}</p>\n                    <span>{{info}}</span>\n                </li>\n                {{/list}}',
			o = utils.renderHtml( n, t ) + "",
			r = utils.renderHtml( n, e ) + "";
		o = o.trim(), document.getElementById( "hot_movie_top" )
			.innerHTML = o, document.getElementById( "hot_movie_bottom" )
			.innerHTML = r
	},
	_bindMovieEvents: function () {
		var e = this,
			t = document.getElementById( "change_movie" ),
			n = document.getElementById( "movie_pageNum" )
			.value;
		n = parseInt( n ), t.addEventListener( "click", function ( t ) {
			t.preventDefault(), e.moviePageNow < n ? e.moviePageNow++ : e.moviePageNow = 1, utils.ajax( {
				url: "/index/" + e.moviePageNow,
				type: "POST",
				dataType: "json",
				data: {
					type: "movie"
				},
				success: function ( t ) {
					t.movies && e.renderMovies( {
						list: t.movies
					} )
				}
			} )
		} )
	},
	_bindTvEvents: function () {
		var e = this;
		document.getElementById( "change_tv" )
			.addEventListener( "click", function ( t ) {
				t.preventDefault(), e.tvPageNow < e.tvPageNum ? e.tvPageNow++ : e.tvPageNow = 1, e._getTvs()
			} ), setInterval( function () {
				e.tvPageNow < e.tvPageNum ? e.tvPageNow++ : e.tvPageNow = 1, e._getTvs()
			}, 5e3 )
	},
	renderMovies: function ( t ) {
		var e = utils.renderHtml(
			'{{#list}}\n                <li class="li1">\n                        <a href="/play/{{url}}" class="pos">\n                            <img src="/www/uploads/movie/{{id}}.jpg" realImg="" alt="">\n                            <em>{{info}}</em>\n                        </a>\n                        <p>{{title}}</p>\n                </li>\n                {{/list}}',
			t );
		document.getElementById( "movie_container" )
			.innerHTML = e
	},
	_getTvs: function () {
		var e = this;
		utils.ajax( {
			url: "/index/" + e.tvPageNow,
			type: "POST",
			dataType: "json",
			data: {
				type: "tv"
			},
			success: function ( t ) {
				t.tvPageNum && ( e.tvPageNum = t.tvPageNum ), t.tvs && e.renderTvs( {
					list: t.tvs
				} )
			}
		} )
	},
	renderTvs: function ( t ) {
		var e = utils.renderHtml(
			'{{#list}}\n                <li class="li1 tv-show">\n                    <a href="/play/{{url}}" class="pos">\n                        <img src="/www/images/tv-loading.gif?id={{url}}}" realImg="" alt="">\n                        <em>{{info}}</em>\n                    </a>\n                    <i><img src="/www/images/vip.png" realImg="" alt=""></i>\n                    <p>{{title}}</p>\n                </li>\n                {{/list}}',
			t );
		document.getElementById( "tv_container" )
			.innerHTML = e
	},
	openConsoleOutput: function () {
		console.log("%c 欢迎光临VIP视频影院，海量VIP电影视频资源任你看！",
			"color: red;font-size: 24px;font-weight: bold;" ),
		console.log( "%cCrypto数字游民-VIP视频影院",
			" text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);background: rgba(252,234,187,1);background: -moz-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%,rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -webkit-gradient(left top, right top, color-stop(0%, rgba(252,234,187,1)), color-stop(12%, rgba(175,250,77,1)), color-stop(28%, rgba(0,247,49,1)), color-stop(39%, rgba(0,210,247,1)), color-stop(51%, rgba(0,189,247,1)), color-stop(64%, rgba(133,108,217,1)), color-stop(78%, rgba(177,0,247,1)), color-stop(87%, rgba(247,0,189,1)), color-stop(100%, rgba(245,22,52,1)));background: -webkit-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -o-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -ms-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: linear-gradient(to right, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fceabb', endColorstr='#f51634', GradientType=1 );font-size:5em"
		)
	}
}.init();
