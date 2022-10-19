import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

import { Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, Spin } from "antd";
import { Alert } from "antd";

// import file from "fs";

const RightContainer = () => {
  let navigate = useNavigate();

  const [spin, setSpin] = useState(false);
  const [image, setImage] = useState(null);
  const [botId, setBotId] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [error, setError] = useState("");
  const [generateButton, setGenerateButton] = useState(false);
  useEffect(() => {
    if (websiteUrl.length > 3 || image) {
      setGenerateButton(true);
    }
    return () => {
      setError("");
    };
  }, [websiteUrl, image]);

  const checkBotId = (id) => {
    const regex = new RegExp("^x[0-9]{13}$");
    return regex.test(id);
  };

  const checkUrl = (url) => {
    var urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // validate protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // validate fragment locator
    return urlPattern.test(url);
  };

  const dummyRequest = async ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const generateWebsite = () => {
    if (botId && websiteUrl) {
      if (!checkBotId(botId)) {
        return setError("Bot id is not valid");
      } else if (!checkUrl(websiteUrl)) {
        return setError("URL is not valid");
      } else {
        (async () => {
          let url;

          if (websiteUrl.startsWith("http")) {
            url = websiteUrl;
          } else if (websiteUrl.startsWith("www")) {
            url = `https://${websiteUrl}`;
          } else url = `https://www.${websiteUrl}`;
          try {
            setSpin(true);
            let body = { url };
            console.log(body, "BODY TO SEND");
            const response = await fetch("http://localhost:8000/data", {
              mode: "cors",
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            });
            const data = await response.json();
            console.log(data, "DATA");
            // const response = await fetch(url, requestOptions);
            const htmlText = await data;
            if (htmlText) {
              const fileName = v4() + "&&" + botId;
              const blob = new Blob([htmlText], { type: "text/plain" });
              const htmlReference = ref(
                storage,
                `yellow-widget-html/${fileName}`
              );

              uploadBytes(htmlReference, blob).then((response) => {
                navigate("/website/html/" + response.metadata.name);
                setSpin(false);
              });
            } else {
              return setError("URL is not valid");
            }
          } catch (error) {
            console.log(error, "ERROR");
          }
        })();
      }
    } else if (botId && image) {
      if (!checkBotId(botId)) {
        return setError("Bot id is not valid");
      } else {
        setSpin(true);
        const imageReference = ref(
          storage,
          `yellow-widget-images/${v4()}&&${botId}`
        );
        uploadBytes(imageReference, image).then((response) => {
          navigate("/website/" + response.metadata.name);
          setSpin(false);
        });
      }
    } else return setError("Please fill the required fields");
  };

  const props = {
    listType: "picture",
    customRequest: dummyRequest,

    beforeUpload(file) {
      return new Promise((resolve) => {
        if (
          file.type === "image/png" ||
          file.type === "image/jpg" ||
          file.type === "image/jpeg"
        ) {
          if (file.size >= 3 * 1024 * 1024) {
            return setError("Please upload a file less than 3 MB");
          }
          setError("");
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            const img = document.createElement("img");
            img.src = reader.result;

            img.onload = () => {
              const canvas = document.createElement("canvas");
              canvas.width = img.naturalWidth;
              canvas.height = img.naturalHeight;
              const ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0);
              ctx.fillStyle = "red";
              ctx.textBaseline = "middle";
              ctx.font = "33px Arial";
              ctx.fillText("Ant Design", 20, 20);
              setImage(file);
              canvas.toBlob((result) => resolve(result));
            };
          };
        } else {
          setError("Please upload only PNG or JPG or JPEG");
        }
        return false;
      });
    },
    onChange: (info) => {
      if (info.fileList.length === 0) {
        setImage("");
        setGenerateButton(false);
      }
    },
  };

  return (
    <div className='right-container-body'>
      {spin && (
        <div className='spinner'>
          <Spin />
        </div>
      )}
      {error && <Alert message={error} type='error' showIcon />}
      <label htmlFor='botId'>Bot Id*</label>
      <Input
        name='botId'
        onChange={(event) => {
          setBotId(event.target.value);
        }}
        value={botId}
        placeholder='x1665470123077'
        required
      />
      <br />
      <br />
      {!image && (
        <>
          <label htmlFor='websiteUrl'>Website URL</label>
          <Input
            name='websiteUrl'
            onChange={(event) => {
              setWebsiteUrl(event.target.value);
            }}
            value={websiteUrl}
            placeholder='https://www.yellow.ai'
            required
          />
        </>
      )}
      {!image && !websiteUrl && <div className='url-or-image'>or</div>}
      {!websiteUrl && (
        <div className='upload-area'>
          <Upload {...props}>
            {!image && (
              <Button icon={<UploadOutlined />} block>
                Upload Website Image
              </Button>
            )}
          </Upload>
        </div>
      )}
      <div className='generate-button'>
        {generateButton && (
          <Button onClick={generateWebsite}>Generate Website</Button>
        )}
      </div>
    </div>
  );
};

export default RightContainer;
