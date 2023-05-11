import * as React from "react";
import { Link, useParams, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "react-js-pagination";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import MyfreebbsList from "./myfreebbsList";
import PartyAccept from "./partyAccept";
import PartyRequest from "./partyRequest";
function Mypartypage() {
  let history = useNavigate();

  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="mypartypage">
      <div className="mypartypageTop">
        <Box sx={{ width: "100%" }}>
          <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example">
            <Tab label="파티 수락" onClick={() => history("partyAccept")}></Tab>
            <Tab label="파티 요청" onClick={() => history("partyRequest")}></Tab>
          </Tabs>
        </Box>
      </div>
      <div className="mypartypageBottom">
        <Routes>
          <Route path="partyAccept/*" element={<PartyAccept />}></Route>
          <Route path="partyRequest/*" element={<PartyRequest />}></Route>
        </Routes>
      </div>
    </div>
  );
}
export default Mypartypage;
