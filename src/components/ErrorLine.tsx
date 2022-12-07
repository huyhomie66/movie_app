const ErrorLine = ({ isError, error }) =>
  isError && <div>{JSON.stringify(error)}</div>;

export default ErrorLine;
