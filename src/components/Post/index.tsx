import { DataComment, DataPost, DataUser } from "../../data";
import React, { useEffect, useState } from "react";
import { getAllCommentsPost } from "../../api/api";
import Comment from "../Comment";
import "./Post.css";
import LineDiviser from "../LineDiviser";
import { Link } from "react-router-dom";
import IconComment from "../Icons/Comment";

type PropsPostPreview = {
  post: DataPost;
  user?: DataUser;
  className?: string;
  //listAllUsers: DataUser[];
  //isViewMetadatas: boolean;
};

export default function Post({ post, user, className }: PropsPostPreview) {
  const [expanded, setExpanded] = useState(false);
  const [commentsPost, setCommentsPost] = useState<DataComment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  useEffect(() => {
    setIsLoadingComments(true);
    //busca comentarios do post somente quando for necessario
    if (expanded) {
      getAllCommentsPost(post.id)
        .then((values) => {
          setCommentsPost(values);
          setIsLoadingComments(false);
        })
        .catch((error) => {
          console.error("error ao buscar comentarios do post " + error);
        });
    }
  }, [expanded]);

  return (
    <>
      <div className={className ? `post ${className}` : "post"}>
        <article className="post__content">
          <h2 className="post__title">{post.title}</h2>
          <p className="post__preview-content">{post.body}</p>
        </article>
        {user && (
          <div className="post__metadatas">
            <p className="post__posted">
              Posted by{" "}
              <Link
                to={`/users/${user.id}`}
                target="_self"
                rel="next"
                aria-label="View user"
                className="post__link-user"
              >
                {user.username}
              </Link>
            </p>
          </div>
        )}
        <button
          type="button"
          className="post__btn-comments"
          aria-label={`${expanded ? "Hidden" : "Show"} comments`}
          title={`${expanded ? "Hidden" : "Show"} comments`}
          aria-expanded={expanded}
          aria-controls="comments-post"
          onPointerDown={() => {
            setExpanded(!expanded);
          }}
          onKeyDown={(e) => {
            switch (e.key) {
              case " ":
              case "Enter":
                setExpanded(!expanded);
                break;
              case "Escape":
                if (expanded) {
                  setExpanded(false);
                }
                break;
              default:
                break;
            }
          }}
          onBlur={() => {
            setExpanded(false);
          }}
        >
          <span className="post__btn-comment-text">
            {expanded ? "Hidden" : "Show"} comments
          </span>
          <IconComment className="post__btn-comment-icon" />
        </button>
        {expanded && (
          <div className="post__comments" id="comments-post">
            <h2 className="post__marck">Comments {commentsPost.length}</h2>
            {isLoadingComments ? (
              <p className="post__loading">Loading comments...</p>
            ) : commentsPost.length > 0 ? (
              commentsPost.map((c, index) => {
                if (commentsPost.length - 1 > index) {
                  return (
                    <React.Fragment key={index}>
                      <Comment comment={c} key={c.id} />
                      <LineDiviser />
                    </React.Fragment>
                  );
                }
                return <Comment comment={c} key={c.id} />;
              })
            ) : (
              <p>Not Comments</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
