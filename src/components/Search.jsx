import { useContext, useState } from "react";
import { collection, query, where, getDoc, getDocs, setDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () =>{
    const q = query(collection(db, "users"),// db users라는 컬렉션에서 조건이 displayname과 username이 같은거
    where("displayName", "==", username)); // 컬렉션, 컬렉션 그룹에서 검색할 문서를 지정하는 쿼리문

    try{
      const querySnapshot = await getDocs(q); // getDocs로 row가져오기 컬렉션의 여러문서

      //alert(JSON.stringify(q));
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        // alert("user는? : " + user);
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    // check whether the group(chats in firestore) exists, if not create new one
    // 1대1채팅이므로 상대아이디와 내아이디만의 채팅방을 나타내는 id가 필요 그래서 합침
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

    try{
      
      const res = await getDoc(doc(db, "chats", combinedId));// get()을 이용해서 단일문서의 내용 검색
      if (!res.exists()) {
        // create a chat in chats collection
        await setDoc(doc(db,"chats", combinedId), { messages: []});// 필드명 : messages

        // create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid),{ // 내가 보낸거
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid),{ // 상대가 보낸거

          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input className="input1" type="text" placeholder="find a user" onKeyDown={handleKey} onChange={(e) => setUsername(e.target.value)} value={username} />
      </div>
      {err && <span>User not found</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img className="img2" src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
