
export const LikeButton = ({onLike}) => {
  
    return (
      <button className="likeButton" onClick={ () => onLike()} >
         <span className="heart-icon">❤️</span>
      </button>        
    )
  };
  