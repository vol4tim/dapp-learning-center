export default {
	number: 6,
	name: 'Создание внутреннего рынка',
	isExecute: false,
	form: {
		_token_name_sell_1: {
			label: 'Токен для продажи первого лота',
			placeholder: 'Mars colony shares'
		},
		_amount_sell_1: {
			label: 'Кол-во токенов для продажи первого лота',
			placeholder: '1000'
		},
		_token_name_buy_1: {
			label: 'Токен который получаем для первого лота',
			placeholder: 'DAO credit'
		},
		_amount_buy_1: {
			label: 'Кол-во токенов получите для первого лота',
			placeholder: '5'
		},
		_token_name_sell_2: {
			label: 'Токен для продажи второго лота',
			placeholder: 'DAO credit'
		},
		_amount_sell_2: {
			label: 'Кол-во токенов для продажи второго лота',
			placeholder: '500'
		},
		_token_name_buy_2: {
			label: 'Токен который получаем для второго лота',
			placeholder: 'Mars colony shares'
		},
		_amount_buy_2: {
			label: 'Кол-во токенов получите для второго лота',
			placeholder: '1'
		}
	},
	progress: [
		{
			name: 'Создаем контракт Market для рынка',
			status: 0
		},
		{
			name: 'Добавляем в реестр организации маркет',
			status: 0
		},
		{
			name: 'Выставляем первый лот',
			status: 0
		},
		{
			name: 'Выставляем второй лот',
			status: 0
		}
	],
	formResult: {
		status: 0,
		message: '',
		template: 'Адрес рынка <code>%address%</code>.'
	},
	formCheck: {
		_dao_address: {
			label: 'Адрес вашего DAO',
			placeholder: '0x1111111111111111111111111111'
		}
	},
	formCheckResult: {
		status: 0
	}
}
