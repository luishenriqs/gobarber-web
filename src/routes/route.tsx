import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';
import { useAuth } from '../hooks/Auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}
/* ****************************************************************************
Lógica das rotas:
  Condicionais: Rota privada ou não / Usuário autenticado ou não;

  isPrivate + user auth => Segue para a rota selecionada; => V + V = OK;
  isPrivate + user no auth => Redireciona para Signin; => V + F = Redireciona;
  noPrivate + user auth => Segue para a rota selecionada; => F + V = OK;
  noPrivate + user no auth => Segue para a rota selecionada; => F + F = OK;
***************************************************************************** */

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
