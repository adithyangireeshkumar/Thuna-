export function BilingualText({
  en,
  ml,
  as: Component = "div",
  className = "",
  enClassName = "",
  mlClassName = ""
}) {
  return (
    <Component className={`lang-stack ${className}`}>
      <span className={`lang-en ${enClassName}`}>{en}</span>
      <span className={`lang-ml ${mlClassName}`}>{ml}</span>
    </Component>
  );
}
