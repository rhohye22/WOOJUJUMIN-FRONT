import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FreeBbsWrite() {
  let history = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [tag, setTag] = useState("");

  const imgRef = useRef();

  const [id, setId] = useState("");
  useEffect(function () {
    let login = JSON.parse(localStorage.getItem("login"));
    setId(login.id);
  }, []);

  function imageLoad() {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
    console.log(image);
  }

  function writeFreeBbs(e) {
    if (tag === "") {
      alert("관련카테고리를 선택하세요");
      return;
    } else {
      e.preventDefault();
      let formData = new FormData();
      formData.append("id", id);
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", image);
      formData.append("tag", tag);
      if (document.frm.uploadFile.files[0].name === null || document.frm.uploadFile.files[0].name === "") {
        formData.append("uploadFile", "basic");
      } else {
        console.log(document.frm.uploadFile.files[0].name);
        formData.append("uploadFile", document.frm.uploadFile.files[0]);
      }

      axios
        .post("http://localhost:3000/writeFreeBbs", formData)
        .then(function (resp) {
          if (resp.data === "YES") {
            alert("글이 등록되었습니다.");
            history("/freeBoard"); // 이동(link)
          } else {
            alert("게시글 등록에 실패했습니다");
          }
        })
        .catch(function (err) {
          alert(err);
          alert("에러");
        });
    }
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div>
      <h2>글 작성</h2>

      <label>
        제목
        <input type="text" value={title} onChange={handleTitleChange} />
      </label>
      <br />

      <select value={tag} onChange={(e) => setTag(e.target.value)}>
        <option value="" disabled>
          카테고리
        </option>
        <option value={1}>농구</option>
        <option value={2}>축구</option>
        <option value={3}>야구</option>
        <option value={4}>예능</option>
        <option value={5}>드라마/영화</option>
        <option value={6}>게임</option>
        <option value={7}>음식</option>
        <option value={8}>함께</option>
        <option value={9}>탐사</option>
        <option value={10}>잡담</option>
      </select>
      <br />
      <label>
        내용
        <textarea value={content} onChange={handleContentChange} />
      </label>
      <br />

      <form name="frm" onSubmit={writeFreeBbs} encType="multipart/form-data">
        <input type="file" onChange={imageLoad} ref={imgRef} name="uploadFile" />
        <br />
        <img
          src={image}
          alt=""
          style={{
            width: 500,
            height: "auto",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <br />
      </form>
      <button type="submit" onClick={writeFreeBbs}>
        작성하기
      </button>
    </div>
  );
}

export default FreeBbsWrite;
