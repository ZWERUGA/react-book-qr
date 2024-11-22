/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LayoutImport } from './routes/_layout'
import { Route as AuthSignUpImport } from './routes/auth/sign-up'
import { Route as AuthSignInImport } from './routes/auth/sign-in'
import { Route as LayoutProfileIndexImport } from './routes/_layout/profile/index'
import { Route as LayoutBooksBookIdImport } from './routes/_layout/books/$bookId'

// Create Virtual Routes

const LayoutIndexLazyImport = createFileRoute('/_layout/')()
const LayoutBooksIndexLazyImport = createFileRoute('/_layout/books/')()

// Create/Update Routes

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const LayoutIndexLazyRoute = LayoutIndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => LayoutRoute,
} as any).lazy(() => import('./routes/_layout/index.lazy').then((d) => d.Route))

const AuthSignUpRoute = AuthSignUpImport.update({
  id: '/auth/sign-up',
  path: '/auth/sign-up',
  getParentRoute: () => rootRoute,
} as any)

const AuthSignInRoute = AuthSignInImport.update({
  id: '/auth/sign-in',
  path: '/auth/sign-in',
  getParentRoute: () => rootRoute,
} as any)

const LayoutBooksIndexLazyRoute = LayoutBooksIndexLazyImport.update({
  id: '/books/',
  path: '/books/',
  getParentRoute: () => LayoutRoute,
} as any).lazy(() =>
  import('./routes/_layout/books/index.lazy').then((d) => d.Route),
)

const LayoutProfileIndexRoute = LayoutProfileIndexImport.update({
  id: '/profile/',
  path: '/profile/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutBooksBookIdRoute = LayoutBooksBookIdImport.update({
  id: '/books/$bookId',
  path: '/books/$bookId',
  getParentRoute: () => LayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_layout': {
      id: '/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/auth/sign-in': {
      id: '/auth/sign-in'
      path: '/auth/sign-in'
      fullPath: '/auth/sign-in'
      preLoaderRoute: typeof AuthSignInImport
      parentRoute: typeof rootRoute
    }
    '/auth/sign-up': {
      id: '/auth/sign-up'
      path: '/auth/sign-up'
      fullPath: '/auth/sign-up'
      preLoaderRoute: typeof AuthSignUpImport
      parentRoute: typeof rootRoute
    }
    '/_layout/': {
      id: '/_layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof LayoutIndexLazyImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/books/$bookId': {
      id: '/_layout/books/$bookId'
      path: '/books/$bookId'
      fullPath: '/books/$bookId'
      preLoaderRoute: typeof LayoutBooksBookIdImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/profile/': {
      id: '/_layout/profile/'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof LayoutProfileIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/books/': {
      id: '/_layout/books/'
      path: '/books'
      fullPath: '/books'
      preLoaderRoute: typeof LayoutBooksIndexLazyImport
      parentRoute: typeof LayoutImport
    }
  }
}

// Create and export the route tree

interface LayoutRouteChildren {
  LayoutIndexLazyRoute: typeof LayoutIndexLazyRoute
  LayoutBooksBookIdRoute: typeof LayoutBooksBookIdRoute
  LayoutProfileIndexRoute: typeof LayoutProfileIndexRoute
  LayoutBooksIndexLazyRoute: typeof LayoutBooksIndexLazyRoute
}

const LayoutRouteChildren: LayoutRouteChildren = {
  LayoutIndexLazyRoute: LayoutIndexLazyRoute,
  LayoutBooksBookIdRoute: LayoutBooksBookIdRoute,
  LayoutProfileIndexRoute: LayoutProfileIndexRoute,
  LayoutBooksIndexLazyRoute: LayoutBooksIndexLazyRoute,
}

const LayoutRouteWithChildren =
  LayoutRoute._addFileChildren(LayoutRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof LayoutRouteWithChildren
  '/auth/sign-in': typeof AuthSignInRoute
  '/auth/sign-up': typeof AuthSignUpRoute
  '/': typeof LayoutIndexLazyRoute
  '/books/$bookId': typeof LayoutBooksBookIdRoute
  '/profile': typeof LayoutProfileIndexRoute
  '/books': typeof LayoutBooksIndexLazyRoute
}

export interface FileRoutesByTo {
  '/auth/sign-in': typeof AuthSignInRoute
  '/auth/sign-up': typeof AuthSignUpRoute
  '/': typeof LayoutIndexLazyRoute
  '/books/$bookId': typeof LayoutBooksBookIdRoute
  '/profile': typeof LayoutProfileIndexRoute
  '/books': typeof LayoutBooksIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_layout': typeof LayoutRouteWithChildren
  '/auth/sign-in': typeof AuthSignInRoute
  '/auth/sign-up': typeof AuthSignUpRoute
  '/_layout/': typeof LayoutIndexLazyRoute
  '/_layout/books/$bookId': typeof LayoutBooksBookIdRoute
  '/_layout/profile/': typeof LayoutProfileIndexRoute
  '/_layout/books/': typeof LayoutBooksIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/auth/sign-in'
    | '/auth/sign-up'
    | '/'
    | '/books/$bookId'
    | '/profile'
    | '/books'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/auth/sign-in'
    | '/auth/sign-up'
    | '/'
    | '/books/$bookId'
    | '/profile'
    | '/books'
  id:
    | '__root__'
    | '/_layout'
    | '/auth/sign-in'
    | '/auth/sign-up'
    | '/_layout/'
    | '/_layout/books/$bookId'
    | '/_layout/profile/'
    | '/_layout/books/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  LayoutRoute: typeof LayoutRouteWithChildren
  AuthSignInRoute: typeof AuthSignInRoute
  AuthSignUpRoute: typeof AuthSignUpRoute
}

const rootRouteChildren: RootRouteChildren = {
  LayoutRoute: LayoutRouteWithChildren,
  AuthSignInRoute: AuthSignInRoute,
  AuthSignUpRoute: AuthSignUpRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_layout",
        "/auth/sign-in",
        "/auth/sign-up"
      ]
    },
    "/_layout": {
      "filePath": "_layout.tsx",
      "children": [
        "/_layout/",
        "/_layout/books/$bookId",
        "/_layout/profile/",
        "/_layout/books/"
      ]
    },
    "/auth/sign-in": {
      "filePath": "auth/sign-in.tsx"
    },
    "/auth/sign-up": {
      "filePath": "auth/sign-up.tsx"
    },
    "/_layout/": {
      "filePath": "_layout/index.lazy.tsx",
      "parent": "/_layout"
    },
    "/_layout/books/$bookId": {
      "filePath": "_layout/books/$bookId.tsx",
      "parent": "/_layout"
    },
    "/_layout/profile/": {
      "filePath": "_layout/profile/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/books/": {
      "filePath": "_layout/books/index.lazy.tsx",
      "parent": "/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
