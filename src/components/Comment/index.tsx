import { Link } from "react-router-dom";
import { DataComment } from "../../data";
import "./Comment.css";

type PropsComment = {
    comment: DataComment;
};

export default function Comment({comment} : PropsComment) {
    return (
      <>
        <div className="comment">
          <Link to={`#`} target="_self" rel="next" className="comment__user">
            {comment.email}
          </Link>
          <h3 className="comment__name">{comment.name}</h3>
          <p className="comment__content">{comment.body}</p>
        </div>
      </>
    );
}