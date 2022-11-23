import { Suspense, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  Navbar,
  Searchbar,
  Sidebar,
  NavbarOffset,
  FullPageLoader,
  OrderPopup,
} from '../';
import { ChooseLanguage, ChooseTable } from '../';
import { languageActions, languageSelectors } from '../../redux/language';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchbarOpen, setSearchbarOpen] = useState(false);
  const [activeIndexOrderPopup, setActiveIndexOrderPopup] = useState(0);

  const language = useSelector(languageSelectors.getLocale);
  const persistedTableNumber = sessionStorage.getItem('tableNumber');

  const { i18n } = useTranslation();

  const dispatch = useDispatch();

  function openSidebar() {
    setSidebarOpen(true);
  }

  function closeSidebar() {
    setSidebarOpen(false);
  }

  function openSearchbar() {
    setSearchbarOpen(true);
  }

  function closeSearchbar() {
    setSearchbarOpen(false);
  }

  function onNext() {
    setActiveIndexOrderPopup((prev) => prev + 1);
  }

  function selectLanguage(language) {
    i18n.changeLanguage(language);
    onNext();
  }

  function selectTable(tableNumber) {
    sessionStorage.setItem('tableNumber', tableNumber);
    onNext();
  }

  function showLanguageSelect() {
    dispatch(languageActions.clearLanguage());
    setActiveIndexOrderPopup(0);
    closeSidebar();
  }

  const location = useLocation();
  useEffect(() => {
    closeSidebar();
    closeSearchbar();
  }, [location]);

  return (
    <div>
      <OrderPopup
        elements={[
          {
            component: <ChooseLanguage onSelect={selectLanguage} />,
            renderCheck: () => !language,
          },
          {
            component: <ChooseTable onSubmit={selectTable} />,
            renderCheck: () => !persistedTableNumber,
          },
        ]}
        onNext={onNext}
        activeIndex={activeIndexOrderPopup}
      />

      <Navbar onOpenSidebar={openSidebar} onOpenSearchbar={openSearchbar} />
      {searchbarOpen && <Searchbar onCancel={closeSearchbar} />}
      <Sidebar
        open={sidebarOpen}
        onClose={closeSidebar}
        showLanguageSelect={showLanguageSelect}
      />

      <Suspense fallback={<FullPageLoader />}>
        <NavbarOffset>{children}</NavbarOffset>
      </Suspense>
    </div>
  );
}
