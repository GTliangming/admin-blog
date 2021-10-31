import { formItemLayout2 } from "@components/fromItemLayout";
import { Button, Form, Input, message, Modal, Upload, UploadProps } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import React from "react";
import { InboxOutlined } from "@ant-design/icons";
const { Dragger } = Upload;
import styles from "./index.scss";
import ActircleStore from "@store/actircleStore";
import { LOCALSTORAGE_KEYS } from "@constants/index";
function Test() {
    const [ActricleID, setActricleID] = React.useState(null);
    const [visible, setVisible] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    async function onFinish(values: any) {
        await ActircleStore.addAcricle({ ...values, ActricleID });
    }
    const uploadProps: UploadProps = {
        action: `${process.env.BASEURL}article/upload-file`,
        accept: "md",
        headers: {
            Authorization: `Bearer ${localStorage.getItem(LOCALSTORAGE_KEYS.USER_TOKEN)}`
        },
        onChange: (info: UploadChangeParam) => {
            const { status, response } = info.file;
            if (status === "done") {
                setLoading(false);
                if (response.code === 200) {
                    setActricleID(response.actricle_id);
                } else {
                    message.error(response.message);
                }
            } else if (status === "error") {
                setLoading(false);
                message.error(response.message);
            } else if (status === "uploading") {
                setLoading(true);
            }
        }
    };
    return (
        <div className={styles.box}>
            <div className={styles.top}>
                <Button type="primary" onClick={() => setVisible(true)}>
                    上传文章
                </Button>
            </div>
            <Modal title="上传文章" visible={visible} onCancel={() => setVisible(false)} footer={null}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="文章名称"
                        name="name"
                        {...formItemLayout2}
                        rules={[{ required: true, message: "请输入文章名称" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="文章标题"
                        name="title"
                        {...formItemLayout2}
                        rules={[{ required: true, message: "请输入文章标题" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="文章封面" name="img" {...formItemLayout2}>
                        <Input />
                    </Form.Item>
                    {/* <Row>
                        <Col span={4} style={{ textAlign: 'right', paddingRight: '8px' }}>
                            文章内容 :
                        </Col>
                        <Col span={20}>
                            <Dragger {...uploadProps}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">点击或拖拽上传</p>
                            </Dragger>
                        </Col>
                    </Row> */}
                    <Form.Item
                        label="文章内容"
                        {...formItemLayout2}
                        rules={[{ required: true, message: "请上传文件" }]}
                    >
                        <Dragger {...uploadProps}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">点击或拖拽上传</p>
                        </Dragger>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4, span: 12 }}>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
export default Test;
