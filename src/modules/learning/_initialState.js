export default {
	items: [
		{
			number: 1,
			name: 'Создание организации',
			isExecute: false,
			form: {
				_dao_name: {
					label: 'Название вашей организации',
					placeholder: 'Martian colony'
				},
				_dao_description: {
					label: 'Краткое описание',
					placeholder: 'DAO for first human colony on Mars'
				},
				_shares_name: {
					label: 'Название акций',
					placeholder: 'Mars colony shares'
				},
				_shares_symbol: {
					label: 'Символ для акций, обычно 1 - 3 символа',
					placeholder: 'MRS'
				},
				_shares_count: {
					label: 'Количество акций, эмиссируемых при создании ДАО',
					placeholder: '10000'
				}
			},
			progress: [
				{
					name: 'Создаем DAO',
					status: 0
				}
			],
			formResult: {
				status: 0,
				message: '',
				template: 'Адрес вашего DAO <code>%address%</code>.'
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
		},
		{
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
		},
		{
			number: 3,
			name: 'Контракт для хранения эфиров',
			isExecute: false,
			form: {
				_credits_name: {
					label: 'Название кредитов',
					placeholder: 'Mars colony credits'
				},
				_credits_symbol: {
					label: 'Символ для кредитов, обычно 1 - 3 символа',
					placeholder: 'MRC'
				}
			},
			progress: [
				{
					name: 'Создаем контракт TokenEther',
					status: 0
				},
				{
					name: 'Добавляем в реестр контрактов организации новый токен',
					status: 0
				},
				{
					name: 'Переводим на контракт токена 0.1',
					status: 0
				}
			],
			formResult: {
				status: 0,
				message: '',
				template: 'Адрес нового токена <code>%address%</code>.'
			},
			formCheck: {
				_dao_address: {
					label: 'Адрес вашего DAO',
					placeholder: '0x1111111111111111111111111111'
				},
				_credits_name: {
					label: 'Название кредитов',
					placeholder: 'Mars colony credits'
				}
			},
			formCheckResult: {
				status: 0
			}
		},
		{
			number: 4,
			name: 'Привлечение финансирования',
			isExecute: false,
			form: {
				_credits_name: {
					label: 'Название токена кредитов',
					placeholder: 'Mars colony credits'
				},
				_shares_name: {
					label: 'Название токена акций',
					placeholder: 'Mars colony shares'
				}
			},
			progress: [
				{
					name: 'Создаем контракт ShareSale',
					status: 0
				},
				{
					name: 'Переводим акции на контракт shareSale',
					status: 0
				},
				{
					name: 'Закрываем сделку',
					status: 0
				}
			],
			formResult: {
				status: 0,
				message: '',
				template: 'Адрес нового контракта ShareSale <code>%address%</code>.'
			},
			formCheck: {
				_address: {
					label: 'Адрес созданого контракта ShareSale',
					placeholder: '0x1111111111111111111111111111'
				}
			},
			formCheckResult: {
				status: 0
			}
		},
		{
			number: 5,
			name: 'Создание внутреннего токена',
			isExecute: false,
			form: {
				_token_name: {
					label: 'Название токена',
					placeholder: 'DAO credit'
				},
				_token_symbol: {
					label: 'Символ для токена, обычно 1 - 3 символа',
					placeholder: 'DCT'
				},
				_decimals: {
					label: 'Кол-во знаков после запятой',
					placeholder: '0'
				},
				_amount: {
					label: 'Первоначальная сумма',
					placeholder: '100'
				}
			},
			progress: [
				{
					name: 'Создаем токен для внутреннего рынка',
					status: 0
				},
				{
					name: 'Добавляем в реестр организации новый токен',
					status: 0
				}
			],
			formResult: {
				status: 0,
				message: '',
				template: 'Адрес нового токена <code>%address%</code>.'
			},
			formCheck: {
				_dao_address: {
					label: 'Адрес вашего DAO',
					placeholder: '0x1111111111111111111111111111'
				},
				_token_name: {
					label: 'Название токена для внутреннего рынка',
					placeholder: 'DAO credit'
				}
			},
			formCheckResult: {
				status: 0
			}
		},
		{
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
		},
		{
			number: 7,
			name: 'Создание регулятора рынка',
			isExecute: false,
			form: {
				_token_name: {
					label: 'Токен акций',
					placeholder: 'Mars colony shares'
				},
				_token_credit_market: {
					label: 'Токен рынка',
					placeholder: 'DAO credit'
				},
				_token_name_market: {
					label: 'Название токена для отражения ценности на рынке',
					placeholder: 'Сoaching'
				},
				_token_symbol: {
					label: 'Символ для токена, обычно 1 - 3 символа',
					placeholder: 'C'
				},
				_decimals: {
					label: 'Кол-во знаков после запятой',
					placeholder: '0'
				},
				_amount: {
					label: 'Первоначальная сумма',
					placeholder: '100'
				},
				_amount_sell: {
					label: 'Кол-во токенов для продажи лота',
					placeholder: '1000'
				},
				_amount_buy: {
					label: 'Кол-во токенов получите за лот',
					placeholder: '5'
				}
			},
			progress: [
				{
					name: 'Создаем контракт MarketRegulator',
					status: 0
				},
				{
					name: 'Добавляем в реестр организации контракт',
					status: 0
				},
				{
					name: 'Переводим рынок в закрытый режим',
					status: 0
				},
				{
					name: 'Делегируем рынок регулятору',
					status: 0
				},
				{
					name: 'Создаем токен, который будет отражать ценность на рынке',
					status: 0
				},
				{
					name: 'Добавляем в реестр организации токен',
					status: 0
				},
				{
					name: 'добавляем лот на рынок',
					status: 0
				}
			],
			formResult: {
				status: 0,
				message: '',
				template: 'Адрес регулятора <code>%address%</code>.'
			},
			formCheck: {
			},
			formCheckResult: {
				status: 0
			}
		},
		{
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
		},
		{
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
		},
		{
			number: 10,
			name: 'Увеличение ликвидности токенов ДАО',
			isExecute: false,
			form: {
			},
			progress: [
				{
					name: 'Добавляем в реестр организации Token emission builder',
					status: 0
				},
				{
					name: 'Создаем токен 1',
					status: 0
				},
				{
					name: 'Добавляем в реестр организации токен 1',
					status: 0
				},
				{
					name: 'Создаем токен 2',
					status: 0
				},
				{
					name: 'Добавляем в реестр организации токен 2',
					status: 0
				},
				{
					name: 'Создаем токен 3',
					status: 0
				},
				{
					name: 'Добавляем в реестр организации токен 3',
					status: 0
				},
				{
					name: 'Создаем токен 4',
					status: 0
				},
				{
					name: 'Добавляем в реестр организации токен 4',
					status: 0
				},
				{
					name: 'Добавляем на рынок лот 1',
					status: 0
				},
				{
					name: 'Добавляем на рынок лот 2',
					status: 0
				},
				{
					name: 'Добавляем на рынок лот 3',
					status: 0
				},
				{
					name: 'Добавляем на рынок лот 4',
					status: 0
				}
			],
			formResult: {
				status: 0,
				message: '',
				template: 'Все лоты добавлены на рынок'
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
		},
		{
			number: 11,
			name: 'Cовет директоров организации',
			isExecute: false,
			form: {
				_token_name: {
					label: 'Токен акций',
					placeholder: 'Mars colony shares'
				},
				_token_name_credit: {
					label: 'Токен ether',
					placeholder: 'Ether funds'
				},
				_token_name_poll: {
					label: 'Название токена для голосования',
					placeholder: 'Directors voting token'
				},
				_token_symbol_poll: {
					label: 'Символ токена для голосования',
					placeholder: 'DVT'
				},
				_decimals: {
					label: 'Кол-во знаков после запятой',
					placeholder: '0'
				},
				_amount: {
					label: 'Первоначальная сумма токена для голосования',
					placeholder: '30'
				},
				_acc_bod_1: {
					label: 'Адрес первого члена совета директоров',
					placeholder: '0x1111'
				},
				_acc_bod_2: {
					label: 'Адрес второго члена совета директоров',
					placeholder: '0x2222'
				},
				_amount_end: {
					label: 'Описание того на что тратим',
					placeholder: 'Описание'
				},
				_amount_bod: {
					label: 'Количество токенов под управление совета директоров',
					placeholder: '1000'
				},
				_amount_proposal: {
					label: 'Кол-во токенов отдать за proposal',
					placeholder: '10'
				}
			},
			progress: [
				{
					name: 'Создаем контракт BoardOfDirectors',
					status: 0
				},
				{
					name: 'Добавляем в реестр организации контракт',
					status: 0
				},
				{
					name: 'Создаем токен с помощью которого будем голосовать',
					status: 0
				},
				{
					name: 'Добавляем в реестр организации контракт токена',
					status: 0
				},
				{
					name: 'Раздаем токены голосов членам совета директоров',
					status: 0
				},
				{
					name: 'Раздаем токены голосов членам совета директоров',
					status: 0
				},
				{
					name: 'Голосуем акциями за то, чтобы токен совета директоров был принят',
					status: 0
				},
				{
					name: 'Создаем proposal',
					status: 0
				},
				{
					name: 'Переводим средства под управление контракта совета директоров',
					status: 0
				},
				{
					name: 'Апрувим токены для голосования',
					status: 0
				},
				{
					name: 'Апрувим токены для голосования',
					status: 0
				},
				{
					name: 'Голосуем за принятие текущего вопроса',
					status: 0
				},
				{
					name: 'Голосуем за принятие текущего вопроса',
					status: 0
				}
			],
			formResult: {
				status: 0,
				message: '',
				template: 'Адрес BoardOfDirectors <code>%address%</code>.'
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
		},
		{
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
	]
}
