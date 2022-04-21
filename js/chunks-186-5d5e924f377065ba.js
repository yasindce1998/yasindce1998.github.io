(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
	[186], {
		8159: function(e, t, n) {
			"use strict";
			n.d(t, {
				Z: function() {
					return h
				}
			});
			var r = n(8520),
				i = n.n(r),
				o = n(5893),
				a = n(7294),
				s = n(4184),
				c = n.n(s),
				l = n(6616),
				d = n(3790),
				u = n.n(d);

			function m(e, t, n, r, i, o, a) {
				try {
					var s = e[o](a),
						c = s.value
				} catch (l) {
					return void n(l)
				}
				s.done ? t(c) : Promise.resolve(c).then(r, i)
			}
			var h = function(e) {
				var t, n = e.className,
					r = e.animationDelay,
					s = e.animateIntoView,
					d = e.inverse,
					h = (0, a.useState)(!1),
					p = h[0],
					f = h[1],
					j = (t = i().mark((function e() {
						return i().wrap((function(e) {
							for (;;) switch (e.prev = e.next) {
								case 0:
									return e.next = 2, navigator.clipboard.writeText("hello@richardekwonye.com");
								case 2:
									setTimeout((function() {
										f(!0)
									}), 200);
								case 3:
								case "end":
									return e.stop()
							}
						}), e)
					})), function() {
						var e = this,
							n = arguments;
						return new Promise((function(r, i) {
							var o = t.apply(e, n);

							function a(e) {
								m(o, r, i, a, s, "next", e)
							}

							function s(e) {
								m(o, r, i, a, s, "throw", e)
							}
							a(void 0)
						}))
					});
				return (0, o.jsxs)(o.Fragment, {
					children: [(0, o.jsx)(l.Z, {
						onClick: j,
						className: c()(u().clipboardText, u().emailAddressBigText, n),
						text: "hello@richard",
						textTwo: "ekwonye.com",
						withAreaCursor: !0,
						animationDelay: r,
						animateIntoView: s,
						inverse: d,
						areaCursorLabel: p ? "Done!" : "Click to copy",
						areaCursorClassName: u().areaCursor,
						onAreaCursorExit: function() {
							f(!1)
						},
						srText: "hello@richardekwonye.com"
					}), (0, o.jsxs)("a", {
						className: u().emailToAddress,
						href: "mailto:hello@richardekwonye.com",
						children: [(0, o.jsx)(l.Z, {
							className: u().emailAddressBigText,
							text: "hello@",
							inverse: d,
							srText: "hello@richardekwonye.com"
						}), (0, o.jsx)(l.Z, {
							className: u().emailAddressBigText,
							text: "richard",
							inverse: d
						}), (0, o.jsx)(l.Z, {
							className: u().emailAddressBigText,
							text: "ekwonye",
							inverse: d
						}), (0, o.jsx)(l.Z, {
							className: u().emailAddressBigText,
							text: ".com",
							inverse: d
						})]
					})]
				})
			}
		},
		2907: function(e, t, n) {
			"use strict";
			n.d(t, {
				q0: function() {
					return O
				},
				VJ: function() {
					return N
				},
				hQ: function() {
					return C
				},
				ZP: function() {
					return R
				}
			});
			var r = n(5893),
				i = n(7294),
				o = n(6743),
				a = n(6616),
				s = n(5596),
				c = n(9346),
				l = n(3123),
				d = n(4184),
				u = n.n(d),
				m = n(8953),
				h = n.n(m),
				p = function(e) {
					var t = e.className;
					return (0, r.jsx)("div", {
						className: u()(h().clickArea, t),
						children: (0, r.jsx)("span", {
							className: h().title,
							children: (0, r.jsx)("span", {
								children: "See more"
							})
						})
					})
				},
				f = n(3935),
				j = n(8595),
				v = n(5160),
				g = n(2881);

			function _(e) {
				return function(e) {
					if (Array.isArray(e)) {
						for (var t = 0, n = new Array(e.length); t < e.length; t++) n[t] = e[t];
						return n
					}
				}(e) || function(e) {
					if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e)
				}(e) || function() {
					throw new TypeError("Invalid attempt to spread non-iterable instance")
				}()
			}
			var x = n(1057),
				y = n.n(x);

			function b(e, t) {
				return function(e) {
					if (Array.isArray(e)) return e
				}(e) || function(e, t) {
					var n = [],
						r = !0,
						i = !1,
						o = void 0;
					try {
						for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
					} catch (c) {
						i = !0, o = c
					} finally {
						try {
							r || null == s.return || s.return()
						} finally {
							if (i) throw o
						}
					}
					return n
				}(e, t) || function() {
					throw new TypeError("Invalid attempt to destructure non-iterable instance")
				}()
			}
			var w = function(e) {
					var t = e.name,
						n = e.link,
						o = e.description,
						a = e.client,
						c = e.role,
						l = e.year,
						d = e.modalBg,
						u = e.mediaUrls,
						m = e.onClose,
						h = (0, i.useRef)(null),
						p = (0, i.useRef)(null),
						x = (0, i.useRef)(null),
						w = (0, i.useState)((0, v.t)())[0],
						P = (0, i.useState)((0, g.r)() ? .4 : .8)[0],
						k = (0, i.useState)((0, g.r)() ? .1 : .5)[0];
					return (0, i.useEffect)((function() {
						document.body.style.overflow = "hidden";
						var e = b(function(e, t) {
							var n, r, i = e.current,
								o = i.parentElement,
								a = t.current,
								s = window.innerWidth,
								c = !1,
								l = function() {
									c = !0
								};
							if ((0, v.t)() && window.innerWidth < 769) return [l];
							var d = o.getBoundingClientRect().top,
								u = d,
								m = d,
								h = function() {
									var e = window.innerWidth >= 1228 ? 60 : 35,
										t = i.scrollWidth - window.innerWidth + window.innerHeight + e;
									r !== t && s === window.innerWidth && o.getBoundingClientRect().top < 0 && "undefined" === typeof n ? n = !0 : r !== t && (o.style.height = "".concat(t, "px"), r = t)
								};
							h();
							var p = function() {
								if (!c) {
									s = window.innerWidth, h(), m = o.getBoundingClientRect().top;
									var e = (u += .15 * (m - u)).toFixed(4);
									a.style.transform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,".concat(e, ",0,0,1)"), n && (a.lastChild.style.marginLeft = "".concat(-e, "px")), requestAnimationFrame(p)
								}
							};
							return p(), [l]
						}(h, p), 1)[0];
						return function() {
							document.body.style.overflow = "", e()
						}
					}), []), (0, i.useEffect)((function() {
						return b(function(e) {
							var t = _(e.current.querySelectorAll("a, button")),
								n = function(e) {
									"Tab" === e.key && (t.includes(document.activeElement) && document.activeElement !== t[t.length - 1] || (e.preventDefault(), t[0].focus()))
								};
							return window.addEventListener("keydown", n), [function() {
								window.removeEventListener("keydown", n)
							}]
						}(x), 1)[0]
					}), []), (0, i.useEffect)((function() {
						if (w) return location.hash = "#".concat(t), window.addEventListener("popstate", m),
							function() {
								window.removeEventListener("popstate", m)
							}
					}), []), (0, f.createPortal)((0, r.jsx)("section", {
						className: y().modal,
						style: {
							backgroundColor: d
						},
						children: (0, r.jsx)("div", {
							className: y().contentsContainer,
							children: (0, r.jsxs)("div", {
								ref: h,
								className: y().contents,
								children: [(0, r.jsx)("header", {
									ref: x,
									className: y().header,
									children: (0, r.jsxs)(j.Z, {
										className: y().headerGrid,
										animationDelay: P,
										animateIntoView: !1,
										children: [(0, r.jsx)("div", {
											className: y().headerTitle,
											children: "Case study"
										}), (0, r.jsx)("div", {
											className: y().headerLiveLink,
											children: (0, r.jsx)("a", {
												className: y().liveLink,
												href: n,
												target: "_blank",
												rel: "noreferrer",
												children: "Visit live link"
											})
										}), (0, r.jsx)("div", {
											className: y().headerProjectName,
											children: t
										}), (0, r.jsx)("button", {
											className: y().close,
											onClick: function() {
												w ? history.back() : m()
											},
											children: "Close"
										})]
									})
								}), (0, r.jsxs)("div", {
									className: y().body,
									children: [(0, r.jsxs)("div", {
										className: y().details,
										children: [(0, r.jsx)(s.ZP, {
											className: y().description,
											text: o,
											animationDelay: k,
											animateIntoView: !1,
											noTextTransform: !0
										}), (0, r.jsx)(j.Z, {
											animationDelay: P,
											animateIntoView: !1,
											className: y().bodyLiveLink,
											children: (0, r.jsx)("a", {
												className: y().liveLink,
												href: n,
												target: "_blank",
												rel: "noreferrer",
												children: "Visit live link"
											})
										}), (0, r.jsxs)(j.Z, {
											animationDelay: P,
											animateIntoView: !1,
											children: [(0, r.jsx)("h4", {
												children: "PROJECT INFO"
											}), (0, r.jsxs)("dl", {
												className: y().descriptionList,
												children: [a && (0, r.jsxs)("div", {
													className: y().descriptionBlock,
													children: [(0, r.jsx)("dt", {
														children: "Client"
													}), (0, r.jsx)("dd", {
														children: a
													})]
												}), (0, r.jsxs)("div", {
													className: y().descriptionBlock,
													children: [(0, r.jsx)("dt", {
														children: "Role"
													}), (0, r.jsx)("dd", {
														children: c
													})]
												}), (0, r.jsxs)("div", {
													className: y().descriptionBlock,
													children: [(0, r.jsx)("dt", {
														children: "Year"
													}), (0, r.jsx)("dd", {
														children: l
													})]
												})]
											})]
										})]
									}), (0, r.jsx)("div", {
										className: y().mediaContainer,
										children: (0, r.jsxs)("div", {
											ref: p,
											className: y().media,
											children: [u.map((function(e, t) {
												return (0, r.jsx)("img", {
													src: e,
													alt: ""
												}, t)
											})), (0, r.jsx)("div", {
												className: y().scrollWidthRetainer
											})]
										})
									}), (0, r.jsx)(j.Z, {
										animationDelay: P,
										animateIntoView: !1,
										className: y().mobileMediaContainer,
										children: u.map((function(e, t) {
											return (0, r.jsx)("img", {
												src: e,
												alt: ""
											}, t)
										}))
									})]
								})]
							})
						})
					}), document.body)
				},
				P = [{
					name: "Cruuunchify",
					title: "Cruuun",
					titleTwo: "chify",
					fullTitle: "Cruuunchify",
					shortDescription: "An analysis and discovery tool for spotify users",
					description: "A music streaming analysis and discovery tool built on Spotify's Web API. Cruunchify provides an appealing interactive experience leveraging users listening data.",
					role: "Product Engineering",
					year: "2020",
					coverPhotoUrl: "/images/cruuunchify-cover.jpg",
					link: "https://cruuunchify.com",
					modalBg: "#535E5A",
					mediaUrls: ["/images/cruuunchify-01.jpg", "/images/cruuunchify-02.jpg", "/images/cruuunchify-03.jpg", "/images/cruuunchify-04.jpg", "/images/cruuunchify-05.jpg"]
				}, {
					name: "Intelia",
					title: "Intelia",
					fullTitle: "Intelia",
					shortDescription: "Global tech team augmentation service of top-class talents",
					description: "Corporate website for Intelia, a tech team augumentation service provider.",
					client: "Intelia",
					role: "Front end development",
					year: "2017",
					coverPhotoUrl: "/images/intelia-cover.jpg",
					link: "https://intelia.io",
					modalBg: "#535c5c",
					mediaUrls: ["/images/intelia-01.jpg", "/images/intelia-02.jpg", "/images/intelia-03.jpg", "/images/intelia-04.jpg"]
				}],
				k = [{
					name: "Pension App",
					title: "Pension",
					titleTwo: "App",
					fullTitle: "Pension App",
					shortDescription: "Concept pension provider microsite",
					description: "A microsite showcasing stories of customers of a concept pension provider.",
					role: "Front end development",
					year: "2021",
					coverPhotoUrl: "/images/pension-app-cover.jpg",
					link: "https://apensionapp.richardekwonye.com",
					modalBg: "#564d4d",
					mediaUrls: ["/images/pension-app-01.jpg", "/images/pension-app-02.jpg", "/images/pension-app-03.jpg"]
				}, {
					name: "Controller",
					title: "Contro",
					titleTwo: "ller",
					fullTitle: "Controller",
					shortDescription: "An experiment using three JS basic geometries",
					description: "An experiment of DualShock 2 controller shapes using three JS basic geometries and a RectAreaLight.",
					role: "Front end development",
					year: "2021",
					coverPhotoUrl: "/images/controller-cover.jpg",
					link: "https://pscontrols.richardekwonye.com",
					modalBg: "#535E5A",
					mediaUrls: ["/images/controller-01.jpg", "/images/controller-02.jpg"]
				}, {
					name: "Game Dashboard",
					title: "Dash",
					titleTwo: "board",
					fullTitle: "Dashboard",
					shortDescription: "A concept video game dashboard interface",
					description: "A concept video game loading and interactive dashboard experience.",
					role: "Front end development",
					year: "2018",
					coverPhotoUrl: "/images/dashboard-cover.jpg",
					link: "https://gamedashboard-a3201.web.app",
					modalBg: "#535E5A",
					mediaUrls: ["/images/dashboard-01.jpg", "/images/dashboard-02.jpg"]
				}],
				C = P.length,
				N = k.length,
				T = n(4197),
				A = n.n(T);

			function M(e, t, n) {
				return t in e ? Object.defineProperty(e, t, {
					value: n,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : e[t] = n, e
			}

			function E(e) {
				for (var t = 1; t < arguments.length; t++) {
					var n = null != arguments[t] ? arguments[t] : {},
						r = Object.keys(n);
					"function" === typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(n).filter((function(e) {
						return Object.getOwnPropertyDescriptor(n, e).enumerable
					})))), r.forEach((function(t) {
						M(e, t, n[t])
					}))
				}
				return e
			}

			function S(e, t) {
				if (null == e) return {};
				var n, r, i = function(e, t) {
					if (null == e) return {};
					var n, r, i = {},
						o = Object.keys(e);
					for (r = 0; r < o.length; r++) n = o[r], t.indexOf(n) >= 0 || (i[n] = e[n]);
					return i
				}(e, t);
				if (Object.getOwnPropertySymbols) {
					var o = Object.getOwnPropertySymbols(e);
					for (r = 0; r < o.length; r++) n = o[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (i[n] = e[n])
				}
				return i
			}
			var O, I, D, L = function(e) {
				var t = e.title,
					n = e.titleTwo,
					d = e.fullTitle,
					u = e.shortDescription,
					m = e.coverPhotoUrl,
					h = S(e, ["title", "titleTwo", "fullTitle", "shortDescription", "coverPhotoUrl"]),
					f = (0, i.useState)(!1),
					j = f[0],
					v = f[1],
					g = (0, i.useState)(!1),
					_ = g[0],
					x = g[1],
					y = (0, i.useRef)(null),
					b = (0, i.useRef)(null),
					P = (0, i.useRef)(null),
					k = function() {
						v(!0)
					};
				return (0, i.useEffect)((function() {
					(0, c.pN)({
						elementRef: b,
						ancestorRef: y,
						top: 100
					})
				}), []), (0, r.jsxs)("div", {
					ref: y,
					className: A().project,
					children: [(0, r.jsx)("div", {
						className: A().details,
						children: (0, r.jsxs)("div", {
							ref: b,
							children: [(0, r.jsx)("h2", {
								children: (0, r.jsx)(a.Z, {
									text: t,
									textTwo: n,
									srText: d,
									onClick: k,
									elementType: a.H.BUTTON,
									onMouseEnter: function() {
										return x(!0)
									},
									onMouseLeave: function() {
										return x(!1)
									},
									withAreaCursor: !0
								})
							}), (0, r.jsx)(s.ZP, {
								className: A().shortDescription,
								text: u
							})]
						})
					}), (0, r.jsxs)("div", {
						ref: P,
						className: A().cover,
						onClick: k,
						children: [(0, r.jsx)(c.r7, {
							src: m,
							className: A().coverImage,
							containerClassName: A().coverImageContainer,
							scaleUp: _,
							scaleUpOnHover: !0
						}), (0, r.jsx)(l.Z, {
							areaRef: P
						}), (0, r.jsx)(p, {})]
					}), (0, r.jsx)(o.Z, {
						in: j,
						timeout: 680,
						classNames: {
							exitActive: A().projectModalExit
						},
						unmountOnExit: !0,
						children: (0, r.jsx)(w, E({
							onClose: function() {
								v(!1)
							}
						}, h))
					})]
				})
			};

			function Z(e, t, n) {
				return t in e ? Object.defineProperty(e, t, {
					value: n,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : e[t] = n, e
			}(I = O || (O = {}))[I.PROJECTS = 0] = "PROJECTS", I[I.LABS = 1] = "LABS";
			var B = (Z(D = {}, O.PROJECTS, P), Z(D, O.LABS, k), D),
				R = function(e) {
					var t = e.maxCount,
						n = e.projectsType,
						o = void 0 === n ? O.PROJECTS : n,
						a = (0, i.useMemo)((function() {
							return t ? B[o].slice(0, t) : B[o]
						}), [o, t]);
					return (0, r.jsx)(r.Fragment, {
						children: a.map((function(e) {
							return (0, r.jsx)(L, function(e) {
								for (var t = 1; t < arguments.length; t++) {
									var n = null != arguments[t] ? arguments[t] : {},
										r = Object.keys(n);
									"function" === typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(n).filter((function(e) {
										return Object.getOwnPropertyDescriptor(n, e).enumerable
									})))), r.forEach((function(t) {
										Z(e, t, n[t])
									}))
								}
								return e
							}({}, e), e.name)
						}))
					})
				}
		},
		4562: function(e, t, n) {
			"use strict";
			n.d(t, {
				Z: function() {
					return d
				}
			});
			var r = n(5893),
				i = n(9346),
				o = n(8595),
				a = n(5596),
				s = n(8159),
				c = n(2463),
				l = n.n(c),
				d = function(e) {
					var t = e.sectionNumber;
					return (0, r.jsx)("section", {
						className: l().sendMessageContainer,
						children: (0, r.jsxs)(i.ZP, {
							className: l().sendMessage,
							children: [(0, r.jsx)(o.Z, {
								children: (0, r.jsx)("h4", {
									children: "".concat(t, "/")
								})
							}), (0, r.jsx)(a.ZP, {
								className: l().titleTwo,
								elementType: a.Hd.HEADING,
								text: "Want to work together?"
							}), (0, r.jsx)(a.ZP, {
								className: l().titleThree,
								elementType: a.Hd.HEADING,
								text: "Send me a message"
							}), (0, r.jsx)("div", {
								className: l().emailAddress,
								children: (0, r.jsx)(s.Z, {})
							})]
						})
					})
				}
		},
		2881: function(e, t, n) {
			"use strict";
			n.d(t, {
				r: function() {
					return r
				}
			});
			var r = function() {
				return window.innerWidth < 992
			}
		},
		3790: function(e) {
			e.exports = {
				emailAddressBigText: "EmailAddress_emailAddressBigText__RQOXb",
				clipboardText: "EmailAddress_clipboardText__A9AQN",
				areaCursor: "EmailAddress_areaCursor__GPWnN",
				emailToAddress: "EmailAddress_emailToAddress__xUSpW"
			}
		},
		8953: function(e) {
			e.exports = {
				clickArea: "MobileClickArea_clickArea__0EkJ8",
				title: "MobileClickArea_title__wHNIU"
			}
		},
		1057: function(e) {
			e.exports = {
				modal: "ProjectModal_modal__VjiVT",
				"mask-in": "ProjectModal_mask-in__eV_G0",
				contentsContainer: "ProjectModal_contentsContainer___CaqQ",
				contents: "ProjectModal_contents__qVETx",
				header: "ProjectModal_header__33oEx",
				headerGrid: "ProjectModal_headerGrid__SZFcD",
				headerTitle: "ProjectModal_headerTitle__zezrX",
				headerLiveLink: "ProjectModal_headerLiveLink__PZYkI",
				liveLink: "ProjectModal_liveLink__jSv8K",
				headerProjectName: "ProjectModal_headerProjectName__I4DGm",
				close: "ProjectModal_close__dk9kP",
				body: "ProjectModal_body__IrIxk",
				details: "ProjectModal_details__UJbPZ",
				bodyLiveLink: "ProjectModal_bodyLiveLink__2X2iw",
				description: "ProjectModal_description__P_FCN",
				descriptionList: "ProjectModal_descriptionList__xpO2Z",
				"border-stretch": "ProjectModal_border-stretch__yq_GW",
				descriptionBlock: "ProjectModal_descriptionBlock__q5y7C",
				mediaContainer: "ProjectModal_mediaContainer__snbYP",
				mobileMediaContainer: "ProjectModal_mobileMediaContainer__F8pCq",
				media: "ProjectModal_media__tE6RT",
				scrollWidthRetainer: "ProjectModal_scrollWidthRetainer__pL_N2"
			}
		},
		4197: function(e) {
			e.exports = {
				project: "Projects_project__pDp93",
				details: "Projects_details__GJT_w",
				shortDescription: "Projects_shortDescription__4w1hl",
				cover: "Projects_cover__fNsXU",
				coverImageContainer: "Projects_coverImageContainer__oSy9P",
				coverImage: "Projects_coverImage__ZOH5x",
				projectModalExit: "Projects_projectModalExit__xmfbQ"
			}
		},
		2463: function(e) {
			e.exports = {
				sendMessageContainer: "SendMessage_sendMessageContainer__fBfMs",
				sendMessage: "SendMessage_sendMessage__OYfSR",
				titleTwo: "SendMessage_titleTwo__TvQFW",
				titleThree: "SendMessage_titleThree__eIISc",
				emailAddress: "SendMessage_emailAddress__1pGDa"
			}
		}
	}
]);
//# sourceMappingURL=186-5d5e924f377065ba.js.map