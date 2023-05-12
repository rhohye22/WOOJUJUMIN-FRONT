import { Link, useParams, Routes, Route, useNavigate } from "react-router-dom";
import MyfreebbsList from "./myfreebbsList";
import MybbsList from "./mybbsList";

import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import "./page.css";
import "./accountInfo.css";

function Mybbspage() {
  let history = useNavigate();
  const [value, setValue] = React.useState("one");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="mybbspage">
      <div className="mybbspageTop">
        {" "}
        <Box sx={{ width: "100%" }}>
          <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example">
            <Tab label="모집 게시판" onClick={() => history("mybbslist")}></Tab>
            <Tab label="자유 게시판" onClick={() => history("myfreebbsList")}></Tab>
          </Tabs>
        </Box>
      </div>
      <div className="mybbspageBottom">
        <Routes>
          <Route path="mybbsList/*" element={<MybbsList />}></Route>

          <Route path="myfreebbsList/*" element={<MyfreebbsList />}></Route>
        </Routes>
      </div>
    </div>
  );
}
export default Mybbspage;
