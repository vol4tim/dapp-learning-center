export default {
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
}
