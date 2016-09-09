export default {
	number: 12,
	name: 'Проведение crowdsale',
	isExecute: false,
	form: {
		_token_name: {
			label: 'Токен ether',
			placeholder: 'Ether funds'
		},
		_token_name_credit: {
			label: 'Токен кредитов',
			placeholder: 'DAO credit'
		},
		_amount_start: {
			label: 'Стартовая цена',
			placeholder: '1'
		},
		_amount_end: {
			label: 'Конечная цена',
			placeholder: '5'
		}
	},
	progress: [
		{
			name: 'Создаем контракт Crowdsale',
			status: 0
		},
		{
			name: 'Переводим на Crowdsale 5 токенов DAO credit для продажи',
			status: 0
		},
		{
			name: 'Апрувим 5 токенов Ether funds для Crowdsale',
			status: 0
		},
		{
			name: 'Закрываем продажу',
			status: 0
		}
	],
	formResult: {
		status: 0,
		message: '',
		template: 'Адрес Crowdsale <code>%address%</code>.'
	},
	formCheck: {
		_dao_address: {
			label: 'Адрес Crowdsale',
			placeholder: '0x1111111111111111111111111111'
		}
	},
	formCheckResult: {
		status: 0
	}
}
