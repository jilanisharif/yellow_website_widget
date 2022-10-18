import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";

const Website = () => {
  const [url, setUrl] = useState(null);
  const [yellowBotId, setYellowBotId] = useState(null);
  const params = useParams();

  useEffect(() => {
    if (params) {
      let websiteImage, botId;
      let paramsData = params.id.split("&&");
      websiteImage = paramsData[0];
      botId = paramsData[1];
      getDownloadURL(
        ref(storage, `yellow-widget-images/${websiteImage}&&${botId}`)
      ).then((url) => {
        setUrl(url);
        setYellowBotId(botId);
        window.ymConfig.bot = botId;
        var d = document;
        // var i = function () {
        //   i.c(arguments);
        // };
        var e = d.createElement("script");
        e.type = "text/javascript";
        e.async = !0;
        e.src =
          "https://cdn.yellowmessenger.com/plugin/widget-v2/latest/dist/main.min.js";
        var t = d.getElementsByTagName("script")[0];
        t.parentNode.insertBefore(e, t);
      });
    }
  }, []);

  return (
    <div id='yellow'>{yellowBotId && <img src={url} alt='website' />}</div>
  );
};
export default Website;
