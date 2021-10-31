import request from "@utils/request";
import { message } from "antd";

export class ActircleStore {
    /**
     * 新增文章
     *
     * @memberof UserStore
     */
    addAcricle = async data => {
        console.log(3333, data);
        const { ActricleID, img, name, title } = data;
        if (!ActricleID) {
            message.error("文件上传错误，请重新上传！");
            return false;
        }
        const result = await request.post("userArticle/upload", {
            actricle_name: name,
            actricle_title: title,
            actricle_img: img,
            actricle_id: ActricleID
        });
        console.log(555, result);
    }
}

export default new ActircleStore();
