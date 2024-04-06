"use strict";
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function ( t ) {
	return typeof t
} : function ( t ) {
	return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
};
( {
	init: function () {
		this._bindEvents()
	},
	_bindEvents: function () {
		this._bindFooterEvents(), this._bindProgressBarEvents(), this._bindInstallEvents(), this._bindSearchContentsEvents(), this.openConsoleOutput()
	},
	_bindFooterEvents: function () {
		$( "#lastlogo dd" )
			.on( "mouseover", function ( t ) {
				switch ( $( $.getTarget( t ) )
					.text() ) {
					case "微信":
						$( "#imgshow" )
							.css( "right", "126px" )
							.show();
						break;
					case "QQ群":
						$( "#imgshow" )
							.css( "right", "63px" )
							.show();
						break;
					case "新浪":
						$( "#imgshow" )
							.css( "right", "0px" )
							.show();
						break;
					case "邮箱":
						$( "#imgshow" )
							.css( "right", "-63px" )
							.show()
				}
			} )
			.on( "mouseout", function () {
				$( "#imgshow" )
					.hide()
			} )
	},
	_bindProgressBarEvents: function () {
		function t ( t ) {
			this.progress = t, this.prg = 0, this.width = document.documentElement.clientWidth, this.timer = 0
		}
		t.prototype = {
				start: function () {
					var t = this;
					t.onchange(), t.timer = setInterval( function () {
						t.prg >= t.random( [ 40, 80 ] ) ? clearInterval( t.timer ) : t.prg += t.random( 3 ), t.progress.style.width = t.prg /
							100 * t.width + "px"
					}, 15 )
				},
				onchange: function () {
					var t = this;
					document.onreadystatechange = function () {
						"complete" === document.readyState && ( clearInterval( t.timer ), setInterval( function () {
							100 <= t.prg ? ( clearInterval( t.timer ), t.prg = 100, t.progress.style.display = "none" ) : t.prg +=
								t.random( 1 ), t.progress.style.width = t.prg / 100 * t.width + "px"
						}, 5 ) )
					}
				},
				random: function ( t ) {
					if ( "object" !== ( void 0 === t ? "undefined" : _typeof( t ) ) ) return Math.random() * t;
					var r = t[ 1 ] - t[ 0 ];
					return Math.random() * r * 10 + t[ 0 ]
				}
			}, new t( document.getElementById( "progress" ) )
			.start()
	},
	_bindInstallEvents: function () {
		$( "#btn-submit" )
			.on( "click", function ( t ) {
				t.preventDefault();
				var r = $( "#dbname" )
					.val(),
					o = $( "#dbip" )
					.val(),
					e = $( "#username" )
					.val(),
					n = $( "#pwd" )
					.val();
				return "string" != typeof r || 0 === r.length ? ( $( "#dbname" )
					.get( 0 )
					.focus(), $( "#btn-submit" )
					.text( "立即安装" ), alert( "数据库名不能为空" ) ) : "string" != typeof o || 0 === o.length ? ( $( "#dbip" )
					.get( 0 )
					.focus(), $( "#btn-submit" )
					.text( "立即安装" ), alert( "数据库IP地址不能为空" ) ) : "string" != typeof e || 0 === e.length ? ( $( "#username" )
					.get( 0 )
					.focus(), $( "#btn-submit" )
					.text( "立即安装" ), alert( "数据库用户名不能为空" ) ) : "string" != typeof n || 0 === n.length ? ( $( "#pwd" )
					.get( 0 )
					.focus(), $( "#btn-submit" )
					.text( "立即安装" ), alert( "数据库用户密码不能为空" ) ) : ( $( "#btn-submit" )
					.text( "正在安装……" ), void $.ajax( {
						url: "/install",
						type: "POST",
						data: {
							dbname: r,
							dbip: o,
							username: e,
							password: n
						},
						dataType: "json",
						success: function ( t ) {
							if ( -1 === t.status ) {
								if ( t.msg.code ) return $( "#btn-submit" )
									.text( "立即安装" ), alert( "出错了：连接数据库服务器失败，请检查MySQL数据库服务是否已经启动，或数据库主机配置是否正确！" );
								if ( 0 < t.msg.indexOf( "database" ) ) return $( "#btn-submit" )
									.text( "立即安装" ), alert( "数据库名不存在（未知的数据库名）！" );
								$( "#btn-submit" )
									.text( "立即安装" ), alert( "出错了:" + t.msg + "\n(数据库用户名或密码不正确)！" )
							} else if ( 1 === t.status ) var r = 4,
								o = setInterval( function () {
									r--, $( "#btn-submit" )
										.text( "安装成功，正准备跳转首页……" + r + "s" ), 0 === r && ( clearInterval( o ), window.location.href =
											"/" )
								}, 1e3 )
						}
					} ) )
			} )
	},
	_bindSearchContentsEvents: function () {
		$( "#intheater" )
			.on( "click", function () {
				$( "#intheater" )
					.css( "color", "red" )
					.css( "font-weight", "bold" ), $( "#coming" )
					.css( "color", "black" ), $( "#top250" )
					.css( "color", "black" )
			} ), $( "#coming" )
			.on( "click", function () {
				$( "#intheater" )
					.css( "color", "black" ), $( "#coming" )
					.css( "color", "red" )
					.css( "font-weight", "bold" ), $( "#top250" )
					.css( "color", "black" )
			} ), $( "#top250" )
			.on( "click", function () {
				$( "#intheater" )
					.css( "color", "black" ), $( "#coming" )
					.css( "color", "black" ), $( "#top250" )
					.css( "color", "red" )
					.css( "font-weight", "bold" )
			} )
	},
	openConsoleOutput: function () {
		console.log("%c 欢迎光临VIP视频影院，海量VIP电影视频资源任你看！",
			"color: red;font-size: 24px;font-weight: bold;" ),
		console.log( "%cCrypto数字游民-VIP视频影院",
			" text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);background: rgba(252,234,187,1);background: -moz-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%,rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -webkit-gradient(left top, right top, color-stop(0%, rgba(252,234,187,1)), color-stop(12%, rgba(175,250,77,1)), color-stop(28%, rgba(0,247,49,1)), color-stop(39%, rgba(0,210,247,1)), color-stop(51%, rgba(0,189,247,1)), color-stop(64%, rgba(133,108,217,1)), color-stop(78%, rgba(177,0,247,1)), color-stop(87%, rgba(247,0,189,1)), color-stop(100%, rgba(245,22,52,1)));background: -webkit-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -o-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -ms-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: linear-gradient(to right, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fceabb', endColorstr='#f51634', GradientType=1 );font-size:5em"
		)
	}
} )
.init();
