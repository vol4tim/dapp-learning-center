export default {
  number: 3,
  name: 'Контракт для хранения эфиров',
  isExecute: false,
  form: {
    _credits_name: {
      label: 'Название кредитов',
      placeholder: 'Ether funds'
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
      placeholder: 'Ether funds'
    }
  },
  formCheckResult: {
    status: 0
  }
}
