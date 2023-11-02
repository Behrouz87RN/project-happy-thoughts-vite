import { useState } from "react";
import { LikeButton } from "./LikesButton"

export const Thought = ({data}) => {
   const [hearts, setHearts] = useState(data.hearts);
   // Like current posted thoughts (Vanessa)
   const likeUrl = `https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${data._id}/like`;

   const incrementLike = async () => {
      const response = await fetch (likeUrl, {method: 'POST'});
      const responseJson = await response.json();

      setHearts(responseJson.hearts);
   };

   return  (
      <div className="strMsg">
         <p>{data.message} </p>
         <div>
            <div>{data.createdAt}</div>
         <div>
            <div>{hearts}</div>
            <LikeButton onLike={incrementLike}/>
         </div>
         </div>
      </div>
   )
}
  






// {
//     "_id": "654298823821f40010dda668",
//     "message": "fgfdbgf",
//     "hearts": 33,
//     "createdAt": "2023-11-01T18:27:14.350Z",
//     "__v": 0
//   },