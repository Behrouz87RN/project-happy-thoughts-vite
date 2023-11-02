import { useState } from "react";
import { LikeButton } from "./LikesButton";
import { differenceInSeconds } from 'date-fns';


export const Thought = ({ data }) => {
  const [hearts, setHearts] = useState(data.hearts);
  const likeUrl = `https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${data._id}/like`;

  const incrementLike = async () => {
    const response = await fetch(likeUrl, { method: "POST" });
    const responseJson = await response.json();

    setHearts(responseJson.hearts);
  };

  const createdAt = new Date(data.createdAt);
  const now = new Date();
  //const diff = date.subtract(now, createdAt);
  //const secondsAgo = date.format(diff, 's');
  const secondsAgo = differenceInSeconds(now, createdAt);

  return (
    <div className="strMsg">
      <p >{data.message} </p>
      <div>
        <div>
          <div>{hearts}</div>
          <LikeButton onLike={incrementLike} />
        </div>
        <div>{`${secondsAgo} seconds ago`}</div>
      </div>
    </div>
  );
};
