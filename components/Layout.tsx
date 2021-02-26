import Navigation from "./Navigation";
import tw from "twin.macro";
const Layout: React.FC = ({ children }) => {
  return (
    <div tw="w-screen h-screen">
      <Navigation />
      {children}
    </div>
  );
};

export default Layout;
