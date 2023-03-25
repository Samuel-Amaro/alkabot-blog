import "./LineDiviser.css";

type PropsLineDiviser = {
  className?: string;
};

export default function LineDiviser({ className }: PropsLineDiviser) {
  return (
    <hr className={className ? `line-diviser ${className}` : "line-diviser"} />
  );
}
