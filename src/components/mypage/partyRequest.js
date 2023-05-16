import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "react-js-pagination";
import Table from "react-bootstrap/Table";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

function PartyRequest() {
  let history = useNavigate();
  const [id, setId] = useState("");

  const [requestlist, setRequestlist] = useState([]);
  const [totalPeople, setTotalPeople] = useState("");
  //paging hook
  const [page, setPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const style = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
  };
  // login 되어 있는지 검사
  useEffect(() => {
    let login = JSON.parse(localStorage.getItem("login"));
    if (login !== undefined) {
      // 빈칸이 아닐때

      setId(login.id);
    } else {
      // alert('로그인해 주십시오');
      history("/login");
    }
  }, [history]);
  function myRequestList(page) {
    axios
      .get("http://118.67.132.98:3000/myRequestList", { params: { pageNumber: page, id: id } })
      .then(function(resp) {
        //console.log(resp.data);
        setRequestlist(resp.data.list); // map을 return하기 때문(map 안에 list있음)
        setTotalCnt(resp.data.cnt);

        //console.log(requestlist);
      })
      .catch(function(err) {
        alert(err);
      });
  }
  useEffect(
    function() {
      if (id) {
        myRequestList(0);
      }
    },
    [id]
  );

  function pageChange(page) {
    setPage(page);

    myRequestList(page - 1);
  }

  const gomy = () => {
    history("/mybbsList");
  };
  const goinfo = () => {
    history("/mypage");
  };
  const goparty = () => {
    history("/partyAccept");
  };
  const gomyparty = () => {
    history("/partyList");
  };

  const gobbs = () => {
    history("/partyAccept");
  };
  const gofree = () => {
    history("/partyRequest");
  };
  if (requestlist.length > 0) {
    return (
      <>
        <div className="gamssagi3">
          {/*  <table className="ttable" border="1" style={{ margin: "0 auto" }}> */}
          <Table bordered hover>
            <colgroup>
              <col width="70" />
              <col width="600" />
              <col width="100" />
              <col width="100" />
            </colgroup>
            <thead>
              <tr>
                <th>번호</th>
                <th>파티제목</th>
                <th>참여여부</th>
                <th>모집여부</th>
              </tr>
            </thead>

            <tbody>
              {requestlist.map(function(bbs, i) {
                return (
                  <tr key={i}>
                    <td align="center">{i + 1}</td>
                    <td>
                      <div
                        style={{
                          width: "100%",
                          height: "50px",
                          overflow: "hidden",
                          display: "flex",
                          alignItems: "left",
                        }}
                        onClick={() => history(`/partybbsdetail/${bbs.partySeq}`)}
                      >
                        {bbs.image !== null ? (
                          <img
                            src={`http://118.67.132.98:3000/upload/partybbs/${bbs.image}`}
                            alt="free image"
                            style={{
                              width: 40,
                              height: "auto",
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                          />
                        ) : null}
                        &nbsp;&nbsp;
                        <div
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            cursor: "pointer",
                            flexGrow: 1,
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            height: "100%",
                          }}
                        >
                          {bbs.title}
                        </div>
                      </div>
                    </td>
                    {bbs.check === 0 ? (
                      <td align="center" className="partyWhat">
                        승인대기중
                      </td>
                    ) : (
                      <td align="center" className="partyWhat3">
                        <span style={{ color: "red" }}>참여 확정</span>
                      </td>
                    )}
                    {bbs.full === 0 ? (
                      <td align="center" className="partyWhat">
                        모집 진행중
                      </td>
                    ) : (
                      <td align="center" className="partyWhat2">
                        모집 마감
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <br></br>
          <Pagination activePage={page} itemsCountPerPage={10} totalItemsCount={totalCnt} pageRangeDisplayed={5} prevPageText={"이전"} nextPageText={"다음"} onChange={pageChange} />
        </div>
      </>
    );
  } else {
    return (
      <>
        <br></br>
        <br></br>

        <h3>작성된 내용이 없습니다.</h3>

        <br></br>

        <Pagination activePage={page} itemsCountPerPage={10} totalItemsCount={totalCnt} pageRangeDisplayed={5} prevPageText={"이전"} nextPageText={"다음"} onChange={pageChange} />

        <br></br>
      </>
    );
  }
}

export default PartyRequest;
