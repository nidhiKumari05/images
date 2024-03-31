
import axios from "axios";

const ipEndPoint = process.env.REACT_APP_API_PROTOCOL + "://" + process.env.REACT_APP_API_HOST + ":" + process.env.REACT_APP_API_PORT + "/";

export const signedUrlData = async () => {
    return await axios.get(ipEndPoint  + "ImageUpload/fetchSignedUrl");
};