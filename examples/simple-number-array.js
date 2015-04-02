// Íàøè ÷èñëà
var numbers = [4, 8, 15, 16, 23, 42, 108];

// Ñàì êîíñòðóêòîð
var builder = new JQueryBuilder(function (selector) {

	// Ïåðåáèðàåì ÷èñëà
	for(var i = 0; i < numbers.length; i++) {

		// Ïðîâåðÿåì ñåëåêòîð
		switch (selector) {

			// Åñëè ìû èùåì ÷¸òíûå ÷èñëà
			case 'odd' :

				// ... è ÷èñëî ïîäõîäèò ïîä òðåáîâàíèÿ
				if (numbers[i] % 2 !== 0) {

					// Äîáàâëÿåì åãî â âûáîðêó
					this.push(numbers[i]);
				}
				break;

			// Åñëè ìû èùåì íå÷¸òíûå ÷èñëà
			case 'even' :

				// ... è ÷èñëî ïîäõîäèò ïîä òðåáîâàíèÿ
				if (numbers[i] % 2 === 0) {

					// Äîáàâëÿåì åãî â âûáîðêó
					this.push(numbers[i]);
				}
				break;
		}
	}
});
var $ = builder.jQuery;
$.fn.add = function (value) {
	var self = this;
	return this.each(function (i) {
		self[i] += value;
	});
};
var result = $('even').add(5);
console.log(result); // [9, 13, 21, 47, 113]
