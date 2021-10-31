import axios, { AxiosRequestConfig } from "axios";
import { message } from "antd";
import { LOCALSTORAGE_KEYS } from "@constants/index";
const TIMEOUT = 2 * 60000;

// if you want another config, create one!!
const DEFAULTCONFIG: AxiosRequestConfig = {
    baseURL: process.env.BASEURL,
    timeout: TIMEOUT
};

const NO_NEED_AUTH_URLS = ["user/admin-login"];

function getAxiosInstance() {
    const instance = axios.create(DEFAULTCONFIG);
    instance.interceptors.request.use(config => {
        if (!NO_NEED_AUTH_URLS.includes(config.url)) {
            config.headers["Authorization"] = `Bearer ${localStorage.getItem(LOCALSTORAGE_KEYS.USER_TOKEN)}`;
        }
        return config;
    });
    instance.interceptors.response.use(
        function (response) {
            if (response.data.code !== 200) {
                message.error(response.data.message);
                return Promise.reject();
            }
            return response.data;
        },
        function (error) {
            message.error(error.message);
            return Promise.reject(error);
        }
    );
    return instance;
}

export default getAxiosInstance();
