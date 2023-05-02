import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";

function CalendarList() {
  let navigate = useNavigate();

  const { rdate } = useParams();

  const [daylist, setDaylist] = useState([]);

  useEffect(
    function() {
      async function fetchData() {
        await axios
          .get("http://localhost:3000/getDayListFront", { params: { rdate: rdate } })
          .then(function(res) {
            // alert(JSON.stringify(res.data));
            // alert(JSON.stringify(res.data[0]));
            setDaylist(res.data);
          })
          .catch(function(err) {
            alert(err);
          });
      }

      fetchData();
    },
    [rdate]
  );

  function calendarlist() {
    const year = rdate.substring(0, 4);
    const month = rdate.substring(4, 6);
    const yyyymm = rdate.substring(0, 6);
    navigate(`/calendar/${year}/${month}/${yyyymm}`);
  }
  return (
    <div className="calisttable">
      <Table bordered hover>
        <colgroup>
          <col width={"150px"} />
          <col width={"350px"} />
          <col width={"80px"} />
        </colgroup>
        <tbody>
          <tr>
            <th>제목</th>
            <th>내용</th>
            <th>시간</th>
          </tr>
          {daylist && daylist.length ? ( // daylist 배열이 존재하고 길이가 0보다 크면
            daylist.map(function(day, i) {
              return (
                <tr key={i}>
                  <td>{day.title}</td>
                  <td>{day.content}</td>
                  <td>
                    {day.rdate.substring(8, 10)}:{day.rdate.substring(10, 12)}
                  </td>
                </tr>
              );
            })
          ) : (
            <td colSpan={3}>등록된 일정이 없습니다</td>
          )}
        </tbody>
      </Table>
    </div>
  );
}
export default CalendarList;
