export default {
	number: 9,
	name: 'Создание регулятора эмиссии',
	isExecute: false,
	form: {
		_amount: {
			label: 'Кол-во токенов',
			placeholder: '100'
		},
		_token_name: {
			label: 'Токен акций',
			placeholder: 'Mars colony shares'
		},
		_amount_approve: {
			label: 'Кол-во токенов для approve',
			placeholder: '1'
		},
		_token_name_poll: {
			label: 'Токен голосования',
			placeholder: 'DAO credit'
		}
	},
	progress: [
		{
			name: 'Создаем контракт MarketRuleConstant',
			status: 0
		},
		{
			name: 'Добавляем в реестр организации контракт',
			status: 0
		},
		{
			name: 'Даем approve акций для контракта MarketRegulator',
			status: 0
		},
		{
			name: 'Голосуем за правило',
			status: 0
		},
		{
			name: 'Смена адреса владельца токена на адрес контракта регулятора рынка',
			status: 0
		}
	],
	formResult: {
		status: 0,
		message: '',
		template: 'Адрес нового контракта <code>%address%</code>.'
	},
	formCheck: {
		_dao_address: {
			label: 'Адрес вашего DAO',
			placeholder: '0x1111111111111111111111111111'
		},
		_token_name_poll: {
			label: 'Токен голосования',
			placeholder: 'DAO credit'
		}
	},
	formCheckResult: {
		status: 0
	}
}
