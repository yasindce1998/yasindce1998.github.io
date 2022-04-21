self.__BUILD_MANIFEST = function(s, c, t) {
	return {
		__rewrites: {
			beforeFiles: [],
			afterFiles: [],
			fallback: []
		},
		"/": [s, c, t, "static/css/6d21de58ca5f42d2.css", "static/chunks/pages/index-518ad858e2f285f4.js"],
		"/404": [s, "static/css/6180ba92d11a67cb.css", "static/chunks/pages/404-ca85023005db5eba.js"],
		"/_error": ["static/chunks/pages/_error-74f93bac631b754d.js"],
		"/about": ["static/chunks/176-e016e6cc9e2bd2e1.js", s, c, t, "static/css/d32dfea6a41c8cdf.css", "static/chunks/pages/about-e6744f3223477220.js"],
		"/contact": ["static/css/bdf8e6950de6a6b4.css", "static/chunks/pages/contact-32098a2a4ba50078.js"],
		"/work": [s, c, t, "static/css/4e1ca1d29bc34eb4.css", "static/chunks/pages/work-17fd3eca354afbe9.js"],
		sortedPages: ["/", "/404", "/_app", "/_error", "/about", "/contact", "/work"]
	}
}("static/chunks/822-ad0dd940e1ee154e.js", "static/css/5b4b2c502636db62.css", "static/chunks/186-5d5e924f377065ba.js"), self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB();