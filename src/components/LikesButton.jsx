import { useState } from "react";

export const LikeButton = ({onLike}) => {


  const [isHeartClicked, setHeartClicked] = useState (false);

  const clickHeart = () => {
    setHeartClicked(true)
    onLike()
  }


  // choose which heart to display if clicked or not
  
    return (
      <button className="likeButton" onClick={clickHeart} >
        {isHeartClicked ? (
          <span className="heart-icon">❤️</span>
        ) : (
          <span className="heart-icon">🤍</span>
        )}
      </button>        
    )
  };
  