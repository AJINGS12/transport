import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import NavigationLink from "./NavigationLink";
import MobileNav from "./MobileNav";
import ProfileButton from "./ProfileButton";

const NavBar = () => {
  const navigationLinks = [
    {
      name: "Payment",
      href: "/payment",
      sublinks: [],
      subhrefs: [],
    },
    {
      name: "Learning",
      href: "/library",
      sublinks: ["Library", "Online Courses", "Online Exams"],
      subhrefs: ["/library", "/courses", "/exams"],
    },
    {
      name: "Campus Services",
      href: "/clubs",
      sublinks: ["Clubs", "Transport", "Parking & Bikes", "Buildings & Safety"],
      subhrefs: ["/clubs", "/transport", "/parking", "/security"],
    },
    {
      name: "Help & Tools",
      href: "/attendance",
      sublinks: ["Attendance", "Help Bot", "Campus Map"],
      subhrefs: ["/attendance", "/botastra", "/map"],
    },
    {
      name: "Registration",
      href: "/regis/course",
      sublinks: [],
      subhrefs: [],
    },
    {
      name: "Grade",
      href: "/regis/grade",
      sublinks: [],
      subhrefs: [],
    },
  ];

  const mobileNavRef = useRef(null); // mobile nav reference
  const [isOpen, setIsOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileNavRef.current &&
        !mobileNavRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close navbar when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (!isOpen) {
        const currentScrollPos = window.scrollY;
        if (prevScrollPos > currentScrollPos || currentScrollPos < 50) {
          setIsNavVisible(true);
        } else {
          setIsNavVisible(false);
        }
        setPrevScrollPos(currentScrollPos);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, isOpen]);

  return (
    <nav
      className={`w-full fixed font-georama  transition-transform duration-300 ${
        isNavVisible ? "transform translate-y-0" : "transform -translate-y-full"
      } ${isOpen && " overflow-y-auto h-full z-[100]"}`}
    >
      {/* Desktop Nav Bar */}
      <div
        className={`hidden min-[900px]:block text-white bg-gradient-to-r from-[#c2544d] to-[#f09107] `}
      >
        <div className="h-16 flex py-2 mx-auto px-8 max-w-7xl justify-between items-center">
          <Link to="/">
            <div className="text-xl font-bold">CampusLink</div>
          </Link>
          <div className="ml-6 flex-grow flex-wrap">
            {navigationLinks.map((link, index) => (
              <NavigationLink key={index} link={link} index={index} />
            ))}
          </div>
          <ProfileButton />
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div
        className={`min-[900px]:hidden text-white py-2 px-4 flex flex-col justify-between bg-gradient-to-r from-[#c2544d] to-[#f09107]  ${
          isOpen && "w-3/4 h-full rounded-e-2xl"
        }`}
        ref={mobileNavRef}
      >
        <div className="flex justify-between items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`inline-flex items-center justify-center rounded-md p-2 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
          >
            {isOpen ? (
              <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
            ) : (
              <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
            )}
          </button>

          {!isOpen && <ProfileButton />}
        </div>
        {isOpen && <MobileNav navigationLinks={navigationLinks} />}
      </div>
    </nav>
  );
};

export default NavBar;
