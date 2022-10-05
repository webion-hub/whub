import { useRouter } from 'next/router';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const useNavigator = () => {
  const navigate = useNavigate();

  const clickNavigate = (url: string) => (e: React.MouseEvent<any, any>) => {
    e.preventDefault();
    navigate(url);
  };

  return {
    navigate,
    clickNavigate,
  };
};

export const useNextNavigator = () => {
  const router = useRouter();

  const clickNavigate = (url: string) => (e: React.MouseEvent<any, any>) => {
    e.preventDefault();
    navigate(url);
  };

  const navigate = (url: string) => {
    router.push(url);
  };

  return {
    navigate,
    clickNavigate,
  };
};
