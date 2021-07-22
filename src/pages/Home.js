import React, { useState } from "react";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import "../assets/home.css";

function Home() {
  const [url, setUrl] = useState("");
  const onInputChange = (e) => {
    setUrl(e.target.value);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let code = uuidv4();
    try {
    await db.collection("urls").add({
      url: url,
      code: code,
    });
    alert(code)
}
    catch(e) {
        console.log("Error", e)
    }

  };
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={url}
          onChange={onInputChange}
          placeholder="Enter a Url to short"
        />
        <input type="submit" value="short my url" />
      </form>
    </div>
  );
}

export default Home;
