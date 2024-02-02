/* eslint-disable react/prop-types */
function Input({
  inputValue,
  handleInputValue,
  error,
  className,
  type,
  placeholder,
}) {
  return (
    <>
      <input
        type={type}
        className={className}
        value={inputValue}
        placeholder={placeholder}
        onChange={handleInputValue}
      />
      {error !== null ? <p>{error}</p> : null}
    </>
  );
}

export default Input;
