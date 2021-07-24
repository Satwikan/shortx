import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { FRONT_URL } from "../FrontURL";

import { useMediaQuery } from "react-responsive";

const rowsHead = [
  { data: "S.no", width: "20px" },
  { data: "URL", width: "40vw" },
  { data: "Generated short URL", width: "40vw" },
];

const styles = {
  head: {
    display: "flex",
    marginLeft: "20px",
  },
};

function AllUrls() {
  let tableWidth = "800px";
  const isTabletOrMobileDevice = useMediaQuery({
    query: "(max-device-width: 768px)",
  });
  if (isTabletOrMobileDevice) {
    tableWidth = "90vw";
  }
  const useStyles = makeStyles({
    root: {
      width: tableWidth,
    },
    container: {
      maxHeight: 440,
    },
  });
  const history = useHistory();
  const [urls, setUrls] = useState([]);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const Link = ({ url }) => {
    return (
      <a
        href={url}
        style={{
          textDecoration: "none",
          color: "rgb(245,123,103)",
          textBreak: "break-all",
        }}
        target="_blank"
        rel="noreferrer"
      >
        {isTabletOrMobileDevice ? url.slice(0, 15) + "..." : url}
      </a>
    );
  };
  useEffect(() => {
    db.collection("urls")
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot);
        // if (querySnapshot.docs.length === 0) {
        //   console.log("Inside IF");
        //   history.push("/404");
        // }
        let count = 0;
        let lst = querySnapshot.docs.map((item) => {
          count++;
          let d = item.data();
          d.count = count;
          d.code = <Link url={`${FRONT_URL}/#/l/${item.data().code}`} />;
          d.url = <Link url={item.data().url} />;
          console.log(d);
          return d;
        });
        console.log(lst);
        setUrls(lst);
        // console.log(querySnapshot.docs);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);
  return (
    <div style={{}}>
      <div style={styles.head}>
        <ArrowBackIcon
          onClick={() => {
            history.push("/");
          }}
          style={{ marginTop: "25px", marginRight: "40px" }}
        />
        <p style={{ fontSize: "1.3rem" }}>Go Back</p>
      </div>
      <div
        style={{
          display: "grid",
          placeItems: "center",
          backgroundColor: "rgb(255, 233, 218)",
        }}
      >
        <p
          style={{
            fontSize: "2.5rem",
            textAlign: "center",
            letterSpacing: "0.1rem",
          }}
        >
          ALL URLS
        </p>
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {rowsHead.map((row) => (
                    <TableCell
                      key={row.data}
                      align="center"
                      style={{ width: row.width }}
                    >
                      {row.data}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {/* <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={} align="center">
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody> */}
              <TableBody>
                {urls
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((urlData) => {
                    return (
                      <TableRow key={urlData.key}>
                        <TableCell align="center">{urlData.count}</TableCell>
                        <TableCell align="center">{urlData.url}</TableCell>
                        <TableCell align="center">{urlData.code}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={urls.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
}

export default AllUrls;
