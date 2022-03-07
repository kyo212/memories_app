export const Button = ({ clickBtn, children }) => {
  return (
    <button
      onClick={clickBtn}
      className="rounded-sm bg-blue-600 bg-opacity-80 px-3 py-2 font-bold text-white active:bg-blue-900"
    >
      {children}
    </button>
  );
};
