import { useState } from "react";
import { LikeButton } from "./LikesButton";
import { differenceInSeconds, formatDistanceToNow } from 'date-fns';

export const Thought = ({ data, onLike }) => {
  const [hearts, setHearts] = useState(data.hearts);
  const likeUrl = `https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${data._id}/like`;

  const incrementLike = async () => {
    const response = await fetch(likeUrl, { method: "POST" });
    const responseJson = await response.json();

    setHearts(responseJson.hearts);
    onLike(data._id);
  };

  const createdAt = new Date(data.createdAt);
  const now = new Date();
  let secondsAgo = differenceInSeconds(now, createdAt);

  // Ensure the time difference is non-negative
  secondsAgo = Math.max(secondsAgo, 0);

  // Convert to human-readable format if more than 160 seconds ago
  const timeAgo = secondsAgo >= 60
    ? formatDistanceToNow(createdAt, { addSuffix: true })
    : `${secondsAgo} second${secondsAgo !== 1 ? 's' : ''} ago`;

  return (
    <div className="strMsg">
      <p>{data.message}</p>
      <div>
        <div>
          <div className="count-hearts">{hearts}</div>
          <LikeButton className="count-hearts" onLike={incrementLike} />
        </div>
        <div>{timeAgo}</div>
      </div>
    </div>
  );
};
