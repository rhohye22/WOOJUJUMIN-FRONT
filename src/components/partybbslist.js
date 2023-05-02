import React, { useEffect, useState, useRef } from 'react'
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import './partylistcss.css';
import ReactDOM from 'react-dom';
import base from './image/base.png';

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
        const response = await axios.get(`http://localhost:3000/getAllpbslist`, { params:{"pageNumber":page}});
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
    return (
      <div className="partybbslist-container">
              <br />
      <button value={""} onClick={(e) => setTag(parseInt(e.target.value))}>
        전체
      </button>
      <button value={1} onClick={(e) => setTag(parseInt(e.target.value))}>
        농구
      </button>
      <button value={2} onClick={(e) => setTag(parseInt(e.target.value))}>
        축구
      </button>
      <button value={3} onClick={(e) => setTag(parseInt(e.target.value))}>
        야구
      </button>
      <button value={4} onClick={(e) => setTag(parseInt(e.target.value))}>
        예능
      </button>
      <button value={5} onClick={(e) => setTag(parseInt(e.target.value))}>
        드라마/영화
      </button>
      <button value={6} onClick={(e) => setTag(parseInt(e.target.value))}>
        게임
      </button>
      <button value={7} onClick={(e) => setTag(parseInt(e.target.value))}>
        음식
      </button>
      <button value={8} onClick={(e) => setTag(parseInt(e.target.value))}>
        함께
      </button>
      <button value={9} onClick={(e) => setTag(parseInt(e.target.value))}>
        탐사
      </button>
      <button value={10} onClick={(e) => setTag(parseInt(e.target.value))}>
        잡담
      </button>
        {/* <div className="filter-container">
          <input type="text" placeholder="Filter posts..." onInput={filterPosts} />
        </div> */}
        <div className="posts-container" ref={postsContainerRef}>
          {/* {filteredPosts.filter(post => post.tag === tag).map((post) => (  */}
          {filteredPosts.map((post) => (
          <div key={post.partySeq} className="post">      
              <div className="number">{post.partySeq}</div>
              <div className="post-info">
                
                  <img src={base} alt=''  width="100" height="100"/>
            
                <Link to={`/partybbsdetail/${post.partySeq}`}>
                  <h2 className="post-title">{post.title}</h2>
                </Link>
                  <p className="post-body">{post.content}</p>
              </div>
            </div>
          ))}
          {loading && <div className="loader">Loading...</div>}
        </div>

      </div>
  );
}

export default Partybbslist