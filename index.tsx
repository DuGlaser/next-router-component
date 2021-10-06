import {
  getRouteMatcher,
  getRouteRegex,
} from 'next/dist/shared/lib/router/utils';
import { useRouter } from 'next/router';
import React, { ReactElement, ReactNode, useEffect, useState } from 'react';

const isClient = typeof window !== 'undefined';

type ReturnComponent<T> = (params?: T) => ReactNode;

type PickOne<T> = {
  [U in keyof T]: Record<U, T[U]> &
    Partial<Record<Exclude<keyof T, U>, undefined>>;
}[keyof T];

type Props<T = { [key: string]: string | string[] }> = {
  path: string;
} & PickOne<{
  render: ReturnComponent<T>;
  children: ReturnComponent<T>;
}>;

export function Route<T extends { [key: string]: string | string[] }>({
  path,
  children,
  render,
}: Props<T>): ReactElement {
  const router = useRouter();
  const [match, setMatch] =
    useState<ReturnType<ReturnType<typeof getRouteMatcher>>>(false);

  useEffect(() => {
    if (!isClient) {
      setMatch(null);
      return;
    }

    const routerRegex = getRouteRegex(path);
    const routerMather = getRouteMatcher(routerRegex);

    const { pathname } = window.location;
    const match = routerMather(pathname) as false | T;

    setMatch(match);
  }, [router.asPath, path]);

  if (!match) {
    return null;
  }

  const renderChildren = children ?? render;

  return <>{renderChildren(match as T)}</>;
}
