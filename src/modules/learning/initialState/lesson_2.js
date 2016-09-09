export default {
	number: 2,
	name: 'Распределение акций',
	isExecute: false,
	form: {
		_shares_name: {
			label: 'Название акций',
			placeholder: 'Mars colony shares'
		},
		_amount: {
			label: 'Количество акций',
			placeholder: '1'
		}
	},
	progress: [
		{
			name: 'Делаем approve акций',
			status: 0
		}
	],
	formResult: {
		status: 0,
		message: '',
		template: 'Сделан approve <code>%_amount%</code> акции <code>%_shares_name%</code>.'
	},
	formCheck: {
		_dao_address: {
			label: 'Адрес вашего DAO',
			placeholder: '0x1111111111111111111111111111'
		},
		_shares_name: {
			label: 'Название акций',
			placeholder: 'Mars colony shares'
		}
	},
	formCheckResult: {
		status: 0
	}
}
