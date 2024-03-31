import React, { useEffect, useState } from "react";
import axios from "axios";
import { signedUrlData } from "../auth";

const ImageUpload = () => {
  const [signedUrl, setSignedUrl] = useState("");
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);

  const fetchSignedURl = async (event) => {
    const ipEndPoint = process.env.REACT_APP_API_PROTOCOL + "://" + process.env.REACT_APP_API_HOST + ":" + process.env.REACT_APP_API_PORT + "/";
  
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) {
      return;
    }
  
    const uploadPromises = [];
    const previewUrls = [];
    for (const file of selectedFiles) {
      const imageKey = {
        name: file.name,
        size: file.size,
        type: file.type,
      };
      previewUrls.push(URL.createObjectURL(file));
      setImagePreviewUrls(previewUrls);
      uploadPromises.push(
        axios.get(ipEndPoint + "ImageUpload/fetchSignedUrl", {
          params: imageKey
        })
        .then(async (res) => {
          console.log(res.data);
          const signedUrl = res.data.urls;
          if (signedUrl) {
            previewUrls.push(URL.createObjectURL(file));
            const uploadResponse = await fetch(signedUrl, {
              method: 'PUT',
              body: file,
              headers: {
                'Content-Type': file.type,
              },
            });
  
            console.log("uploadResponseuploadResponse", uploadResponse);
  
            if (uploadResponse.ok) {
              console.log('File uploaded successfully!');
            } else {
              console.error('Failed to upload file:', uploadResponse.statusText);
            }
          }
        })
        .catch((err) => {
          console.error(err);
        })
      );
    }
  
  
    await Promise.all(uploadPromises);
    setImagePreviewUrls(previewUrls);
  
    
  };
  console.log(imagePreviewUrls);
  
  

  return (
    <div className="d-flex container-fluid p-5">
    <div className="col-md-2">
      <h4>Awesome Image Uploader</h4>
    </div>
    <div className="col-md-10">
      <div className="upload-image-container">
        <label htmlFor="file-input" className="custom-file-upload">
          Upload Image Component
        </label>
        <input id="file-input" type="file" onChange={fetchSignedURl} style={{ display: 'none' }} multiple/>
      </div>
      <div className="imagedisplaycls">
      <div className="image-preview-container d-flex flex-wrap-nowrap">
        <div className="col-12">
          {imagePreviewUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Preview ${index}`}
              className="preview-image p-2"
            />
          ))}
        </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default ImageUpload;
