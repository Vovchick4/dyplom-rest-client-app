import { createContext, useState } from 'react';

export const NavbarContext = createContext(null);

export function NavbarContextProvider({ children }) {
  const [title, setTitle] = useState('');
  const [backVisible, setBackVisible] = useState(false);
  const [backVisibleMenu, setBackVisibleMenu] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [transparent, setTransparent] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const value = {
    title,
    setTitle,
    backVisible,
    setBackVisible,
    backVisibleMenu,
    setBackVisibleMenu,
    searchVisible,
    setSearchVisible,
    categoriesVisible,
    setCategoriesVisible,
    transparent,
    setTransparent,
    categories,
    setCategories,
    loading,
    setLoading,
  };

  return (
    <NavbarContext.Provider value={value}>{children}</NavbarContext.Provider>
  );
}
