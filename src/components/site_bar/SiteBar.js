import { NavLink } from "react-router-dom";
import "./SiteBar.scss";
import Home, { Karzinka, Settings } from "../../icons";
const SiteBar = ({ login }) => {
  const menu = [
    {
      to: "/",
      icon: <Home />,
    },
    {
      to: "/",
      icon: <Settings />,
    },
    {
      to: "/add/product",
      icon: <Karzinka />,
    },
  ];
  return (
    <>
      <div className="site_bar">
        <div className="site_bar_icon">
          <div className="site_bar_icon_item">
            {menu?.map((el, i) => (
              <NavLink key={i} to={el?.to} onClick={el?.onClick}>
                {el?.icon}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SiteBar;
