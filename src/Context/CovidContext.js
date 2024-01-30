import React from 'react'

const CovidContext = React.createContext({
  isThemeLight: false,
  changeTheme: () => {},
})

export default CovidContext
