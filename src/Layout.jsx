// App.jsx or Layout.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";

function AppLayout({ children }) {
  const location = useLocation();

  const hideNavbarRoutes = ["/main", "/login", "/register"];

  const whiteBgRoutes = ["/main", "/login", "/register"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  const shouldWhiteBg = whiteBgRoutes.includes(location.pathname);

  useEffect(() => {
    if (shouldWhiteBg) {
      document.body.classList.add("white-background");
      document.body.classList.remove("default-background");
    } else {
      document.body.classList.remove("white-background");
      document.body.classList.add("default-background");
    }

    return () => {
      document.body.classList.remove("white-background", "default-background");
    };
  }, [location.pathname, shouldWhiteBg]);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <main>{children}</main>
    </>
  );
}

export default AppLayout;
