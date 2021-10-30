import { AuthStore as AuthStoreModel } from './index'

export as namespace IAuthStore

export interface AuthStore extends AuthStoreModel { }

export interface LoginParams {
    username: string
    password: string
}

export interface UserInfo {
    userinfo: any
    token: string
}
