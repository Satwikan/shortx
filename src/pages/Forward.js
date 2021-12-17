import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { db } from "../firebase";

function Forward() {
  const code = useParams()["code"];
  const history = useHistory();
  //   const [url, SetUrl]
  useEffect(() => {
    console.log(code)
    db.collection("urls")
      .where("code", "==", code)
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot);
        if (querySnapshot.docs.length === 0) {
          console.log("Inside IF");
          history.push("/404");
        }
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          window.location.replace(doc.data().url);
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, [code, history]);
  return <></>;
}

export default Forward;
