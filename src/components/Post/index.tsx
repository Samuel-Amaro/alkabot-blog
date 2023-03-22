import { DataComment, DataPost } from "../../data";
import { useEffect, useState } from "react";
import { getAllCommentsPost } from "../../api/api";
import Comment from "../Comment";
import "./Post.css";

type PropsPostPreview = {
  post: DataPost;
};

export default function Post({ post }: PropsPostPreview) {
  const [expanded, setExpanded] = useState(false);
  const [commentsPost, setCommentsPost] = useState<DataComment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  useEffect(() => {
    //busca dados do usuario que fez o post
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
      <div className="post">
        <article className="post__content">
          <h2 className="post__title">{post.title}</h2>
          <p className="post__preview-content">{post.body}</p>
        </article>
        <div className="post__metadatas"></div>
        <button
          type="button"
          className="post__show-comments"
          aria-label={`${expanded ? "Hidden" : "Show"} comments`}
          title={`${expanded ? "Hidden" : "Show"} comments`}
          aria-expanded={expanded}
          aria-controls="comments-post"
          onPointerDown={() => {
            setExpanded(!expanded);
          }}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              setExpanded(!expanded);
            }
          }}
        >
          {expanded ? "Hidden" : "Show"} comments
        </button>
        {expanded && (
          <div className="post__comments" id="comments-post">
            {isLoadingComments ? (
              <p className="post__loading">Loading comments...</p>
            ) : commentsPost.length > 0 ? (
              commentsPost.map((c) => {
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