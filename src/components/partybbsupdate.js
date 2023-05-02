import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Partybbsupdate(){
    let params = useParams("");
    let history = useNavigate();
    const [id, setId] = useState('');
    const [pbsdetail, setPbsdetail] = useState([]);
    const [title, setTitle] = useState("");
    const [place, setPlace] = useState("");
    const [content, setContent] = useState("");
    const [MDate, setMDate] = useState(new Date());
    const [mnum, setMnum] = useState(0);
    console.log(params.seq);

    const titleChange = (e) => setTitle(e.target.value);
    const contentChange = (e) => setContent(e.target.value);

    useEffect(() => {
        let login = JSON.parse(localStorage.getItem("login"));
        if(login !== undefined){ // 빈칸이 아닐때
            
            setId(login.id);
        
        }else{
           // alert('로그인해 주십시오');
           history('/login');
        }
              
    }, [history]); 

    useEffect(() => {
        axios
          .get(`http://localhost:3000/partyBbsdetail`, { params:{ "partySeq":params.seq }})
          .then((response) => {
            console.log(response.data);
            setPbsdetail(response.data);
            setTitle(response.data.title);
            setContent(response.data.content);
          })
          .catch((error) => {
            console.log(error);
          });
      }, [params.seq]);

      const updatepbs = async (e) => {
        e.preventDefault();
        //const formData = new FormData(frm);
        const formData = new FormData();
        formData.append("partySeq", params.seq);
        formData.append("id", id);
        formData.append("title", title);
        formData.append("content", content);

        await axios.post('http://localhost:3000/updatePartybbs', formData)
        .then(function(res){
            console.log(res.data);
            if(res.data === "YES"){
                alert('글이 수정되었습니다.');
                history('/partybbslist');
            }
          })
          .catch(function(err){
            console.log(err);
          })
    }  

    return(
        <div>
            <input type="text" value={title} onChange={titleChange}/><br/>
            일시: <input type= "text"  value="ddd" readOnly/><br/>
            모임장소 : <input type="text" value={pbsdetail.place} readOnly/>
            <button>지도</button><br/>
            <input type="text" value={pbsdetail.id} readOnly/>
            {pbsdetail.applymem}/{pbsdetail.people}
            <input type="text" value={pbsdetail.applymem} readOnly/><br/>
            <textarea value={content} onChange={contentChange}></textarea><br/>
            <button onClick={updatepbs}>수정</button>
        </div>
    )
}

export default Partybbsupdate