import { createContext, PropsWithChildren, useContext, useState } from "react";

export interface GlobalSearchContext {
  searchText?: string;
  onSearchTextChange: (searchText?: string) => void;
}

const context = createContext<GlobalSearchContext>({
  onSearchTextChange() {}
});

export const GlobalSearchProvider = ({ children }: PropsWithChildren) => {
  const [searchText, setSearchText] = useState<string>();
  return (
    <context.Provider
      value={{
        searchText,
        onSearchTextChange: searchText => {
          setSearchText(searchText);
        }
      }}
    >
      {children}
    </context.Provider>
  )
};

export const useGlobalSearch = () => useContext(context);
