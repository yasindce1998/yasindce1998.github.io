(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
	[405], {
		5301: function(e, n, t) {
			(window.__NEXT_P = window.__NEXT_P || []).push(["/", function() {
				return t(6313)
			}])
		},
		6313: function(e, n, t) {
			"use strict";
			t.r(n), t.d(n, {
				default: function() {
					return G
				}
			});
			var o = t(5893),
				a = t(7294),
				i = t(9346),
				r = t(5596),
				s = t(2336),
				l = t(4184),
				c = t.n(l),
				m = t(3123),
				d = function(e, n) {
					var t, o, a, i, r, s = e.current,
						l = s.firstChild,
						c = s.parentElement,
						m = n.current,
						d = !1,
						u = !1,
						h = 22,
						_ = function() {
							if (s && c) {
								if (!d && 0 === Math.floor(a) && 22 === Math.floor(h)) return c.style.clipPath = "", void(s.style.transform = "");
								d ? a += .1 * (o - a) : a -= .1 * (a - 0);
								var e = Math.min(Math.max(h, 0), 22).toFixed(4),
									n = (r - a).toFixed(4),
									t = a.toFixed(4);
								c.style.clipPath = "inset(".concat(e, "px ").concat(n, "px ").concat(e, "px ").concat(t, "px)");
								var i = (-a / r * 15).toFixed(4);
								s.style.transform = "translate3d(".concat(i, "%, 0px, 0px)"), requestAnimationFrame(_)
							}
						},
						x = function() {
							!d || Math.floor(h) < 0 || (h -= .05 * (h + 1), requestAnimationFrame(x))
						},
						f = function() {
							d || 22 === Math.floor(h) || (h += .05 * (23 - h), requestAnimationFrame(f))
						},
						p = function() {
							s.style.willChange = "", l.style.willChange = "", c.style.willChange = ""
						},
						v = function(e) {
							var n = c.offsetWidth - i,
								a = .2 * n;
							o = Math.min(Math.max(0, e.clientX - t), n - a)
						},
						j = function() {
							d = !1, l.style.transform = "", requestAnimationFrame(f), u || p(), window.removeEventListener("mousemove", v), window.removeEventListener("contextmenu", j), window.removeEventListener("mouseup", j)
						};
					m.addEventListener("mousedown", (function(e) {
						e.preventDefault(), i = 100 + (c.offsetWidth - 275) / 12 * 5, r = c.offsetWidth - i;
						var n = h.toFixed(4),
							s = r.toFixed(4);
						c.style.clipPath = "inset(".concat(n, "px ").concat(s, "px ").concat(n, "px 0px)"), l.style.transform = "scale3d(1.1, 1.1, 1.1)", d = !0, t = e.clientX, o = 0, a = 0, window.addEventListener("mousemove", v), window.addEventListener("contextmenu", j), window.addEventListener("mouseup", j), requestAnimationFrame(x), requestAnimationFrame(_)
					})), m.addEventListener("mouseenter", (function() {
						u = !0, s.style.willChange = "transform", l.style.willChange = "transform", c.style.willChange = "clip-path"
					})), m.addEventListener("mouseleave", (function() {
						u = !1, d || p()
					}))
				},
				u = t(3206),
				h = t.n(u);
			var _ = function(e) {
					var n, t, i, r = e.animationDelay,
						s = (0, a.useState)(!r),
						l = s[0],
						u = s[1],
						_ = (0, a.useRef)(null),
						x = (0, a.useRef)(null);
					return (0, a.useEffect)((function() {
						r ? setTimeout((function() {
							u(!0), d(_, x)
						}), 1e3 * r) : d(_, x)
					}), []), (0, o.jsxs)("div", {
						className: c()(h().cover, (n = {}, t = h().passive, i = !l, t in n ? Object.defineProperty(n, t, {
							value: i,
							enumerable: !0,
							configurable: !0,
							writable: !0
						}) : n[t] = i, n)),
						children: [(0, o.jsx)("div", {
							className: h().coverImageContainer,
							ref: _,
							children: (0, o.jsx)("img", {
								className: h().coverImage,
								src: "/images/hero-cover.jpg",
								alt: "Richards"
							})
						}), (0, o.jsx)("div", {
							ref: x,
							className: h().hotspot
						}), (0, o.jsx)(m.Z, {
							areaRef: x,
							mode: m.A.DRAG
						})]
					})
				},
				x = t(4984),
				f = t.n(x);
			var p = function(e) {
					var n, t, i, r = e.className,
						s = e.animationDelay,
						l = (0, a.useState)(!s),
						m = l[0],
						d = l[1];
					return (0, a.useEffect)((function() {
						s && setTimeout((function() {
							d(!0)
						}), 1e3 * s)
					}), []), (0, o.jsx)("span", {
						className: c()(f().arrow, r, (n = {}, t = f().passive, i = !m, t in n ? Object.defineProperty(n, t, {
							value: i,
							enumerable: !0,
							configurable: !0,
							writable: !0
						}) : n[t] = i, n)),
						children: (0, o.jsx)("span", {
							children: "\u2193"
						})
					})
				},
				v = t(2881),
				j = .46,
				g = t(2509),
				b = t.n(g),
				w = function() {
					var e = (0, a.useState)((0, v.r)() ? .46 : 1.43)[0];
					return (0, o.jsx)("section", {
						className: b().homeHeroContainer,
						children: (0, o.jsxs)(i.ZP, {
							className: b().homeHero,
							children: [(0, o.jsxs)("h2", {
								className: b().title,
								children: [(0, o.jsx)(s.Z, {
									text: "Creative",
									animationDelay: j,
									animateIntoView: !1
								}), (0, o.jsx)("br", {}), (0, o.jsx)(s.Z, {
									text: "developer",
									animationDelay: j,
									animateIntoView: !1
								})]
							}), (0, o.jsx)(_, {
								animationDelay: 1.1
							}), (0, o.jsx)(p, {
								className: b().arrow,
								animationDelay: 1.4
							}), (0, o.jsx)(r.ZP, {
								className: b().description,
								animationDelay: e,
								text: "I support designers and agencies with creative development",
								animateIntoView: !1
							}), (0, o.jsxs)("h2", {
								className: b().name,
								children: [(0, o.jsx)(s.Z, {
									text: "Richard",
									animationDelay: j,
									animateIntoView: !1
								}), (0, o.jsx)("br", {}), (0, o.jsx)(s.Z, {
									text: "Ekwonye",
									animationDelay: j,
									animateIntoView: !1
								})]
							})]
						})
					})
				},
				N = t(1664),
				H = t(8595),
				P = t(5197),
				C = t.n(P),
				y = function(e) {
					var n = e.children,
						t = e.href,
						a = e.className;
					return (0, o.jsx)(H.Z, {
						children: (0, o.jsx)(N.default, {
							href: t,
							scroll: !1,
							children: (0, o.jsx)("a", {
								className: c()(C().underlinedLink, a),
								children: n
							})
						})
					})
				},
				I = t(7043),
				k = t.n(I),
				A = function() {
					return (0, o.jsx)("section", {
						className: k().homeProfileContainer,
						children: (0, o.jsxs)(i.ZP, {
							className: k().homeProfile,
							children: [(0, o.jsx)(H.Z, {
								children: (0, o.jsx)("h4", {
									children: "01/"
								})
							}), (0, o.jsxs)("div", {
								className: k().bio,
								children: [(0, o.jsx)(r.ZP, {
									size: r.$u.LG,
									text: "Passionate about web technologies. I love working at the intersection of creativity and user friendly interfaces. I create memorable web experiences."
								}), (0, o.jsx)(r.ZP, {
									className: k().personalInterests,
									size: r.$u.LG,
									text: "When I'm not building or exploring new web experiences, I'm probably playing games or watching football."
								})]
							}), (0, o.jsx)(H.Z, {
								className: k().advantageTitle,
								children: (0, o.jsx)("h4", {
									children: "A blend of UI and product engineering."
								})
							}), (0, o.jsx)(H.Z, {
								className: k().advantage,
								children: (0, o.jsxs)("p", {
									children: ["With a background in design, I work closely with design focused teams to build websites and microsites for companies and individuals. I have years of experience working and collaborating on product teams and leading engineering efforts.", (0, o.jsx)("br", {}), " ", (0, o.jsx)("br", {}), "With my experience in UI and product engineering, I solve product problems and build appealing usable web experiences."]
								})
							}), (0, o.jsx)("div", {
								className: k().aboutLink,
								children: (0, o.jsx)(y, {
									href: "/about",
									children: "More about me and services"
								})
							})]
						})
					})
				},
				Z = t(2907),
				D = t(5213),
				L = t.n(D),
				E = function() {
					return (0, o.jsx)("section", {
						className: L().homeProjectsContainer,
						children: (0, o.jsxs)(i.ZP, {
							className: L().homeProjects,
							children: [(0, o.jsx)(H.Z, {
								children: (0, o.jsx)("h4", {
									children: "02/"
								})
							}), (0, o.jsx)(r.ZP, {
								className: L().titleTwo,
								elementType: r.Hd.HEADING,
								text: "Recent projects"
							}), (0, o.jsx)(r.ZP, {
								className: L().titleThree,
								elementType: r.Hd.HEADING,
								text: "Creative development"
							}), (0, o.jsx)(Z.ZP, {})]
						})
					})
				},
				M = t(6474),
				F = t.n(M),
				T = function() {
					return (0, o.jsx)("section", {
						className: F().homeAboutContainer,
						children: (0, o.jsxs)(i.ZP, {
							className: F().homeAbout,
							children: [(0, o.jsx)(H.Z, {
								children: (0, o.jsx)("h4", {
									children: "03/"
								})
							}), (0, o.jsxs)("div", {
								className: F().hobbies,
								children: [(0, o.jsx)("h2", {
									children: (0, o.jsx)(s.Z, {
										text: "Football,"
									})
								}), (0, o.jsx)(i.r7, {
									src: "/images/home-about-cover.jpg",
									className: F().coverImage,
									containerClassName: F().coverImageContainer,
									multiplier: .1
								}), (0, o.jsx)("h2", {
									children: (0, o.jsx)(s.Z, {
										text: "Gaming,"
									})
								}), (0, o.jsx)("h2", {
									children: (0, o.jsx)(s.Z, {
										text: "Music."
									})
								})]
							}), (0, o.jsx)(r.ZP, {
								className: F().title,
								elementType: r.Hd.HEADING,
								text: "About me"
							}), (0, o.jsx)(H.Z, {
								className: F().description,
								children: (0, o.jsx)("p", {
									children: "My hobbies take up a good portion of my leisure time. I'm either cheering up FC Bayern Munich, winning a game of FIFA with them, exploring VR experiences or listening to delightful music."
								})
							}), (0, o.jsx)("div", {
								className: F().aboutLink,
								children: (0, o.jsx)(y, {
									href: "/about",
									children: "More about me"
								})
							})]
						})
					})
				},
				R = t(4562),
				G = function() {
					return (0, o.jsxs)(o.Fragment, {
						children: [(0, o.jsx)(w, {}), (0, o.jsx)(A, {}), (0, o.jsx)(E, {}), (0, o.jsx)(T, {}), (0, o.jsx)(R.Z, {
							sectionNumber: "04"
						})]
					})
				}
		},
		4984: function(e) {
			e.exports = {
				arrow: "Arrow_arrow___32nu",
				passive: "Arrow_passive__Nbo_X",
				"arrow-in": "Arrow_arrow-in__hGPl5"
			}
		},
		3206: function(e) {
			e.exports = {
				cover: "DraggableMaskCover_cover___8G_x",
				passive: "DraggableMaskCover_passive__eQfCX",
				"mask-in": "DraggableMaskCover_mask-in__JW60M",
				"lg-mask-in": "DraggableMaskCover_lg-mask-in__Pg18L",
				coverImage: "DraggableMaskCover_coverImage__RJn6Q",
				"image-in": "DraggableMaskCover_image-in__x_BAL",
				coverImageContainer: "DraggableMaskCover_coverImageContainer__g8Yjj",
				hotspot: "DraggableMaskCover_hotspot__z3dif"
			}
		},
		6474: function(e) {
			e.exports = {
				homeAboutContainer: "HomeAbout_homeAboutContainer__VC3Rr",
				homeAbout: "HomeAbout_homeAbout__RW_kL",
				title: "HomeAbout_title__j0FRi",
				hobbies: "HomeAbout_hobbies__42Ah6",
				coverImageContainer: "HomeAbout_coverImageContainer__6m9Do",
				coverImage: "HomeAbout_coverImage__W_QEE",
				description: "HomeAbout_description__wF5ta",
				aboutLink: "HomeAbout_aboutLink__QNoY1"
			}
		},
		2509: function(e) {
			e.exports = {
				homeHeroContainer: "HomeHero_homeHeroContainer__oB84N",
				homeHero: "HomeHero_homeHero__Nyk9r",
				title: "HomeHero_title__5dVNw",
				arrow: "HomeHero_arrow__cZmSk",
				description: "HomeHero_description___0H_b",
				name: "HomeHero_name__5xQ8J"
			}
		},
		7043: function(e) {
			e.exports = {
				homeProfileContainer: "HomeProfile_homeProfileContainer__7XjL3",
				homeProfile: "HomeProfile_homeProfile__j72JZ",
				bio: "HomeProfile_bio__65uVh",
				personalInterests: "HomeProfile_personalInterests__sYo3_",
				advantageTitle: "HomeProfile_advantageTitle__1DpnI",
				advantage: "HomeProfile_advantage__7d1AG",
				aboutLink: "HomeProfile_aboutLink__CThQH"
			}
		},
		5213: function(e) {
			e.exports = {
				homeProjectsContainer: "HomeProjects_homeProjectsContainer__WNrDS",
				homeProjects: "HomeProjects_homeProjects__L9cBZ",
				titleTwo: "HomeProjects_titleTwo__1SbOD",
				titleThree: "HomeProjects_titleThree__DTa0C"
			}
		},
		5197: function(e) {
			e.exports = {
				underlinedLink: "UnderlinedLink_underlinedLink__oFqpm"
			}
		}
	},
	function(e) {
		e.O(0, [822, 186, 774, 888, 179], (function() {
			return n = 5301, e(e.s = n);
			var n
		}));
		var n = e.O();
		_N_E = n
	}
]);
//# sourceMappingURL=index-518ad858e2f285f4.js.map