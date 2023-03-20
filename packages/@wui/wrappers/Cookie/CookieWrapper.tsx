import Cookies from 'js-cookie';
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface CookieContext {
  readonly accept: () => void,
  readonly decline: () => void,
  readonly openPopup: boolean,
}

export const CookieContext = createContext<CookieContext>({
  accept: () => {},
  decline: () => {},
  openPopup: false,
});

interface CookieWrapperProps {
  readonly name: string,
  readonly scriptsComponents?: ReactNode,
  readonly children: ReactNode,
} 

export const CookieWrapper = (props: CookieWrapperProps) => {
  const [openPopup, setOpenPopup] = useState(false)
  const [cookieRefused, setCookieRefused] = useState(false)

  useEffect(() => {
    const got = Cookies.get(props.name);
    
    if (got) 
      return;

    setOpenPopup(true);
  }, []);

  const accept = () => {
    Cookies.set(props.name, 'true', { expires: 365, secure: true });
    setOpenPopup(false);
  };

  const decline = () => {
    Cookies.set(props.name, 'false', { expires: 365, secure: true });
    setOpenPopup(false);
    setCookieRefused(true)
  };

  return (
    <CookieContext.Provider
      value={{ 
        accept, 
        decline,
        openPopup,
      }}
    >
      {
        !cookieRefused && props.scriptsComponents 
      }
      {props.children}
    </CookieContext.Provider>
  );
};

export const useCookie = () => useContext(CookieContext);
