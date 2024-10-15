import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const NavigationLink = ({ link, index }) => {
  return (
    <div className="dropdown dropdown-hover" key={index}>
      <div tabIndex={index} className="hover:text-amber-400 px-3">
        {link.sublinks.length === 0 ? (
          <NavLink
            to={link.href}
            className={({ isActive }) => (isActive ? "text-amber-400" : "")}
          >
            {link.name}
          </NavLink>
        ) : (
          <div>
            {link.name} <FontAwesomeIcon icon={faAngleDown} />
          </div>
        )}
      </div>

      {link.sublinks.length > 0 && (
        <ul
          tabIndex={index}
          className="dropdown-content menu bg-white text-[#864e41] rounded-box z-[1] w-52 p-2 shadow"
        >
          {link.sublinks.map((sublink, subindex) => (
            <li key={subindex} className="mt-1 mb-1">
              <NavLink
                to={link.subhrefs[subindex]}
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#f69800] text-white rounded-md hover:bg-[#f69800] hover:text-white hover:rounded-md"
                    : "hover:bg-[#f69800] hover:text-white hover:rounded-md"
                }
              >
                {sublink}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NavigationLink;
