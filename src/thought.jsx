export const Thought = ({data}) => {
   return  <div className="strMsg">
    <p>{data.message} </p>
    <div>
    <div>{data.hearts}</div>
    <div>{data.createAt}</div>
    </div>
   </div>
}
  






// {
//     "_id": "654298823821f40010dda668",
//     "message": "fgfdbgf",
//     "hearts": 33,
//     "createdAt": "2023-11-01T18:27:14.350Z",
//     "__v": 0
//   },