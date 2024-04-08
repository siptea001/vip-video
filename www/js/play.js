"use strict";

const config = require('../../config');

! function () {
	function o ( t, n ) {
		var e = "con" + +new Date,
			o = '<span class="video-comment" id="' + e + '" style="top:' + ( Math.floor( 400 * Math.random() ) + "px" ) + "; font-size: 18px; color: " +
			function () {
				for ( var t = "", e = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f" ], o = 0; o < 6; o++ ) {
					if ( t += "" + e[ Math.ceil( 15 * Math.random() ) ], 5 === o ) return "#" + t
				}
			}() + '; right: -50px;">' + t + "</span>",
			c = $( "#video-top" )
			.html()
			.trim();
		$( "#video-top" )
			.html( c + o ), $.animate( "#" + e, {
				left: "-1500px"
			}, 15e3, "linear" ), document.onkeydown = function ( t ) {
				var e = t || window.event || arguments.callee.caller.arguments[ 0 ];
				if ( e && 13 == e.keyCode ) {
					var o = $( "#content" )
						.val();
					if ( !o || "" === o ) return;
					if ( "rgb(255, 0, 0)" !== $( "#status" )
						.css( "backgroundColor" ) ) return;
					$( "#content" )
						.val( "" ), n.emit( "publish", o )
				}
			}
	}
	window.onload = function () {
		var t = io.connect( `http://${config.host}:${config.port}` );
		t.emit( "foo", "login" ), c( t ), $( "#commit-comment" )
			.on( "click", function ( t ) {
				var e = $( "#comment-form" )
					.get( 0 ),
					o = $( "#comment-text" )
					.html(),
					n = e.action,
					c = window.location.href,
					a = e.method;
				$.isString( o ) && $.ajax( {
					url: n,
					type: a,
					dataType: "json",
					data: $.serialize( "comment-form" ),
					success: function ( t ) {
						t && 1 === t.code && setTimeout( function () {
							window.location.href = c, $( "#comment-text" )
								.html( "" )
						}, 1e3 )
					}
				} )
			} ), $( "#comments-page li" )
			.on( "click", function ( t ) {
				$.preventDefault( t );
				var e = $( $.getTarget( t ) )
					.text(),
					o = $( "#pageNow" )
					.text(),
					n = $( "#pageNum" )
					.text();
				switch ( n = $.isString( n ) ? parseInt( n ) : n, o = $.isString( o ) ? parseInt( o ) : o, e ) {
					case "首页":
						o = 1;
						break;
					case "上一页":
						1 < o && ( o -= 1 );
						break;
					case "下一页":
						o < n && ( o += 1 );
						break;
					case "尾页":
						o = n
				}
				$( "#pageNow" )
					.html( o ), $.ajax( {
						url: "/comment/" + o,
						type: "GET",
						dataType: "json",
						data: "",
						success: function ( t ) {
							if ( t && 1 === t.code ) {
								for ( var e, o = t.comments, n = 0, c = o.length, a = ""; n < c; n++ ) a +=
									'<div class="comment-content">\n                    <div class="userlogo">\n                        <img src="' +
									( e = o[ n ] )
									.face +
									'" alt="">\n                    </div>\n                    <div class="usercontent">\n                        <div class="usercontent-title">\n                            <a href="/login">' +
									e.uname + "</a><span>评论于 " + e.addtime +
									'</span>\n                        </div>\n                        <div class="usercontent-con">\n                            ' +
									e.content + "\n                        </div>\n                    </div>\n                </div>";
								$( "#comments" )
									.html( a )
							}
						}
					} )
			} ), $( ".toggleMovie" )
			.on( "click", function ( t ) {
				t.preventDefault(), $.ajax( {
					url: "/play/current/0",
					type: "GET",
					success: function ( t ) {
						if ( t && 1 === t.code ) {
							var e = t.movie;
							window.location.href = "/play/" + e[ 0 ].url
						}
					}
				} )
			} ), $( "#select-interface" )
			.on( "change", function () {
				var t = $( "#select-interface" )
					.get( 0 )
					.options,
					e = t.selectedIndex,
					o = t[ e ].value,
					n = window.location.href;
				n = "http://www.iqiyi.com/" + n.substr( n.lastIndexOf( "/" ) + 1 );
				switch (o) {
					case "02":
						document.getElementById( "video_iframe" ).src = "https://jx.xyflv.cc/?url=" + n;
						break;
					case "03":
						// document.getElementById( "video_iframe" ).src = "https://vip.wpsseo.cn/jx/?url=" + n;
						// break;
					case "04":
						// document.getElementById( "video_iframe" ).src = "https://jx.nnxv.cn/tv.php?url=" + n;
						// break;
					case "05":
						document.getElementById( "video_iframe" ).src = "https://www.yemu.xyz/?url=" + n;
						break;
					case "06":
						// document.getElementById( "video_iframe" ).src = "https://www.ckplayer.vip/jiexi/?url=" + n;
						// break;
					case "07":
						document.getElementById( "video_iframe" ).src = "https://jx.mmkv.cn/tv.php?url=" + n;
						break;
					case "08":
						// document.getElementById( "video_iframe" ).src = "https://jx.xmflv.com/?url= " + n;
						// break;
					default:
						document.getElementById( "video_iframe" ).src = "https://jx.aidouer.net/?url=" + n;
						break;
				}
				// 0 < e ? ( "02" === o && ( document.getElementById( "video_iframe" )
				// 	.src = "https://jx.xyflv.cc/?url=" + n ), "03" === o && ( document.getElementById( "video_iframe" )
				// 	.src = "https://vip.wpsseo.cn/jx/?url=" + n ) ) : "01" === o && ( document.getElementById( "video_iframe" )
				// 	.src = "https://jx.aidouer.net/?url=" + n )
			} ), $( "#collect-movie" )
			.on( "click", function ( t ) {
				t.preventDefault();
				var e = window.location.href.toString(),
					o = e.substring( e.lastIndexOf( "/" ) + 1 );
				"收藏电影" === $( "#collect-movie" )
					.text()
					.trim() ? $.ajax( {
						url: "/play/colmovie/0",
						type: "POST",
						data: {
							url: o
						},
						success: function ( t ) {
							t && 1 === t.code && $( "#collect-movie" )
								.html( "取消收藏" )
						}
					} ) : "取消收藏" === $( "#cancel-movie" )
					.text() && $.ajax( {
						url: "/play/colmovie/1",
						type: "POST",
						data: {
							url: o
						},
						success: function ( t ) {
							t && 1 === t.code && $( "#cancel-movie" )
								.html( "收藏电影" )
						}
					} )
			} ), $( "#cancel-movie" )
			.on( "click", function ( t ) {
				t.preventDefault();
				var e = window.location.href.toString(),
					o = e.substring( e.lastIndexOf( "/" ) + 1 );
				"取消收藏" === $( "#cancel-movie" )
					.text()
					.trim() ? $.ajax( {
						url: "/play/colmovie/1",
						type: "POST",
						data: {
							url: o
						},
						success: function ( t ) {
							t && 1 === t.code && $( "#cancel-movie" )
								.html( "收藏电影" )
						}
					} ) : "收藏电影" === $( "#cancel-movie" )
					.text()
					.trim() && $.ajax( {
						url: "/play/colmovie/0",
						type: "POST",
						data: {
							url: o
						},
						success: function ( t ) {
							t && 1 === t.code && $( "#cancel-movie" )
								.html( "取消收藏" )
						}
					} )
			} ),
			function ( e ) {
				$( "#danmu-group" )
					.on( "click", function ( t ) {
						$.preventDefault( t ), $( "#status" )
							.hasClass( "danmu-open" ) ? ( $( "#status" )
								.removeClass( "danmu-open" ), $( "#video-top" )
								.css( "opacity", "0" ), $( "#status" )
								.css( "backgroundColor", "" ), $( "#video-top" )
								.html( "" ) ) : ( $( "#status" )
								.addClass( "danmu-open" ), $( "#video-top" )
								.show(), $( "#video-top" )
								.css( "opacity", "1" ) )
					} ), $( "#commitButton" )
					.on( "click", function () {
						var t = $( "#content" )
							.val();
						t && "" !== t && "rgb(255, 0, 0)" === $( "#status" )
							.css( "backgroundColor" ) && ( $( "#content" )
								.val( "" ), e.emit( "publish", t ) )
					} ), c( e )
			}( t ), setTimeout( function () {
				$( "#status" )
					.css( "backgroundColor", "red" ), $( "#video-top" )
					.show(), $( "#video-top" )
					.css( "opacity", "1" ), $( "#video-top" )
					.html( "" )
			}, 2e4 )
	};
	var n = 0;

	function c ( e ) {
		e.on( "system", function ( t, e ) {
			switch ( t ) {
				case "num":
					$( "#usernum" )
						.html( e )
			}
		} ), e.on( "message", function ( t ) {
			1 !== n ? ( o( t, e ), n++ ) : n = 0
		} ), e.on( "loginsuccess", function ( t ) {
			$( "#usernum" )
				.html( t ), $( "#usernummovie" )
				.html( t )
		} )
	}
}();
