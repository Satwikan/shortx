import React from "react";
import NotFoundImage from "../assets/images/notFound.jpg";
import { useHistory } from "react-router-dom";

import { useMediaQuery } from "react-responsive";

function NotFound() {
  const history = useHistory();
  let imageWidth = "600px";
  const isTabletOrMobileDevice = useMediaQuery({
    query: "(max-device-width: 768px)",
  });
  if (isTabletOrMobileDevice) {
    imageWidth = "100vw";
  }
  const styles = {
    main: {
      display: "grid",
      placeItems: "center",
      backgroundColor: "rgb(223,248,235)",
      minHeight: "100vh",
    },
    image: {
      aspectRatio: "default",
      width: imageWidth,
    },
    head: {
      fontSize: "3rem",
      letterSpacing: "0.1rem",
    },
    description: {
      fontSize: "1.5rem",
      marginTop: "-10vh",
    },
    button: {
      backgroundColor: "rgb(50,55,65)",
      color: "white",
      borderRadius: "10px",
      border: "2px solid silver",
      marginBottom: "10vh",
      fontSize: "1.3rem",
      width: "200px",
      height: "3rem",
      "box-shadow": "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    },
  };
  const onReturnHome = () => {
    
    history.push("/");
  };
  return (
    <div style={styles.main}>
      <img src={NotFoundImage} alt="Not Found" style={styles.image} />
      <p style={styles.head}>Lost in Space ?</p>
      <p style={styles.description}>There is No such URL</p>
      <button style={styles.button} onClick={onReturnHome}>
        Take me Home
      </button>
    </div>
  );
}

export default NotFound;
