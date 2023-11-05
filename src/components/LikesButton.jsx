export const LikeButton = ({onLike, isLiked}) => {
  // choose which heart to display if clicked or not
  
    return (
      <button className="likeButton" onClick={() => {!isLiked && onLike()}} >
        {isLiked ? (
          <span className="heart-icon">❤️</span>
        ) : (
          <span className="heart-icon">🤍</span>
        )}
      </button>        
    )
  };
  