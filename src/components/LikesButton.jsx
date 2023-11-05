import { useState } from "react";

export const LikeButton = ({onLike, isLiked}) => {

  const clickHeart = () => {
    onLike()
  }


  // choose which heart to display if clicked or not
  
    return (
      <button className="likeButton" onClick={!isLiked && clickHeart} >
        {isLiked ? (
          <span className="heart-icon">❤️</span>
        ) : (
          <span className="heart-icon">🤍</span>
        )}
      </button>        
    )
  };
  