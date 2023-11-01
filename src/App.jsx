
import { useState, useEffect } from "react";
import {Thought} from './thought.jsx'


export const App = () => {
  //  Initialize state for storing the API data
  const [thoughts, setThoughts] = useState([]);
  const url = "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts";
  // Create a function to fetch 
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

  const handleFormSubmit = (event) => {
    //event.preventDefault()
  
    fetch('https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ "message": newMsg })
    })
      .then((res) => res.json())
      .then((newThought) => {
  
        setThoughts((previousThoughts) => [newThought, ...previousThoughts])
      })
  }


  useEffect(() => {
    getThoughts();
  }, []); 


  return (
    <>
    <div className="App">
      <input onChange={(e) => {setNewMsg(e.target.value)}} type="text" className="input"/>
      <button onClick={handleFormSubmit}>submit</button>
    </div>

    <div className="msg">
      {thoughts.map((thought) => {
        return <Thought data={thought} key={thought._id}/>
      })}
    </div>
  </>
  );
   
};


