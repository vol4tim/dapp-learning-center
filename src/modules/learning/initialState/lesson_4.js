export default {
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
}
