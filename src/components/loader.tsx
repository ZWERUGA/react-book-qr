import { RiseLoader } from "react-spinners";

export default function Loader() {
  const root = window.document.documentElement;

  const themeMode = root.classList.contains("light") ? "black" : "white";

  return <RiseLoader color={themeMode} />;
}
