import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="container-custom py-14">
        <div className="grid gap-10 md:grid-cols-4">

          <div>
            <h2 className="text-2xl font-bold">
              Diamond
            </h2>

            <p className="mt-4 text-sm text-neutral-600">
              Premium supplier of CVD Certified,
              CVD Non-Certified and Wholesale
              Melee Diamonds.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">
              Navigation
            </h3>

            <ul className="space-y-3 text-sm text-neutral-600">
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/about">About</Link>
              </li>

              <li>
                <Link to="/catalog">
                  Catalog
                </Link>
              </li>

              <li>
                <Link to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">
              Collections
            </h3>

            <ul className="space-y-3 text-sm text-neutral-600">
              <li>CVD Certified</li>
              <li>CVD Non-Certified</li>
              <li>Wholesale Melee</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">
              Contact
            </h3>

            <div className="space-y-3 text-sm text-neutral-600">
              <p>Phone Number</p>
              <p>Email Address</p>
              <p>Business Address</p>
            </div>
          </div>

        </div>

        <div className="mt-10 border-t border-neutral-200 pt-6 text-center text-sm text-neutral-500">
          © {new Date().getFullYear()} Diamond.
          All rights reserved.
        </div>
      </div>
    </footer>
  );
}