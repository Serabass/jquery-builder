// ���� �����
var numbers = [4, 8, 15, 16, 23, 42, 108];

// ��� �����������
var builder = new JQueryBuilder(function (selector) {

	// ���������� �����
	for(var i = 0; i < numbers.length; i++) {

		// ��������� ��������
		switch (selector) {

			// ���� �� ���� ������ �����
			case 'even' :

				// ... � ����� �������� ��� ����������
				if (numbers[i] % 2 === 0) {

					// ��������� ��� � �������
					this.push(numbers[i]);
				}
				break;

			// ���� �� ���� �������� �����
			case 'even' :

				// ... � ����� �������� ��� ����������
				if (numbers[i] % 2 === 0) {

					// ��������� ��� � �������
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