export const Button = ({ clickBtn, children }) => {
  return (
    <button
      onClick={clickBtn}
      className="w-full rounded-full bg-blue-600 bg-opacity-80 py-1 font-bold text-white active:bg-blue-900"
    >
      {children}
    </button>
  );
};
