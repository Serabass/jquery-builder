// Наши числа
var numbers = [4, 8, 15, 16, 23, 42, 108];

// Сам конструктор
var builder = new JQueryBuilder(function (selector) {

	// Перебираем числа
	for(var i = 0; i < numbers.length; i++) {

		// Проверяем селектор
		switch (selector) {

			// Если мы ищем чётные числа
			case 'even' :

				// ... и число подходит под требования
				if (numbers[i] % 2 === 0) {

					// Добавляем его в выборку
					this.push(numbers[i]);
				}
				break;

			// Если мы ищем нечётные числа
			case 'even' :

				// ... и число подходит под требования
				if (numbers[i] % 2 === 0) {

					// Добавляем его в выборку
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