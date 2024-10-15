import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faDocker } from "@fortawesome/free-brands-svg-icons";
import { NavLink, Link } from "react-router-dom";

const MobileNav = ({ navigationLinks }) => {
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (index) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <div className="w-4/5 h-full overflow-x-hidden flex flex-grow flex-col justify-between">
        <div className="mx-auto my-6">
          <FontAwesomeIcon
            icon={faDocker}
            className="text-black w-20 h-20 mr-4"
          />
        </div>
        <div className="mt-4 space-y-2">
          {navigationLinks.map((link, index) => (
            <div key={index}>
              <div className="block">
                <div
                  onClick={() => toggleDropdown(index)}
                  className="hover:text-amber-400 cursor-pointer flex justify-between mt-1 mb-1"
                >
                  {link.sublinks.length == 0 ? (
                    <NavLink
                      to={link.href}
                      className={({ isActive }) =>
                        isActive ? "text-amber-400 px-3" : "px-3"
                      }
                    >
                      {link.name}
                    </NavLink>
                  ) : (
                    <div className="hover:text-amber-400 px-3 flex justify-between items-center w-full">
                      <span className="text-left">{link.name}</span>
                      <FontAwesomeIcon
                        icon={faAngleDown}
                        className="text-right"
                      />
                    </div>
                  )}
                </div>
                {openDropdowns[index] && link.sublinks.length > 0 && (
                  <div className="text-white text-sm w-full mt-1 rounded-md pl-4">
                    {link.sublinks.map((sublink, subindex) => (
                      <NavLink
                        key={subindex}
                        to={link.subhrefs[subindex]}
                        className={({ isActive }) =>
                          isActive
                            ? "block px-4 py-2 bg-orange-600 text-white mt-1 mb-1"
                            : "block px-4 py-2 hover:bg-orange-600 hover:text-white transition-colors"
                        }
                      >
                        {sublink}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
              {index < navigationLinks.length - 1 && (
                <hr className="border-t-2 border-gray-300 w-full mx-3" />
              )}
            </div>
          ))}
        </div>
        <div className="flex-grow"></div>
        <hr className="border-t-2 border-gray-300 w-full mx-3" />
        <div className="mb-8">
          <Link
            to="/regis/login"
            className="block px-6 py-2 text-white hover:text-amber-400"
          >
            {" "}
            <FontAwesomeIcon icon={faRightFromBracket} /> Log out
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
