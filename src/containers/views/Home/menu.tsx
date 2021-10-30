import React from 'react'
import Loadable from '@loadable/component'
import { UserOutlined } from '@ant-design/icons'

import PageLoading from '@components/PageLoading'

const loadComponent = (loader: () => Promise<any>) => Loadable(loader, { fallback: <PageLoading /> })

export const asynchronousComponents = {
    Users: loadComponent(() => import(/* webpackChunkName: "users" */ '@views/Users'))
}

// all routers key
export type AsynchronousComponentKeys = keyof typeof asynchronousComponents

export interface IMenu {
    title: string
    id: number
    pid?: number
    path?: string
    icon?: JSX.Element
    component?: AsynchronousComponentKeys
    exact?: boolean
}

export interface IMenuInTree extends IMenu {
    children?: IMenuInTree[]
}

export const menu: IMenu[] = [
    {
        id: 2,
        path: '/users',
        title: 'Users',
        icon: <UserOutlined />,
        component: 'Users',
        exact: true
    }
]

export default menu
