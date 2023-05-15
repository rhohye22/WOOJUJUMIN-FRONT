import * as React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useParams, Routes, Route, useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import Mypage from "./mypage";
/* import MybbsList from "./mybbsList"; */
/* import MyfreebbsList from "./myfreebbsList";
import PartyAccept from "./partyAccept"; */
/* import PartyRequest from "./partyRequest"; */
import PartyRoom from "./partyRoom";
import PartyList from "./partyList";
import AccountInfo from "./accountInfo";

import Mybbspage from "./mybbspage";
import Mypartypage from "./mypartypage";

import "./page.css";
import "./accountInfo.css";

import "./myinfo.css";

function MyInfo() {
  let history = useNavigate();

  const style = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
  };
  /* 
  const gomy = () => {
    history("mybbspage/mybbslist");
  };
  const goinfo = () => {
    history("/myinfo/mypage");
  };
  const goparty = () => {
    history("mypartypage/partyAccept");
  };
  const gomyparty = () => {
    history("/myinfo/partyList");
  };
 */
  return (
    <div className="mypagetotal">
      <div className="mypagenav">
        <br /> <br />
        <List component="nav" aria-label="mailbox folders">
          <ListItem button>
            <ListItemText primary="회원정보 수정" onClick={() => history("/myinfo/mypage")}></ListItemText>
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="내가 쓴 글보기" onClick={() => history("mybbspage/mybbslist")}></ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText primary="참여 수락▪요청" onClick={() => history("mypartypage/partyAccept")}></ListItemText>
          </ListItem>
          <Divider light />
          <ListItem button>
            <ListItemText primary="나의 참여모임" onClick={() => history("partyList")}></ListItemText>
          </ListItem>
        </List>
      </div>
      <div className="mypagecontent">
        <Routes>
          {/*   <Route path="accountInfo/*" element={<AccountInfo />}></Route> */}
          <Route path="mybbspage/*" element={<Mybbspage />}></Route>
          <Route path="mypartypage/*" element={<Mypartypage />}></Route>
          {/* <Route path="partyAccept/*" element={<PartyAccept />}></Route> */}
          {/* <Route path="partyRequest/*" element={<PartyRequest />}></Route> */}
          <Route path="partyRoom/:seq" element={<PartyRoom />}></Route>
          <Route path="partyList/*" element={<PartyList />}></Route>
          <Route path="mypage/*" element={<Mypage />}></Route>
          {/*  <Route path="myfreebbsList/*" element={<MyfreebbsList />}></Route> */}
        </Routes>
      </div>
    </div>
  );
}
export default MyInfo;
