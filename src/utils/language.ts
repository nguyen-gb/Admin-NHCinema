export const setLanguageToLS = (lan: string) => {
  localStorage.setItem('language', JSON.stringify(lan))
}

export const getLanguageFromLS = () => {
  const result = localStorage.getItem('language')
  return result ? JSON.parse(result) : null
}
