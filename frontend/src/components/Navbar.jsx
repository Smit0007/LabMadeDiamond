import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuoteCart } from "../context/QuoteCartContext";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const {
    getTotalItems,
  } = useQuoteCart();

  const totalItems =
    getTotalItems();

    const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        ) || "null"
      );

    const admin =
      JSON.parse(
        localStorage.getItem(
          "admin"
        ) || "null"
      );

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Catalog", path: "/catalog" },
    {
      name: `Quote Cart (${totalItems})`,
      path: "/quote-cart",
    },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "py-3"
          : "py-5"
      }`}
    >
      <div
        className={`container-custom transition-all duration-300 ${
          isScrolled
            ? "max-w-5xl rounded-full border border-neutral-200 bg-white/80 shadow-lg backdrop-blur-xl"
            : "max-w-7xl"
        }`}
      >
        <div className="flex items-center justify-between px-6">
          {/* Logo */}
          <Link
            to="/"
            className="py-4 text-xl font-bold tracking-wide"
          >
            Diamond
          </Link>

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-sm font-medium text-neutral-700 transition hover:text-black"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">

          {!user && !admin ? (
            <Link
              to="/login"
              className="primary-button"
            >
              Trade Login
            </Link>
          ) : (
            <>
              <span className="text-sm font-medium text-neutral-700">
                Hello,{" "}
                {user?.fullName ||
                  admin?.name}
              </span>

              <button
                onClick={() => {

                  localStorage.removeItem(
                    "token"
                  );

                  localStorage.removeItem(
                    "user"
                  );

                  localStorage.removeItem(
                    "adminToken"
                  );

                  localStorage.removeItem(
                    "admin"
                  );

                  window.location.href =
                    "/";
                }}
                className="primary-button"
              >
                Logout
              </button>
            </>
          )}

        </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-2xl"
            onClick={() =>
              setIsMobileOpen(!isMobileOpen)
            }
          >
            {isMobileOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            isMobileOpen
              ? "max-h-96 border-t border-neutral-200"
              : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4 p-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() =>
                  setIsMobileOpen(false)
                }
                className="text-neutral-700"
              >
                {item.name}
              </Link>
            ))}

            <Link
              to="/contact"
              onClick={() =>
                setIsMobileOpen(false)
              }
              className="primary-button"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}