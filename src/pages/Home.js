import React, { useState } from "react";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import "../assets/home.css";
import Logo from "../assets/images/icon.jpg";
import HomeImage from "../assets/images/Home.jpg";

import { useHistory } from "react-router-dom";

import { useMediaQuery } from "react-responsive";

import TextField from "@material-ui/core/TextField";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import { FRONT_URL } from "../FrontURL";

function Home() {
  const history = useHistory();
  const [shortUrl, setShortUrl] = useState(false);
  let imageWidth = "700px";
  let marginLeft = "50px";
  let marginTop = "-35px";
  const isTabletOrMobileDevice = useMediaQuery({
    query: "(max-device-width: 768px)",
  });
  if (isTabletOrMobileDevice) {
    imageWidth = "90vw";
    marginLeft = "0";
    marginTop = "-10px";
  }
  const [url, setUrl] = useState("");
  const onInputChange = (e) => {
    setUrl(e.target.value);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (url === "") {
      alert("We can't do empty url😓");
      return;
    }
    let code = uuidv4();
    try {
      await db.collection("urls").add({
        url: url,
        code: code,
      });
      setShortUrl(`${FRONT_URL}/#/l/${code}`);
    } catch (e) {
      console.log("Error", e);
    }
  };

  const styles = {
    main: {
      display: "grid",
      placeItems: "center",
      minHeight: "100vh",
      backgroundColor: "rgb(255,212,181)",
    },
    head: {
      display: "flex",
      alignItems: "center",
      marginTop: "-15px",
    },
    title: {
      fontSize: "3rem",
      letterSpacing: "0.1rem",
      FontWeight: 300,
    },
    logoImage: {
      aspectRatio: "default",
      height: "2.6rem",
    },
    homeImage: {
      aspectRatio: "default",
      width: imageWidth,
    },
    form: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "20px",
      flexWrap: "wrap",
      marginTop: marginTop,
      width: "90vw",
    },
    button: {
      backgroundColor: "rgb(106,128,228)",
      color: "white",
      borderRadius: "10px",
      border: "2px solid silver",
      fontSize: "1.3rem",
      width: "150px",
      height: "3rem",
      "box-shadow": "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      marginTop: "70px",
    },
  };
  return (
    <div style={styles.main}>
      <div style={styles.head}>
        <img src={Logo} alt="logo" style={styles.logoImage} />
        <p style={styles.title}>ShortX</p>
      </div>
      <p style={{ fontSize: "1.5rem", marginTop: -"55px" }}>
        Short Your Long URLs
      </p>
      <div style={styles.form}>
        <img src={HomeImage} alt="home" style={styles.homeImage} />
        <div
          style={{
            display: "grid",
            placeItems: "center",
            marginLeft: marginLeft,
          }}
        >
          <div>
            <TextField
              id="outlined-basic"
              label="Your URL"
              variant="outlined"
              onChange={onInputChange}
              value={url}
              placeholder="https://www.youtube.com/wat..."
              style={{ height: "2rem" }}
            />
            <ArrowForwardIcon
              onClick={handleFormSubmit}
              style={{ height: "3rem" }}
            />
          </div>
          <div>
            {shortUrl ? (
              <div style={{ marginTop: "20px" }}>
                Here is your short url:
                <br />
                <a
                  href={shortUrl}
                  style={{
                    textDecoration: "underline",
                    textBreak: "break-all",
                    color: "rgb(245,123,103)",
                  }}
                >
                  {shortUrl.slice(0, shortUrl.length / 2)}
                  <br />
                  {shortUrl.slice(shortUrl.length / 2)}
                </a>
                {}
              </div>
            ) : (
              <div style={{ textBreak: "break-all", marginTop: "60px" }}>
                Enter a URL to get your Short URL
              </div>
            )}
          </div>
          <button
            style={styles.button}
            onClick={() => {
              history.push("/all");
            }}
          >
            See All Urls
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
