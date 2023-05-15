import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./partylistcss.css";
import base from "./image/base.png";
import { Button } from "react-bootstrap";

function Partybbslist() {
  let history = useNavigate();
  const [id, setId] = useState("");
  const [pbslist, setPbslist] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [limit, setLimit] = useState(5);
  const [tag, setTag] = useState(0);
  const [page, setPage] = useState(0);
  const [temptag, setTempTag] = useState(0);
  const postsContainerRef = useRef(null);
  const categories = ["농구", "축구", "야구", "예능", "드라마/영화", "게임", "음식", "함께", "탐사", "잡담"];
  const ptype = ["관람", "팀원"];
  useEffect(() => {
    let login = JSON.parse(localStorage.getItem("login"));
    if (login === undefined || login === null) {
      // 빈칸이 아닐때

      alert("로그인해 주십시오");
      history("/login");
    } else {
      setId(login.id);
    }
  }, [history]);

  // Fetch posts from API

    async function getPartybbs() {
      try {
        const response = await axios.get(`http://118.67.132.98:3000/getAllpbslist`, { params:{"pageNumber":page, "tag":tag}});
        // console.log(response.data);
        setPbslist(response.data);
        // console.log(JSON.stringify(response.data[0]));
        const str = JSON.stringify(response.data.list);
        const data = JSON.parse(str);
        // console.log(data);
        return data;
      } catch (error) {
        console.log(error);
      }

    }

    useEffect(() => {
      axios
        .get(`http://118.67.132.98:3000/getAllpbslist`, { params:{"pageNumber":page}})
        .then((response) => {
          // console.log(response.data);
          // console.log(JSON.stringify(response.data.list[0]));
          // console.log(JSON.parse(JSON.stringify(response.data.list)));
          setPbslist(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

  async function loadPosts(resetPage) {
    setLoading(true);
    if (tag !== temptag || resetPage) {
      setPage(0);
      setTempTag(tag);
      console.log("chk1");
    } else {
      setLoading(true);
      console.log("chk else");
    }
    console.log("load0 : " + page);
    const newPosts = await getPartybbs();
    console.log("load1 : " + page);
    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    setLoading(false);
    setPage((prevPage) => prevPage + 1);
  }

  useEffect(() => {
    loadPosts(true);
  }, [tag]);

  function selcat(e) {
    setPage(0);
    setTag(parseInt(e.target.value));
    setPosts([]);
    // loadPosts(true);
  }

  useEffect(() => {
    function handleScroll() {
      const { scrollTop, scrollHeight, clientHeight } = postsContainerRef.current;
      if (scrollTop + clientHeight >= scrollHeight && !loading) {
        loadPosts();
      }
    }

    if (postsContainerRef.current) {
      postsContainerRef.current.addEventListener("scroll", handleScroll);
    }
    console.log(loading);
    return () => {
      if (postsContainerRef.current) {
        postsContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loading]);

  function filterPosts(e) {
    setFilterText(e.target.value.toUpperCase());
  }

  const filteredPosts = posts.filter((post) => post.title.toUpperCase().includes(filterText) || post.body.toUpperCase().includes(filterText));
  {
    /* <div key={post.partySeq} className="post" style={{ display: 'inline-block', width: '48%' }}> */
  }

  // function selcat(e) {
  //   setTag(parseInt(e.target.value));
  //   //setPage(0);
  //   setPosts([]);

  //   loadPosts();

  // }

  const partyWrite = () => {
    document.location.href = "/partybbs";
  };

  return (
    <div className="partybbslist-container">
      <br />
      <Button variant="outline-secondary" value={0} onClick={selcat}>
        전체
      </Button>
      &nbsp;&nbsp;
      <Button variant="outline-secondary" value={1} onClick={selcat}>
        농구
      </Button>
      &nbsp;&nbsp;
      <Button variant="outline-secondary" value={2} onClick={selcat}>
        축구
      </Button>
      &nbsp;&nbsp;
      <Button variant="outline-secondary" value={3} onClick={selcat}>
        야구
      </Button>
      &nbsp;&nbsp;
      <Button variant="outline-secondary" value={4} onClick={selcat}>
        예능
      </Button>
      &nbsp;&nbsp;
      <Button variant="outline-secondary" value={5} onClick={selcat}>
        드라마/영화
      </Button>
      &nbsp;&nbsp;
      <Button variant="outline-secondary" value={6} onClick={selcat}>
        게임
      </Button>
      &nbsp;&nbsp;
      <Button variant="outline-secondary" value={7} onClick={selcat}>
        음식
      </Button>
      &nbsp;&nbsp;
      <Button variant="outline-secondary" value={8} onClick={selcat}>
        함께
      </Button>
      &nbsp;&nbsp;
      <Button variant="outline-secondary" value={9} onClick={selcat}>
        탐사
      </Button>
      &nbsp;&nbsp;
      <Button variant="outline-secondary" value={10} onClick={selcat}>
        잡담
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to={`/partybbs`}>
        <Button>파티모집!</Button>
      </Link>
      <br />
      <br />
      {/* <div className="filter-container">
          <input type="text" placeholder="Filter posts..." onInput={filterPosts} />
        </div> */}
        <div className="posts-container" ref={postsContainerRef}>
          {/* {filteredPosts.filter(post => post.tag === tag).map((post) => (  */}
          {filteredPosts.map((post) => (
          <div key={post.partySeq} className="post" onClick={() => history(`/partybbsdetail/${post.partySeq}`)}>      
              <div className="post-info">                         

                {/* <img src={post.image ? `http://118.67.132.98:3000/upload/partybbs/${post.image.substring(80)}` : base} alt=''  width="150" height="150"/> */}
                <img src={post.image ? `http://118.67.132.98:3000/upload/partybbs/${post.image}` : base} alt=''  width="150" height="150"/>
                <div className="post-body">
                <p >{categories[Number(post.tag-1)]}</p>
                </div>
             
                {/* <Link to={`/partybbsdetail/${post.partySeq}`}> */}
                  <h2 className="post-title">{post.title}</h2>
                {/* </Link> */}
                <div className='postpcl'>
                  <p> {ptype[Number(post.partytype-1)]} · 모임날짜 · {post.mdate.substring(5,16)}</p>
                  <p> 모집입원 : {post.people}</p>    
                </div>                                
              </div>
            </div>
          ))}
          {loading && <div className="loader">Loading...</div>}
        </div>
      </div>
  );
}

export default Partybbslist;
