export default {
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
}
