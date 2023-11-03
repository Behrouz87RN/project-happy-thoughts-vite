
import { useState, useEffect } from "react";
import { Thought } from "./components/thought";
import { set } from "date-fns";

export const App = () => {

  const [thoughts, setThoughts] = useState([]);
  const url = "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts";
 
  const getThoughts = async () => {
    fetch(url)
      .then((res) => {
        //console.log("res", res);
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        console.log("data", data);
       setThoughts(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  
  const [newMsg, setNewMsg] = useState("");
  const [charCount, setCharCount] = useState(0);

  const handleFormSubmit =  (event) => {
    //event.preventDefault()
  
    fetch('https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ "message": newMsg })
    })
    .then( async (res) => {
      if (res.status === 400) {
        const data = await res.json();
        alert( data.errors.message.message);
        throw new Error(data.message); 
      } else if (res.status === 201) {
        return res.json(); 
      } else {
        throw new Error('Unknown Error'); 
      }
    })
    .then((newThought) => {
      console.log ("new", newThought)

      setThoughts((previousThoughts) => [newThought, ...previousThoughts])
    })
    .catch((err) => {
      console.log("err", err);
    });
  }

  useEffect(() => {
    getThoughts();
  }, []);
  useEffect(() => {
    setCharCount(newMsg.length);

    // Check if character count exceeds 140 and update color
    if (newMsg.length > 140) {
      document.getElementById("charCount").style.color = "red";
    } else {
      document.getElementById("charCount").style.color = "black";
    }
  }, [newMsg]);

  //handle count of given likes
  const [thoughtsLiked, setThoughtsLiked] = useState([]);

  const handleThoughtLiked = (thoughtId) => {
    //if it's not included
    if (!thoughtsLiked.includes(thoughtId)){
      //add to the list
      setThoughtsLiked([thoughtId, ...thoughtsLiked]);
    }
  }

  return (
    <div className="app">
      <div className="appTitle">
        <h1>Project Happy Thoughts</h1>
      </div>
      <div className="msgBox">
        <p className="questionText">What is making you happy right now?</p>
        <input
          placeholder="Type here..."
          onChange={(e) => {
            setNewMsg(e.target.value);
          }}
          type="text"
          className="input"
        />
        <div className="msgBox-container">
          <button onClick={handleFormSubmit}>Send Happy Thoughts 💛</button>
          <div className="msgBox-p-container">
            <p className="likedCount">Thoughts ❤️: {thoughtsLiked.length}</p>
            <p id="charCount" className= "charRemain" >Characters remaining: {140 - charCount}</p>
          </div>
        </div>
      </div>

      <div className="msgList">
        {thoughts.map((thought) => {
          return <Thought data={thought} key={thought._id} onLike={handleThoughtLiked} />;
        })}
      </div>
    </div>
  );
};

