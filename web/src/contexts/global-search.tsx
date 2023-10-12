import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react'

export interface GlobalSearchContext {
  searchText?: string
  onSearchTextChange: (searchText?: string) => void
}

const context = createContext<GlobalSearchContext>({
  onSearchTextChange() {},
})

export const GlobalSearchProvider = ({ children }: PropsWithChildren) => {
  const [searchText, setSearchText] = useState<string>();
  const value = useMemo<GlobalSearchContext>(() => ({
    searchText,
    onSearchTextChange: (searchText) => {
      setSearchText(searchText)
    },
  }), [searchText]);
  return (
    <context.Provider
      value={value}
    >
      {children}
    </context.Provider>
  )
}

export const useGlobalSearch = () => useContext(context)
