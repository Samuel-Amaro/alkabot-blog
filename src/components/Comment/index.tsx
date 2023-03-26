import { DataComment} from "../../data";
import "./Comment.css";

type PropsComment = {
  comment: DataComment;
};

export default function Comment({ comment }: PropsComment) {
  return (
    <>
      <div className="comment">
        <a
          href={`mailto:${comment.email}`}
          target="_blank"
          rel="noreferrer"
          className="comment__user"
        >
          {comment.email}
        </a>
        <h3 className="comment__name">{comment.name}</h3>
        <p className="comment__content">{comment.body}</p>
      </div>
    </>
  );
}
