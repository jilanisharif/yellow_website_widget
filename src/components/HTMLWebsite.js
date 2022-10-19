import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";

const HTMLWebsite = () => {
  const [htmlText, setHtmlText] = useState("");
  const params = useParams();

  useEffect(() => {
    if (params) {
      let websiteImage, botId;
      let paramsData = params.id.split("&&");
      websiteImage = paramsData[0];
      botId = paramsData[1];
      getDownloadURL(
        ref(storage, `yellow-widget-html/${websiteImage}&&${botId}`)
      ).then((url) => {
        (async () => {
          try {
            const response = await fetch("http://localhost:8000/data", {
              mode: "cors",
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ url }),
            });
            const htmlText = await response.json();
            console.log(htmlText, "HTML TEXT");
            setHtmlText(htmlText);
            window.ymConfig.bot = botId;
            var d = document;
            var e = d.createElement("script");
            e.type = "text/javascript";
            e.async = !0;
            e.src =
              "https://cdn.yellowmessenger.com/plugin/widget-v2/latest/dist/main.min.js";
            var t = d.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(e, t);
          } catch (error) {
            console.log(error, "ERROR");
          }
        })();
      });
    }
  }, []);
  return (
    <iframe
      //   src='https://upstox.com/open-demat-account/?f=5GBLTB'
      srcDoc={htmlText}
      allowTransparency='true'
      scrolling='no'
      frameBorder='0'
      title='Website widget'
    ></iframe>
  );
  //   return <div id='yellow'>{htmlText && htmlText}</div>;
};
export default HTMLWebsite;
