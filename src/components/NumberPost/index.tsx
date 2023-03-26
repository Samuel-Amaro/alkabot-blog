import "./NumberPost.css";

type PropsNumberPost = {
  numberPost: number;
  className?: string;
};

export default function NumberPost({ className,numberPost }: PropsNumberPost) {
  return (
    <div
      className={
        className ? `main__number-post ${className}` : "main__number-post"
      }
    >
      <span className="main__number">{numberPost}.</span>
    </div>
  );
}
