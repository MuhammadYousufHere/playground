import React, { FC } from "react";
import Login from "../pages/Login";
import Event from "../pages/Event";
import { Navigate } from "react-router-dom";


export interface IRoute {
  path: string;
  element: React.ComponentElement<any, any>;
}

export enum RouteNames {
  LOGIN = '/login',
  EVENT = '/'
}

export const publicRoutes: IRoute[] = [
  { path: RouteNames.LOGIN, element: <Login/>},
  { path: '*', element: <Navigate to={ RouteNames.LOGIN } />},

]

export const privateRoutes: IRoute[] = [
  { path: RouteNames.EVENT, element: <Event/>},
  { path: '*', element: <Navigate to={ RouteNames.EVENT } />},
]