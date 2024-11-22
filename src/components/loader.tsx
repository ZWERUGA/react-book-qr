import { RiseLoader } from "react-spinners";
import { useTheme } from "./theme-provider";

export default function Loader() {
  const { theme } = useTheme();

  return <RiseLoader color={theme === "light" ? "black" : "white"} />;
}
