import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1 page-padding">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}