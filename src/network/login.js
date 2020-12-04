import { request } from './request';

export function getCodeImg() {
    return request({
        url: '/prod-api/captchaImage',
        method: 'get'
    })
}