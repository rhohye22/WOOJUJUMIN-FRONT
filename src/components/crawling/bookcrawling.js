import { useEffect, useState } from "react";
import axios from 'axios';
import defaultimg from '../image/defaultnuill.png'

function BookCrawling() {

    const [booktitles, setBooktitle] = useState([]);
    const [bookdatas, setBookdatas] = useState([]);
    const [bookimages, setBookimages] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            await axios.get("http://localhost:3000/bookchart", { params: {} })
                .then(function (res) {
                    console.log(res.data);
                    setBooktitle(res.data.sendtitles);
                    setBookdatas(res.data.senddatas);
                    setBookimages(res.data.images);
                })
                .catch(function (err) {
                    alert(err);
                })
        }

        fetchData();

    }, [])

    let importimg = [];

    function Booklist(props) {

        const { titles, datas, images } = props;
        let imagePath = [];

        if (images.length === 0) {
            return (
                <div>
                    <p>이미지를 불러오고 있습니다...</p>
                </div>
            )
        }

        bookimages.map((img, index) => {
            let imageload = "";
            imageload = bookimages[index].split("\\");
            importimg.push(imageload[imageload.length - 1]);
        })

        // importimg.map((img, index) => {
        //     imagePath.push(require('../crawlingimages/' + importimg[index]));

        // })

        importimg.map((img, index) => {
            try {
                imagePath.push(require('../crawlingimages/' + importimg[index]));
            } catch (error) {
                imagePath.push(defaultimg); // 이미지 대신 null 값을 추가합니다.
            }
        });

        console.log("확인용" + titles);
        console.log("확인용" + datas);
        console.log("확인용" + imagePath);
        return (
            <div>
                {titles.map((title, index) => (
                    <div key={index}>
                        <h2>{title}</h2>
                        <h3>{datas[index]}</h3>
                        <img src={imagePath[index]} alt={title} />
                    </div>
                ))}
            </div>

        );
    }

    return (
        <div>
            <h3>여기는 책 순위임다</h3>
            <Booklist titles={booktitles} datas={bookdatas} images={bookimages} />
            {/* {booktitles[0]} */}
        </div>
    )
}
export default BookCrawling;