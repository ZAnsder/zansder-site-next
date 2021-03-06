import React from 'react';
import { renderRoutes } from 'react-router-config';
import { useLocation, Redirect } from 'react-router-dom';

export const AppRoute = (props: any) => {
  const { pathname } = useLocation()

  return (
    <>
      {pathname === '/' && <Redirect to={'/home'} />}
      {renderRoutes(props.route.routes)}
    </>
  )
}

export default AppRoute;
