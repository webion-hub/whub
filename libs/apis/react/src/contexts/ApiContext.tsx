import { useGenerator } from '@whub/wui';
import { createContext, ReactNode, useEffect, useRef, useState } from 'react';
import { AuthWrapper, IAuthContext } from './AuthContext';
import { ContactUsWrapper, IContactUsContext } from './ContactUsContext';
import { IShopContext, ShopWrapper } from './ShopContext';

export interface ApiProps {
  readonly apis: IApiContext;
  readonly children: ReactNode;
}

export interface IApiContext {
  readonly contactUs?: IContactUsContext;
  readonly shop?: IShopContext;
  readonly auth?: IAuthContext;
}

type ApisKeys = keyof IApiContext;
type ApiContext = IApiContext[ApisKeys];

export const ApiContext = createContext<IApiContext>({});

const contextGenerator = function* (apis: IApiContext) {
  const entries = Object.entries(apis);

  for (const entry of entries) {
    const key = entry[0] as ApisKeys;
    const value = entry[1] as ApiContext;

    const context = {
      auth: AuthWrapper,
      shop: ShopWrapper,
      contactUs: ContactUsWrapper,
    }[key];

    yield { context, props: value, key };
  }
};

export const ApiWrapper = (props: ApiProps) => {
  const { generator: cxtGenerator, reset } = useGenerator(() => contextGenerator(props.apis));

  const insertContext = (children: ReactNode): ReactNode => {
    const cxt = cxtGenerator.next();

    if (cxt.done || !cxt.value) {
      reset()
      return props.children;
    }

    return (
      <cxt.value.context
        key={cxt.value.key}
        api={cxt.value.props?.api as any}
        config={cxt.value.props?.config as any}
      >
        {insertContext(children)}
      </cxt.value.context>
    );
  };

  return (
    <ApiContext.Provider value={props.apis}>
      {insertContext(props.children)}
    </ApiContext.Provider>
  );
};
