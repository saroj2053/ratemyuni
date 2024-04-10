import React, { useRef, useState } from "react";
import { FaUsers } from "react-icons/fa6";
import { FaUniversity } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import { FaHome } from "react-icons/fa";

import { GoDotFill } from "react-icons/go";
import { FaAngleDown } from "react-icons/fa6";

const menuItems = [
  {
    name: "Home",
    icon: FaHome,
  },
  {
    name: "Users",
    icon: FaUsers,
    items: ["Show Users", "Add User", "Update User", "Change Role"],
  },
  {
    name: "Universities",
    icon: FaUniversity,
    items: ["Show Universities", "Add University"],
  },
  {
    name: "Reviews",
    icon: MdReviews,
    items: ["Show Reviews"],
  },
];

const NavMenu = ({ name, icon, hasSubNav }) => {
  const Icon = icon;
  return (
    <div className="w-full h-12 flex gap-4 items-center px-6 my-4 transition ease-in text-white hover:bg-primary-dark relative">
      <Icon size={20} />
      <span className="cursor-pointer uppercase font-normal text-sm tracking-widest">
        {name}
      </span>
      {hasSubNav && (
        <div className="absolute top-1/2 right-6 transform -translate-y-1/2">
          <FaAngleDown />
        </div>
      )}
    </div>
  );
};

const SubMenu = ({ item, activeItem, handleClick }) => {
  const navRef = useRef();

  const isSubNavOpen = (item, items) =>
    items.some((i) => i === activeItem) || item === activeItem;
  return (
    <div ref={navRef}>
      {item?.items.map((subItem, index) => (
        <NavMenu
          key={index}
          onClick={handleClick}
          name={subItem}
          icon={GoDotFill}
          isActive={activeItem === subItem}
        />
      ))}
    </div>
  );
};

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("");

  const handleClick = (item) => {
    console.log("activeItem", activeItem);
    setActiveItem(item !== activeItem ? item : "");
  };
  return (
    <aside className="bg-grey-dark-1 w-64 h-[calc(100vh-96px)] mt-24 fixed top-0 left-0 font-grotesk">
      <div className="w-full mt-6">
        {menuItems.map((item, index) => (
          <div key={index}>
            {!item.items && (
              <NavMenu
                key={index}
                name={item.name}
                icon={item.icon}
                isActive={activeItem === item.name}
                hasSubNav={item.items}
                onClick={handleClick}
              />
            )}
            {item.items && (
              <div>
                <NavMenu
                  name={item.name}
                  icon={item.icon}
                  hasSubNav={item.items}
                  isActive={activeItem === item.name}
                  onClick={handleClick}
                />
                <SubMenu
                  item={item}
                  handleClick={handleClick}
                  activeItem={activeItem}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
