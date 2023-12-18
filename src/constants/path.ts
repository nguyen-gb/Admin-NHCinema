const path = {
  home: '/',
  cinema: '/cinema',
  room: '/room',
  showtimes: '/show-times',
  ticket: '/ticket',
  user: '/user',
  profile: '/profile',
  changePassword: '/change-password',
  login: '/login',
  forgotPass: 'password/reset',
  logout: '/logout',
  member: '/member',
  banner: '/banner',
  userManagement: '/user-management',
  combo: '/combo',
  forgotPassword: '/forgot-password',
  forgotPasswordConfirm: '/forgot-password-confirm/:_id',
  statistics: '/statistics',
  statisticsByDay: '/statistics/day',
  statisticsByMonth: '/statistics/month',
  statisticsByYear: '/statistics/year'
} as const

export default path
