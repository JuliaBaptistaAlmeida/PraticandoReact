export const PageLayout = ({ children, title }) => {
  return (
    <div className="container">
      {title != null && String(title).trim() !== "" ? (
        <h2>{title}</h2>
      ) : null}
      {children}
    </div>
  );
};
