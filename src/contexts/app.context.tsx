import { createContext, useState } from 'react'
import { Cinema } from 'src/types/cinema.type'
import { ExtendedPurchase } from 'src/types/purchase.type'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurchases: ExtendedPurchase[]
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
  cinema: Cinema
  setCinema: React.Dispatch<React.SetStateAction<Cinema>>
  reset: () => void
}

export const getInitialAppContext: () => AppContextInterface = () => ({
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null,
  cinema: {
    _id: '65203b82210d84d5c627f8b1',
    name: 'NHCinema Thủ Đức',
    address: 'Thủ Đức'
  },
  setCinema: () => null,
  reset: () => null
})

const initialAppContext = getInitialAppContext()

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({
  children,
  defaultValue = initialAppContext
}: {
  children: React.ReactNode
  defaultValue?: AppContextInterface
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(defaultValue.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(defaultValue.profile)
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>(defaultValue.extendedPurchases)
  const [cinema, setCinema] = useState<Cinema>(defaultValue.cinema)

  const reset = () => {
    setIsAuthenticated(false)
    setProfile(null)
    setExtendedPurchases([])
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        extendedPurchases,
        setExtendedPurchases,
        reset,
        cinema,
        setCinema
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
