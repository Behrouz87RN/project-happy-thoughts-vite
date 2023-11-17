import React, { useState, useEffect } from "react";
import { LikesButton } from "./LikesButton";
import { differenceInSeconds, formatDistanceToNow } from "date-fns";

export const Thought = ({ data, onLike }) => {
  const [hearts, setHearts] = useState(data.hearts);
  const [loading, setLoading] = useState(true);
  const [isHeartClicked, setHeartClicked] = useState (false);


  const likeUrl = `https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${data._id}/like`;

  const incrementLike = async () => {
    setLoading(true); // Set loading to true when making the API request
    const response = await fetch(likeUrl, { method: "POST" })
    .then(async (res) => res.json())
    .then((res) => {
      setHearts(res.hearts);
      setHeartClicked(true);
      onLike(data._id);
    })
    .catch((err) => {
      console.log("err", err);
      setHeartClicked(false);
    });

    setLoading(false); // Set loading to false after the API request is complete
  };

  const createdAt = new Date(data.createdAt);
  const now = new Date();
  let secondsAgo = differenceInSeconds(now, createdAt);

  // Ensure the time difference is non-negative
  secondsAgo = Math.max(secondsAgo, 0);

  // Convert to human-readable format if more than 160 seconds ago
  const timeAgo =
    secondsAgo >= 60
      ? formatDistanceToNow(createdAt, { addSuffix: true })
      : `${secondsAgo} second${secondsAgo !== 1 ? "s" : ""} ago`;

  useEffect(() => {
    setLoading(false); // Simulate data loading completion
  }, []); // Add any dependencies if needed

  return (
    <div className="strMsg">
      <>
        <p>💌 {data.message}</p>
        <div>
          <div>
            <div className="count-hearts">{hearts}</div>
            {loading ? (
              <div className="placeholder">Loading...</div>
            ) : (
              <LikesButton className="count-hearts" onLike={incrementLike} isLiked={isHeartClicked} />
            )}
          </div>
          <div>{timeAgo}</div>
        </div>
      </>
    </div>
  );
};
