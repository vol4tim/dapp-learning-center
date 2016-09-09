export default {
	number: 8,
	name: 'Добавление агента рынка',
	isExecute: false,
	form: {
		_address: {
			label: 'Адрес marketRegulator',
			placeholder: '0x1111111111111111111111111111'
		}
	},
	progress: [
		{
			name: 'Создаем контракт агента рынка DAOMarketAgent',
			status: 0
		},
		{
			name: 'Добавляем в реестр организации контракт агента',
			status: 0
		}
	],
	formResult: {
		status: 0,
		message: '',
		template: 'Адрес агента рынка <code>%address%</code>.'
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
