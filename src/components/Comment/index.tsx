import { DataComment } from "../../data";

type PropsComment = {
    comment: DataComment;
};

export default function Comment({comment} : PropsComment) {
    return (
      <>
        <div className="comment">
          <h3 className="comment__name">{comment.name}</h3>
          <h4 className="comment__user">{comment.email}</h4>
          <p>{comment.body}</p>
        </div>
        <hr className="comment__diviser"/>
      </>
    );
}