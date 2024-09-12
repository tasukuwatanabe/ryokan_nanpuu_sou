/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as RegisterImport } from './routes/register'
import { Route as LoginImport } from './routes/login'
import { Route as AuthImport } from './routes/_auth'
import { Route as IndexImport } from './routes/index'
import { Route as RoomsRoomIdImport } from './routes/rooms/$roomId'
import { Route as AuthMypageImport } from './routes/_auth/mypage'

// Create/Update Routes

const RegisterRoute = RegisterImport.update({
  path: '/register',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const RoomsRoomIdRoute = RoomsRoomIdImport.update({
  path: '/rooms/$roomId',
  getParentRoute: () => rootRoute,
} as any)

const AuthMypageRoute = AuthMypageImport.update({
  path: '/mypage',
  getParentRoute: () => AuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterImport
      parentRoute: typeof rootRoute
    }
    '/_auth/mypage': {
      id: '/_auth/mypage'
      path: '/mypage'
      fullPath: '/mypage'
      preLoaderRoute: typeof AuthMypageImport
      parentRoute: typeof AuthImport
    }
    '/rooms/$roomId': {
      id: '/rooms/$roomId'
      path: '/rooms/$roomId'
      fullPath: '/rooms/$roomId'
      preLoaderRoute: typeof RoomsRoomIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  AuthRoute: AuthRoute.addChildren({ AuthMypageRoute }),
  LoginRoute,
  RegisterRoute,
  RoomsRoomIdRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth",
        "/login",
        "/register",
        "/rooms/$roomId"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/mypage"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/register": {
      "filePath": "register.tsx"
    },
    "/_auth/mypage": {
      "filePath": "_auth/mypage.tsx",
      "parent": "/_auth"
    },
    "/rooms/$roomId": {
      "filePath": "rooms/$roomId.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
