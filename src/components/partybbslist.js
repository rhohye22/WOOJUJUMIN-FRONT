import React, { useEffect, useState, useRef } from 'react'
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import './partylistcss.css';
import base from './image/base.png';
import { Button } from 'react-bootstrap';

function Partybbslist(){
    let history = useNavigate();
    const [id, setId] = useState('');
    const [pbslist, setPbslist] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [limit, setLimit] = useState(5);
    const [tag, setTag] = useState();
    const [page, setPage] = useState(0);
    const postsContainerRef = useRef(null);
    const categories = [
      '농구',
      '축구',
      '야구',
      '예능',
      '드라마/영화',
      '게임',
      '음식',
      '함께',
      '탐사',
      '잡담'
    ];
    console.log(tag)
    console.log(typeof(tag))
    useEffect(() => {
      let login = JSON.parse(localStorage.getItem("login"));
      if(login === undefined || login === null){ // 빈칸이 아닐때

          alert('로그인해 주십시오');
          history('/login');
          
      }else{
         
         setId(login.id);
      }
            
  }, [history]);

    // Fetch posts from API

    async function getPartybbs() {
      try {
        const response = await axios.get(`http://localhost:3000/getAllpbslist`, { params:{"pageNumber":page, "tag":tag}});
        console.log(response.data);
        setPbslist(response.data);
        console.log(JSON.stringify(response.data[0]));
        const str = JSON.stringify(response.data.list);
        const data = JSON.parse(str);
        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
      }

    }

    useEffect(() => {
      axios
        .get(`http://localhost:3000/getAllpbslist`, { params:{"pageNumber":page}})
        .then((response) => {
          console.log(response.data);
          console.log(JSON.stringify(response.data.list[0]));
          console.log(JSON.parse(JSON.stringify(response.data.list)));
          setPbslist(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    async function loadPosts() {
      setLoading(true);
      const newPosts = await getPartybbs();
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setLoading(false);
      setPage((prevPage) => prevPage + 1);
      console.log(page);
    }
  
    useEffect(() => {
      loadPosts();
    }, []);

    useEffect(() => {
      setPage(0);
    }, [tag]);
    // useEffect(() => {
    //   function handleScroll() {
    //     if (
    //       window.innerHeight + document.documentElement.scrollTop ===
    //       document.documentElement.offsetHeight
    //     ) {
    //       loadPosts();
    //     }
    //   }
  
    //   window.addEventListener('scroll', handleScroll);
    //   return () => window.removeEventListener('scroll', handleScroll);
    // }, [loading]);
    useEffect(() => {
      function handleScroll() {
        const { scrollTop, scrollHeight, clientHeight } = postsContainerRef.current;
        if (scrollTop + clientHeight >= scrollHeight) {
          loadPosts();
        }
      }
  
      if (postsContainerRef.current) {
        postsContainerRef.current.addEventListener('scroll', handleScroll);
      }

      return () => {
    if (postsContainerRef.current) {
      postsContainerRef.current.removeEventListener('scroll', handleScroll);
    }
  };
    }, [loading]);
  
    function filterPosts(e) {
      setFilterText(e.target.value.toUpperCase());
    }
  
    const filteredPosts = posts.filter(
      (post) =>
        post.title.toUpperCase().includes(filterText) ||
        post.body.toUpperCase().includes(filterText)
    );
      {/* <div key={post.partySeq} className="post" style={{ display: 'inline-block', width: '48%' }}> */}

    function selcat(e) {
      setTag(parseInt(e.target.value));
      setPage(0);

      setPosts([]);

      loadPosts();
       
    }

    const partyWrite = () => {
      document.location.href = '/partybbs';
    }

    return (
      <div className="partybbslist-container">
              <br />
      <button value={0} onClick={selcat}>
        전체
      </button>
      <button value={1} onClick={selcat}>
        농구
      </button>
      <button value={2} onClick={selcat}>
        축구
      </button>
      <button value={3} onClick={selcat}>
        야구
      </button>
      <button value={4} onClick={selcat}>
        예능
      </button>
      <button value={5} onClick={selcat}>
        드라마/영화
      </button>
      <button value={6} onClick={selcat}>
        게임
      </button>
      <button value={7} onClick={selcat}>
        음식
      </button>
      <button value={8} onClick={selcat}>
        함께
      </button>
      <button value={9} onClick={selcat}>
        탐사
      </button>
      <button value={10} onClick={selcat}>
        잡담
      </button>
        {/* <div className="filter-container">
          <input type="text" placeholder="Filter posts..." onInput={filterPosts} />
        </div> */}
        <div className="posts-container" ref={postsContainerRef}>
          {/* {filteredPosts.filter(post => post.tag === tag).map((post) => (  */}
          {filteredPosts.map((post) => (
          <div key={post.partySeq} className="post">      
              <div className="post-info">                         

                {/* <img src={post.image ? `http://localhost:3000/upload/partybbs/${post.image.substring(80)}` : base} alt=''  width="150" height="150"/> */}
                <img src={post.image ? `http://localhost:3000/upload/partybbs/${post.image}` : base} alt=''  width="150" height="150"/>
                <div className="post-body">
                <p>{categories[Number(post.tag-1)]}</p>
                </div>
             
                <Link to={`/partybbsdetail/${post.partySeq}`}>
                  <h2 className="post-title">{post.title}</h2>
                </Link>
                  <p >모집입원 : {post.people}</p>                          
                  <p >모임날짜 : {post.mdate.substring(5,16)}</p>
          
              </div>
            </div>
          ))}
          {loading && <div className="loader">Loading...</div>}
        </div>
        <Button variant="primary" onClick={() => partyWrite()}>글쓰기</Button>
      </div>
  );
}

export default Partybbslist