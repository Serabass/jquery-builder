var $ = jQueryBuilder.fromArray().jQuery;
$.fn.extend({
	reverse: function () {
		var self = this;
		return this.each(function (i) {
			var result = '';
			for(var x = self[i].length - 1; x >= 0 ; x--) {
				result += self[i][x];
			}
			self[i] = result;
		});
	},
	upper: function () {
		var self = this;
		return this.each(function (i) {
			self[i] = this.toUpperCase();
		});
	},
	lower: function () {
		var self = this;
		return this.each(function (i) {
			self[i] = this.toLowerCase();
		});
	}
});
var result = $('abcde', 'xyZ', 'HAAR')
		.reverse()
		.lower()
	;

console.log(result); ["edcba", "zyx", "raah"]
