import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className="min-h-screen bg-gray-100  text-gray-900 dark:text-gray-100 dark:bg-slate-900">
        {children}
      </div>
    </div>
  );
}

export default ThemeProvider;
