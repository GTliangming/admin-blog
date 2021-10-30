import { makeAutoObservable, action, reaction } from 'mobx'
import { isPlainObject } from 'lodash'

import { routerStore } from './../'
import { initialUserInfo, syncUserInfo } from './syncUserInfo'
import { LOCALSTORAGE_KEYS } from '@constants/index'
import request from '@utils/request'
import { message } from 'antd'

export class AuthStore {
    /**
     * 用户信息
     *
     * @type {IAuthStore.UserInfo}
     * @memberof AuthStore
     */
    userInfo: IAuthStore.UserInfo = initialUserInfo

    constructor() {
        makeAutoObservable(this)
        reaction(() => this.userInfo, syncUserInfo)
    }

    @action
    login = async (params: IAuthStore.LoginParams) => {
        const result = await request.post<IAuthStore.UserInfo>('user/admin-login', params)
        this.setUserInfo(isPlainObject(result.data.userinfo) ? result.data.userinfo : null)
        localStorage.setItem(LOCALSTORAGE_KEYS.USER_TOKEN, result.data.token)
        message.success('登录成功')
        setTimeout(() => {
            routerStore.replace('/')
        }, 500)
    }

    logout = () => {
        this.setUserInfo(null)
        localStorage.removeItem(LOCALSTORAGE_KEYS.USER_TOKEN)
        routerStore.replace('/login')
    }

    /**
     * 初始化用户信息
     *
     * @memberof AuthStore
     */
    @action
    setUserInfo = (userInfo: IAuthStore.UserInfo): IAuthStore.UserInfo => {
        this.userInfo = userInfo
        return userInfo
    }
}

export default new AuthStore()
