import _ from 'lodash'
import { LOAD_IS_EXECUTE, SET_RESULT_FORM, SET_RESULT_FORM_CHECK, SET_PROGRESS_FORM } from './actionTypes'

const initialState = {
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
			},
			formResult: {
				status: 0,
				message: '',
				template: 'Сделан approve <code>%_amount%</code> акции <code>%_shares_name%</code>.'
			},
			formCheck: {
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
			},
			formResult: {
				status: 0,
				message: '',
				template: 'Сделан approve <code>%_amount%</code> акции <code>%_shares_name%</code>.'
			},
			formCheck: {
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
			},
			formResult: {
				status: 0,
				message: '',
				template: 'Сделан approve <code>%_amount%</code> акции <code>%_shares_name%</code>.'
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
			},
			formResult: {
				status: 0,
				message: '',
				template: 'Сделан approve <code>%_amount%</code> акции <code>%_shares_name%</code>.'
			},
			formCheck: {
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
			},
			formResult: {
				status: 0,
				message: '',
				template: 'Сделан approve <code>%_amount%</code> акции <code>%_shares_name%</code>.'
			},
			formCheck: {
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
			formResult: {
				status: 0,
				message: '',
				template: 'Сделан approve <code>%_amount%</code> акции <code>%_shares_name%</code>.'
			},
			formCheck: {
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
			},
			formResult: {
				status: 0,
				message: '',
				template: 'Сделан approve <code>%_amount%</code> акции <code>%_shares_name%</code>.'
			},
			formCheck: {
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
			},
			formResult: {
				status: 0,
				message: '',
				template: 'Сделан approve <code>%_amount%</code> акции <code>%_shares_name%</code>.'
			},
			formCheck: {
			},
			formCheckResult: {
				status: 0
			}
		}
	]
}

export default function learning(state = initialState, action) {
	switch (action.type) {
		case SET_RESULT_FORM: {
			const items = state.items.map((item) => {
				if (item.number === action.payload.number) {
					return {...item, formResult: {...item.formResult, status: 1, message: replaceObj(item.formResult.template, action.payload.result)}}
				}
				return item
			})
			return {...state, items: items}
		}

		case SET_RESULT_FORM_CHECK: {
			const items = state.items.map((item) => {
				if (item.number === action.payload.number) {
					return {...item, isExecute: (action.payload.result) ? true : false, formCheckResult: {...item.formCheckResult, status: (action.payload.result) ? 1 : 2}}
				}
				return item
			})
			return {...state, items: items}
		}

		case SET_PROGRESS_FORM: {
			const items = state.items.map((item) => {
				if (item.number === action.payload.number) {
					const progress = item.progress.map((item1, index) => {
						if (index === action.payload.step) {
							return {...item1, status: action.payload.status}
						}
						return item1
					})
					return {...item, progress: progress}
				}
				return item
			})
			return {...state, items: items}
		}

		case LOAD_IS_EXECUTE: {
			const items = state.items.map((item) => {
				if (item.number === action.payload.number) {
					return {...item, isExecute: action.payload.isExecute}
				}
				return item
			})
			return {...state, items: items}
		}

		default:
			return state;
	}
}

function replaceArray(string, find, replace) {
  var regex;
  for (var i = 0; i < find.length; i++) {
  regex = new RegExp(find[i], 'g');
		string = string.replace(regex, replace[i]);
  }
  return string;
}

function replaceObj(string, obj) {
	var find = [];
	var replace = [];
	_.forEach(obj, function(value, key) {
		find.push('%'+ key +'%')
		replace.push(value)
	});
	return replaceArray(string, find, replace);
}
