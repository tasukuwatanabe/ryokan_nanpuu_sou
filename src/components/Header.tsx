import { Link } from "@tanstack/react-router";

const Header = () => {
  return (
    <header className="sticky top-0 border-b bg-background">
      <div className="max-w-[1000px] flex h-16 justify-between items-center m-auto px-4 md:px-6">
        <nav className="flex-col gap-6 text-lg font-medium">
          <Link to="/" className="text-xl">
            南風荘
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
