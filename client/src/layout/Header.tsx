import { Link } from "@tanstack/react-router";

function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-md fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Title */}
        <h1 className="text-2xl font-bold">📢 SI - NEWS</h1>

        {/* Navigation Menu */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/feedback" className="hover:underline">Feedback</Link>
        </nav>

        {/* Mobile Menu Button (Future Feature) */}
        <button className="md:hidden focus:outline-none">
          <span className="text-2xl">☰</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
