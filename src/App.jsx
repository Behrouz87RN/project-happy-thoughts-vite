import { useState, useEffect } from "react";
import { Thought } from "./components/thought";
import { AnimatePresence, motion } from "framer-motion";

export const App = () => {
  const [thoughts, setThoughts] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [loading, setLoading] = useState(false); // Add loading state here
  const [sending, setSending] = useState(false); // Add loading state here
  const [thoughtsLiked, setThoughtsLiked] = useState([]);

  const url = "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts";

  const getThoughts = async () => {
    setLoading(true);
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setThoughts(data);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    setSending(true); // Set loading to true when making the API request

    fetch('https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ "message": newMsg })
    })
      .then(async (res) => {
        if (res.status === 400) {
          const data = await res.json();
          alert(data.errors.message.message);
          throw new Error(data.message);
        } else if (res.status === 201) {
          return res.json();
        } else {
          throw new Error('Unknown Error');
        }
      })
      .then((newThought) => {
        setThoughts((previousThoughts) => [newThought, ...previousThoughts]);
        setNewMsg("");
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setSending(false); // Set loading to false after the API request is complete
      });
  }

  const handleThoughtLiked = (thoughtId) => {
    if (!thoughtsLiked.includes(thoughtId)){
      setThoughtsLiked([thoughtId, ...thoughtsLiked]);
    }
  }

  useEffect(() => {
    getThoughts();
  }, []);

  useEffect(() => {
    setCharCount(newMsg.length);

    if (newMsg.length > 140) {
      document.getElementById("charCount").style.color = "red";
    } else {
      document.getElementById("charCount").style.color = "black";
    }
  }, [newMsg]);

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
          value={newMsg}
          type="text"
          className="input"
        />
        <div className="msgBox-container">
          <button onClick={handleFormSubmit} disabled={loading}>
            {sending ? 'Sending...' : 'Send Happy Thoughts 💛'}
          </button>
          <div className="msgBox-p-container">
            <p className="likedCount">Thoughts ❤️ {thoughtsLiked.length}</p>
            <p id="charCount" className="charRemain">
              Characters remaining: {140 - charCount}
            </p>
          </div>
        </div>
      </div>

      <motion.div layout layoutId={"msgList"} className="msgList">
        <AnimatePresence>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            thoughts.map((thought) => (
              <motion.div
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                key={thought._id}
              >
                <Thought data={thought} onLike={handleThoughtLiked} />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
