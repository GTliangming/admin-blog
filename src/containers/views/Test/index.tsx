import { Button, message, Upload, UploadProps } from 'antd'
import { UploadChangeParam } from 'antd/lib/upload'
import React from 'react'

import styles from './index.scss'

function Test() {
    const [htmlStr, sethtmlStr] = React.useState('')
    const uploadProps: UploadProps = {
        action: `${process.env.BASEURL}article/upload`,
        accept: 'md',
        beforeUpload: data => {
            console.log(data)
            return true
        },
        onChange: (info: UploadChangeParam) => {
            const { status, name, response } = info.file
            if (status === 'done') {
                console.log(33333, response.htmlStr)
                sethtmlStr(response.htmlStr)
                message.success(`${name} upload success.`)
            } else if (status === 'error') {
                message.error(`${name} upload fail.`)
            } else if (status === 'uploading') {
            }
        },
        showUploadList: false
    }
    return (
        <div className={styles.container}>
            测试页
            <Upload {...uploadProps}>
                <Button type="primary">上传</Button>
            </Upload>
            <div dangerouslySetInnerHTML={{ __html: `${htmlStr}` }} style={{ width: '100%' }}></div>
        </div>
    )
}
export default Test
