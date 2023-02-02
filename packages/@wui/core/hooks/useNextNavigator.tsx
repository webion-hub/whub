import { useRouter } from 'next/router';
import React from 'react';

export const useNextNavigator = () => {
  const router = useRouter();

  const clickNavigate = (url: string) => (e: React.MouseEvent<any, any>) => {
    e.preventDefault();
    navigate(url);
  };

  const navigate = (url: string) => {
    router.push(url);
  };

  const getClickNavigate = (url: string, eventName?: string) => {
    return {
      [eventName ?? 'onClick']: clickNavigate(url),
      href: url     
    }
  }

  return {
    navigate,
    clickNavigate,
    getClickNavigate
  };
};
