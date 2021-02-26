import { useRouter } from "next/router";
import AboutOrContact from "../components/AboutOrContact";
import FourOHFour from "./404";

export default function Slug() {
  const router = useRouter();
  const valid = router.asPath === "/about" || router.asPath === "/contact";

  return <>{valid ? <AboutOrContact /> : <FourOHFour />}</>;
}
