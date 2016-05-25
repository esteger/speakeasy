angular.module('speakeasy').directive('ezIcon', function(ezIconService) {
	var c = ezIconService.getShapes();
	return {
		restrict: 'AE',
		link: function(h, v, z) {
			var a, t, l, M = function() {
					if (void 0 !== z.icon) {
						a = z.icon;
						var h = a.match(/ic_(.*)_([0-9]+)px.svg/m);
						null !== h && (a = h[1], t = h[2])
					} else a = "help";
					void 0 === c[a] && (a = "help"), void 0 !== z.size ? t = z.size : null !== t && (t = 24), l = void 0 !== z.viewbox ? z.viewbox : "0 0 24 24", v.html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + l + '" width="' + t + '" height="' + t + '">' + c[a] + "</svg>")
				},
				d = function(h) {
					if (void 0 === c[h] && (h = "help"), h !== a) {
						try {
							v.html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + z.viewbox ? z.viewbox : '0 0 24 24' + '" width="' + t + '" height="' + t + '"><g id="' + h + '" style="display:none">' + c[h] + '</g><g id="' + a + '" style="display:none">' + c[a] + "</g></svg>"), new SVGMorpheus(v.children()[0]).to(h, JSON.parse(z.options || null))
						} catch (l) {
							v.html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + z.viewbox ? z.viewbox : '0 0 24 24' + '" width="' + t + '" height="' + t + '">' + c[h] + "</svg>")
						}
						a = h
					}
				},
				p = function(h) {
					h !== t && (v.children()[0].setAttribute("width", h), v.children()[0].setAttribute("height", h), t = h)
				};
			M(), void 0 !== z.icon && z.$observe("icon", d), void 0 !== z.size && z.$observe("size", p)
		}
	}
});