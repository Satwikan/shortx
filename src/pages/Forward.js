import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { db } from "../firebase";

function Forward() {
  const code = useParams()["code"];
  const history = useHistory();
  //   const [url, SetUrl]

  useEffect(() => {
    db.collection("urls")
      .where("code", "==", code)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          if (doc.data().empty) {
            alert("No Such Url");
            history.push("/");
          }
          // Navigate to the Location.reload article by replacing this page
          window.location.replace(
            doc.data().url
          );
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);
  return <div></div>;
}

export default Forward;
