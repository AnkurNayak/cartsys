// eslint-disable-next-line react/prop-types
function Button({ children, className, onClick }) {
  return (
    <button className={`${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
