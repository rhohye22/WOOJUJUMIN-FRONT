import { useEffect, useState } from "react";
import axios from "axios";
import defaultimg from '../image/defaultnuill.png'

function Localeventcrawling() {

    const [onepage, setOnepage] = useState([]);
    const [twopage, setTwopage] = useState([]);
    const [threepage, setThreepage] = useState([]);

    const [onetitles, setOnetitles] = useState([]);
    const [twotitles, setTwotitles] = useState([]);
    const [threetitles, setThreetitles] = useState([]);

    const [oneinform, setOneinfrom] = useState([]);
    const [twoinform, setTwoinfrom] = useState([]);
    const [threeinform, setThreeinfrom] = useState([]);

    const [onedates, setOnedates] = useState([]);
    const [twodates, setTwodates] = useState([]);
    const [threedates, setThreedates] = useState([]);

    const [oneimages, setOneimages] = useState([]);
    const [twoimages, setTwoimages] = useState([]);
    const [threeimages, setThreeimages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get("http://localhost:3000/localevent", { params: {} })
                .then(function (res) {
                    console.log(res.data);
                    setOnetitles(res.data.onepage.sendtitles);
                    setOneinfrom(res.data.onepage.sendinformations);
                    setOnedates(res.data.onepage.senddates);
                    setOneimages(res.data.onepage.images);

                    setTwotitles(res.data.twopage.sendtitles);
                    setTwoinfrom(res.data.twopage.sendinformations);
                    setTwodates(res.data.twopage.senddates);
                    setTwoimages(res.data.twopage.images);

                    setThreetitles(res.data.threepage.sendtitles);
                    setThreeinfrom(res.data.threepage.sendinformations);
                    setThreedates(res.data.threepage.senddates);
                    setThreeimages(res.data.threepage.images);
                    

                })
                .catch(function (err) {
                    alert(err);
                })
        }

        fetchData();

    }, []);

    let importimgOne = [];
    let importimgTwo = [];
    let importimgThree = [];

    function FestivallistOne(props) {
        const { titles, informations, dates, images } = props;
        let imagePath = [];

        if (images.length === 0) {
            return (
                <div>
                    <p>이미지를 불러오고 있습니다...</p>
                </div>
            )
        }

        oneimages.map((img, index) => {
            let imageload = "";
            imageload = oneimages[index].split("\\");
            importimgOne.push(imageload[imageload.length - 1]);
        })


        // importimgOne.map((img, index) => {
        //     imagePath.push(require('../crawlingimages/' + importimgOne[index]));

        // })

        importimgOne.map((img, index) => {
            try {
                imagePath.push(require('../crawlingimages/' + importimgOne[index]));
            } catch (error) {
                imagePath.push(defaultimg); // 이미지 대신 null 값을 추가합니다.
            }
        });

        return (
            <div>
                {titles.map((title, i) => (
                        <div key={i}>
                            <img src={imagePath[i]} alt={title} />
                            <h2>{title}</h2>
                            <h3>{oneinform[i]}</h3>
                            <h3>{onedates[i]}</h3>
                        </div>
                    ))}
            </div>
        );

    }

    function FestivallistTwo(props) {
        const { titles, informations, dates, images } = props;
        let imagePath = [];

        if (images.length === 0) {
            return (
                <div>
                    <p>이미지를 불러오고 있습니다...</p>
                </div>
            )
        }

        twoimages.map((img, index) => {
            let imageload = "";
            imageload = images[index].split("\\");
            importimgTwo.push(imageload[imageload.length - 1]);
        })


        // importimgTwo.map((img, index) => {
        //     imagePath.push(require('../crawlingimages/' + importimgTwo[index]));

        // })

        importimgTwo.map((img, index) => {
            try {
                imagePath.push(require('../crawlingimages/' + importimgTwo[index]));
            } catch (error) {
                imagePath.push(defaultimg); // 이미지 대신 null 값을 추가합니다.
            }
        });

        return (
            <div>
                {titles.map((title, i) => (
                        <div key={i}>
                            <img src={imagePath[i]} alt={title} />
                            <h2>{title}</h2>
                            <h3>{twoinform[i]}</h3>
                            <h3>{twodates[i]}</h3>
                        </div>
                    ))}
            </div>
        );

    }

    function FestivallistThree(props) {
        const { titles, informations, dates, images } = props;
        let imagePath = [];

        if (images.length === 0) {
            return (
                <div>
                    <p>이미지를 불러오고 있습니다...</p>
                </div>
            )
        }

        threeimages.map((img, index) => {
            let imageload = "";
            imageload = threeimages[index].split("\\");
            importimgThree.push(imageload[imageload.length - 1]);
        })


        // importimgThree.map((img, index) => {
        //     imagePath.push(require('../crawlingimages/' + importimgThree[index]));

        // })

        importimgThree.map((img, index) => {
            try {
                imagePath.push(require('../crawlingimages/' + importimgThree[index]));
            } catch (error) {
                imagePath.push(defaultimg); // 이미지 대신 null 값을 추가합니다.
            }
        });
        

        return (
            <div>
                {titles.map((title, i) => (
                        <div key={i}>
                            <img src={imagePath[i]} alt={title} />
                            <h2>{title}</h2>
                            <h3>{threeinform[i]}</h3>
                            <h3>{threedates[i]}</h3>
                        </div>
                    ))}
            </div>
        );

    }

    return (
        <div>
            <h3>여기는 지역행사 임다</h3>
            <FestivallistOne titles={onetitles} informations={oneinform} dates={onedates} images={oneimages}/>
            <FestivallistTwo titles={twotitles} informations={twoinform} dates={twodates} images={twoimages}/>
            <FestivallistThree titles={threetitles} informations={threeinform} dates={threedates} images={threeimages}/>
        </div>
    );
}

export default Localeventcrawling;