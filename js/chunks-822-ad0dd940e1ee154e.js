(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
	[822], {
		5596: function(e, n, t) {
			"use strict";
			t.d(n, {
				Hd: function() {
					return i
				},
				$u: function() {
					return r
				},
				ZP: function() {
					return A
				}
			});
			var r, i, a, o = t(5893),
				s = t(7294),
				c = t(4184),
				u = t.n(c);
			(r || (r = {})).LG = "lg", (a = i || (i = {}))[a.PARAGRAPH = 0] = "PARAGRAPH", a[a.HEADING = 1] = "HEADING", a[a.SPAN = 2] = "SPAN";
			var l = t(4050),
				f = t.n(l);
			var d, m, v, _ = (d = {}, m = r.LG, v = f().lg, m in d ? Object.defineProperty(d, m, {
				value: v,
				enumerable: !0,
				configurable: !0,
				writable: !0
			}) : d[m] = v, d);

			function p(e) {
				return function(e) {
					if (Array.isArray(e)) {
						for (var n = 0, t = new Array(e.length); n < e.length; n++) t[n] = e[n];
						return t
					}
				}(e) || function(e) {
					if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e)
				}(e) || function() {
					throw new TypeError("Invalid attempt to spread non-iterable instance")
				}()
			}

			function g(e, n, t) {
				return n in e ? Object.defineProperty(e, n, {
					value: t,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : e[n] = t, e
			}
			var A = function(e) {
				var n = e.text,
					t = e.className,
					r = e.animationDelay,
					a = e.size,
					c = e.animateIntoView,
					l = void 0 === c || c,
					d = e.intersectionThreshold,
					m = e.intersectionRootMargin,
					v = e.elementType,
					A = e.noTextTransform,
					x = (0, s.useState)(!1),
					h = x[0],
					b = x[1],
					C = (0, s.useMemo)((function() {
						return n.split(" ")
					}), [n]),
					w = (0, s.useState)(C)[0],
					y = a && _[a],
					L = (0, s.useRef)(null),
					T = (0, o.jsxs)(o.Fragment, {
						children: [C.map((function(e, n) {
							return (0, o.jsxs)("span", {
								className: u()(g({}, f().passive, !h)),
								children: [e, n < C.length - 1 && " "]
							}, n)
						})), !h && (0, o.jsx)("span", {
							className: f().animatedLines,
							"aria-hidden": "true"
						})]
					}),
					E = function() {
						b(!0)
					};
				return (0, s.useEffect)((function() {
					C === w || h || E()
				}), [C]), (0, s.useEffect)((function() {
					! function(e) {
						var n, t, r = e.containerRef,
							i = e.staticReset,
							a = e.animationDelay,
							o = void 0 === a ? 0 : a,
							s = e.animateIntoView,
							c = e.intersectionThreshold,
							u = void 0 === c ? .2 : c,
							l = e.intersectionRootMargin,
							f = r.current,
							d = p(f.children),
							m = d.pop(),
							v = 0,
							_ = new IntersectionObserver((function(e) {
								e.forEach((function(e) {
									e.isIntersecting || g()
								}))
							})),
							g = function() {
								window.removeEventListener("resize", g), _.unobserve(f), i()
							},
							A = function() {
								d.forEach((function(e, r) {
									var i = e,
										a = i.offsetTop;
									if (n !== a) {
										var s = i.offsetHeight;
										n = a, (t = document.createElement("span")).style.top = "".concat(a, "px"), t.style.height = "".concat(s, "px"), v++, m.appendChild(t)
									}
									var c = document.createElement("span");
									c.innerHTML = i.innerHTML, c.style.left = "".concat(i.offsetLeft, "px"), c.style.animationDelay = "".concat(o + .07 * v, "s"), r === d.length - 1 && (c.onanimationend = function() {
										_.observe(f), window.addEventListener("resize", g)
									}), t.appendChild(c)
								}))
							};
						if (s) {
							var x = new IntersectionObserver((function(e) {
								e.forEach((function(e) {
									e.isIntersecting && (A(), x.unobserve(f))
								}))
							}), {
								threshold: u,
								rootMargin: l
							});
							x.observe(f)
						} else A()
					}({
						containerRef: L,
						staticReset: E,
						animationDelay: r,
						animateIntoView: l,
						intersectionThreshold: d,
						intersectionRootMargin: m
					})
				}), []), v === i.HEADING ? (0, o.jsx)("h4", {
					ref: L,
					className: u()(f().animatedLinesContainer, t, y, g({}, f().noTextTransform, A)),
					children: T
				}) : v === i.SPAN ? (0, o.jsx)("span", {
					ref: L,
					className: u()(f().animatedLinesContainer, t, y, g({}, f().noTextTransform, A)),
					children: T
				}) : (0, o.jsx)("p", {
					ref: L,
					className: u()(f().animatedLinesContainer, t, y, g({}, f().noTextTransform, A)),
					children: T
				})
			}
		},
		3123: function(e, n, t) {
			"use strict";
			t.d(n, {
				A: function() {
					return r
				},
				Z: function() {
					return A
				}
			});
			var r, i, a = t(5893),
				o = t(7294),
				s = t(3935),
				c = t(4184),
				u = t.n(c);
			(i = r || (r = {}))[i.CLICK = 0] = "CLICK", i[i.DRAG = 1] = "DRAG";
			var l, f = t(6211),
				d = t.n(f);

			function m(e, n, t) {
				return n in e ? Object.defineProperty(e, n, {
					value: t,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : e[n] = t, e
			}
			var v, _ = function(e) {
				var n = e.mode,
					t = e.initialPosition,
					i = e.clicked,
					s = e.fading,
					c = e.label,
					f = e.className,
					v = (0, o.useRef)(null);
				return (0, o.useEffect)((function() {
					s ? (document.body.style.cursor = "", document.body.style.userSelect = "") : (document.body.style.cursor = "none", document.body.style.userSelect = "none")
				}), [s]), (0, o.useEffect)((function() {
					! function(e) {
						var n = e.cursorRef,
							t = e.initialPosition,
							r = t.x,
							i = t.y,
							a = n.current;
						a.style.transform = "translate3d(".concat(r, "px, ").concat(i, "px, 0)"), window.addEventListener("mousemove", (function(e) {
							a.style.transform = "translate3d(".concat(e.clientX, "px, ").concat(e.clientY, "px, 0)")
						}))
					}({
						cursorRef: v,
						initialPosition: t
					})
				}), []), (0, a.jsx)("div", {
					ref: v,
					className: u()(d().cursor, f, (l = {}, m(l, d().fading, s), m(l, d().clicked, i && n === r.CLICK), m(l, d().dragging, i && n === r.DRAG), l)),
					children: (0, a.jsx)("span", {
						className: d().wrapper,
						children: (0, a.jsx)("span", {
							className: d().cursorRing,
							children: (0, a.jsx)("span", {
								children: c
							})
						})
					})
				})
			};

			function p(e, n, t) {
				return n in e ? Object.defineProperty(e, n, {
					value: t,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : e[n] = t, e
			}
			var g = (p(v = {}, r.CLICK, "See more"), p(v, r.DRAG, "Drag me"), v),
				A = function(e) {
					var n = e.areaRef,
						t = e.label,
						i = e.className,
						c = e.mode,
						u = void 0 === c ? r.CLICK : c,
						l = e.onCursorExit,
						f = (0, o.useState)({
							x: 0,
							y: 0
						}),
						d = f[0],
						m = f[1],
						v = (0, o.useState)(!1),
						p = v[0],
						A = v[1],
						x = (0, o.useState)(!1),
						h = x[0],
						b = x[1],
						C = (0, o.useState)(!1),
						w = C[0],
						y = C[1],
						L = (0, o.useRef)(),
						T = function(e) {
							L.current && clearTimeout(L.current), m(e), A(!0), y(!1)
						},
						E = function() {
							b(!1), y(!0), L.current && clearTimeout(L.current), L.current = setTimeout((function() {
								A(!1), l && l()
							}), 500)
						},
						R = function() {
							if (u === r.CLICK) return b(!1), void setTimeout((function() {
								return b(!0)
							}), 0);
							b(!0)
						},
						N = function() {
							b(!1)
						};
					return (0, o.useEffect)((function() {
						! function(e) {
							var n = e.areaRef,
								t = e.mode,
								i = e.onEnter,
								a = e.onLeave,
								o = e.onClick,
								s = e.onDragEnd,
								c = t === r.DRAG,
								u = !1,
								l = n.current,
								f = function(e) {
									s(), u = !1;
									var n = l.getBoundingClientRect(),
										t = n.x,
										r = n.x + n.width,
										i = n.y,
										o = n.y + n.height;
									(e.clientX < t || e.clientX > r || e.clientY < i || e.clientY > o) && a(), window.removeEventListener("contextmenu", f), window.removeEventListener("mouseup", f)
								};
							l.addEventListener("mouseenter", (function(e) {
								i({
									x: e.clientX,
									y: e.clientY
								})
							})), l.addEventListener("mouseleave", (function() {
								c && u || a()
							})), l.addEventListener("mousedown", (function() {
								c && (u = !0, window.addEventListener("contextmenu", f), window.addEventListener("mouseup", f)), o()
							}))
						}({
							areaRef: n,
							mode: u,
							onEnter: T,
							onLeave: E,
							onClick: R,
							onDragEnd: N
						})
					}), []), p ? (0, s.createPortal)((0, a.jsx)(_, {
						mode: u,
						initialPosition: d,
						clicked: h,
						fading: w,
						label: t || g[u],
						className: i
					}), document.body) : null
				}
		},
		6616: function(e, n, t) {
			"use strict";
			t.d(n, {
				H: function() {
					return r
				},
				Z: function() {
					return g
				}
			});
			var r, i, a = t(5893),
				o = t(7294),
				s = t(4184),
				c = t.n(s),
				u = t(2336),
				l = t(3123),
				f = t(5160);
			(i = r || (r = {}))[i.BUTTON = 0] = "BUTTON", i[i.SPAN = 1] = "SPAN";
			var d, m, v = t(3633),
				_ = t.n(v);

			function p(e, n, t) {
				return n in e ? Object.defineProperty(e, n, {
					value: t,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : e[n] = t, e
			}
			var g = function(e) {
				var n = e.text,
					t = e.textTwo,
					i = e.onClick,
					s = e.onMouseEnter,
					v = e.onMouseLeave,
					g = e.className,
					A = e.srText,
					x = e.elementType,
					h = e.withAreaCursor,
					b = e.areaCursorLabel,
					C = e.areaCursorClassName,
					w = e.onAreaCursorExit,
					y = e.animationDelay,
					L = e.animateIntoView,
					T = void 0 === L || L,
					E = e.inverse,
					R = (0, o.useState)((0, f.t)() ? 43 : 110)[0],
					N = (0, o.useState)(!1),
					j = N[0],
					S = N[1],
					I = (0, o.useRef)(null),
					P = (0, a.jsxs)(a.Fragment, {
						children: [(0, a.jsx)(u.Z, {
							text: n,
							snapOnAnimationEnd: function() {
								S(!0)
							},
							withoutSrText: !A,
							srText: A
						}), t && (0, a.jsxs)(a.Fragment, {
							children: [(0, a.jsx)("span", {
								className: _().textsSeperator
							}), (0, a.jsx)(u.Z, {
								text: t,
								intersectionThreshold: 0,
								intersectionRootMargin: "".concat(R, "px"),
								animationDelay: y,
								animateIntoView: T,
								withoutSrText: !0
							})]
						}), h && (0, a.jsx)(l.Z, {
							areaRef: I,
							label: b,
							className: C,
							onCursorExit: w
						})]
					});
				return x === r.BUTTON ? (0, a.jsx)("button", {
					ref: I,
					className: c()(_().bigActionBtn, p({}, _().withAreaCursor, h)),
					onClick: i,
					onMouseEnter: s,
					onMouseLeave: v,
					children: (0, a.jsx)("span", {
						className: c()(_().bigAction, g, (d = {}, p(d, _().passive, !j), p(d, _().inverse, E), d)),
						children: P
					})
				}) : (0, a.jsx)("span", {
					ref: I,
					className: c()(_().bigAction, g, (m = {}, p(m, _().passive, !j), p(m, _().inverse, E), m)),
					onClick: i,
					onMouseEnter: s,
					onMouseLeave: v,
					children: P
				})
			}
		},
		4050: function(e) {
			e.exports = {
				animatedLinesContainer: "AnimatedLines_animatedLinesContainer__V8RIA",
				noTextTransform: "AnimatedLines_noTextTransform__x4_R_",
				animatedLines: "AnimatedLines_animatedLines__8Sjl9",
				"chars-in": "AnimatedLines_chars-in__dJfId",
				lg: "AnimatedLines_lg__4PKwl",
				passive: "AnimatedLines_passive__0rMRA"
			}
		},
		6211: function(e) {
			e.exports = {
				cursor: "AreaCursor_cursor__tOUSC",
				clicked: "AreaCursor_clicked___ZULI",
				"click-spring": "AreaCursor_click-spring__lMB8f",
				dragging: "AreaCursor_dragging__atwdh",
				fading: "AreaCursor_fading__9aj2e",
				wrapper: "AreaCursor_wrapper__u4r_R",
				cursorRing: "AreaCursor_cursorRing__ATTaA",
				"cursor-ring-in": "AreaCursor_cursor-ring-in__ci8zt",
				"label-in": "AreaCursor_label-in__lv0pR"
			}
		},
		3633: function(e) {
			e.exports = {
				bigAction: "BigAction_bigAction__1_x13",
				passive: "BigAction_passive__lAA3y",
				bigActionBtn: "BigAction_bigActionBtn__wrKRN",
				withAreaCursor: "BigAction_withAreaCursor__ahdaZ",
				inverse: "BigAction_inverse__IujKE",
				textsSeperator: "BigAction_textsSeperator__DG3xy"
			}
		}
	}
]);
//# sourceMappingURL=822-ad0dd940e1ee154e.js.map