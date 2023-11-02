
export const LikeButton = ({onLike}) => {
  
    return (
      <button className="like-button" onClick={ () => onLike()} >
         <span className="heart-icon">❤️</span>
      </button>        
    )
  };
  