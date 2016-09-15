export default {
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
    _dao_address: {
      label: 'Адрес вашего DAO',
      placeholder: '0x1111111111111111111111111111'
    }
  },
  formCheckResult: {
    status: 0
  }
}
