export default {
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
}
