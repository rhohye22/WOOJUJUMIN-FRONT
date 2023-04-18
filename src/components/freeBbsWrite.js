import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FreeBbsWrite() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleFileSelect = (e) => {
    const fileList = Array.from(e.target.files);
    setFiles(fileList);

    const urls = fileList.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post(`http://localhost:3000/freeBbsWrite`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(response.data);
      navigate("/freeBbs");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>글 작성</h2>
      <form onSubmit={handleSubmit}>
        <label>
          제목
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <br />
        <label>
          내용
          <textarea value={content} onChange={handleContentChange} />
        </label>
        <br />
        <input type="file" multiple onChange={handleFileSelect} />
        <br />
        <div>
          {previewUrls.map((url) => (
            <img key={url} src={url} width="200px" height="200px" alt="preview" />
          ))}
        </div>
        <br />
        <button type="submit">작성하기</button>
      </form>
    </div>
  );
}

export default FreeBbsWrite;
