import React,{useEffect, useState} from "react";
import axios from "axios";
import defaultimg from '../image/defaultnuill.png'

function Musiccrawling(){

    // const [musicdata, setMusicdata] = useState([]);

    const [titles, setTitles] = useState([]);
    const [singers, setSinger] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [imageslist, setImageslist] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get("http://localhost:3000/musicchart", { params: {} })
                .then(function (res) {
                    console.log(res.data);
                    console.log(res.data.sendsingers);
                    setTitles(res.data.sendtitles);
                    setSinger(res.data.sendsingers);
                    setAlbums(res.data.sendalbums);
                    setImageslist(res.data.images);
                })
                .catch(function (err) {
                    alert(err);
                })
        }

        fetchData();

    }, [])

    let importimg = [];

    function Musiclist(props){
        
        const { titles, singers, albums, images } = props;
        
        let imagePath = [];

        if (images.length === 0) {
            return (
                <div>
                    <p>이미지를 불러오고 있습니다...</p>
                </div>
            )
        }

        imageslist.map((img, index) => {
            let imageload = "";
            imageload = imageslist[index].split("\\");
            importimg.push(imageload[imageload.length - 1]);
        })

        importimg.map((img, index) => {
            try {
                imagePath.push(require('../crawlingimages/musicimages/' + importimg[index]));
            } catch (error) {
                imagePath.push(defaultimg); // 이미지 대신 null 값을 추가합니다.
            }
        });

        // console.log("여기까지 오는거 확인"+singers);
        // console.log("여기까지 오는거 확인"+albums);

        return(
            <div>
                {titles.map((title, i)=>(
                    <div key={i}>
                        <h2>{title}</h2>
                        <h2>{singers[i]}</h2>
                        <h2>{albums[i]}</h2>
                        <img src={imagePath[i]} alt={title} />
                    </div>
                ))}
            </div>
        )
    }

    return(
        <div>
            <h2>여기는 노래순위!</h2>
            {/* const { titles, singres, albums, images } = props; */}
            <Musiclist titles={titles} singers={singers} albums={albums} images={imageslist} />
        </div>
    )
}
export default Musiccrawling;