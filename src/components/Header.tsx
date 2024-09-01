import { Link } from "@tanstack/react-router";
import { CircleUser } from "lucide-react";

import { doSignOut } from "../firebase/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth } from "../contexts/authContext";
import { Button } from "./ui/button";

const Header = () => {
  const { currentUser } = useAuth();

  return (
    <header className="sticky top-0 border-b bg-background">
      <div className="max-w-[1000px] flex h-16 justify-between items-center m-auto px-6">
        <nav className="flex-col gap-6 text-lg font-medium">
          <Link to="/" className="text-xl font-semibold">
            南風荘
          </Link>
        </nav>
        <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          {currentUser?.email ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="hover:cursor-pointer">
                  マイページ
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={doSignOut}
                  className="hover:cursor-pointer"
                >
                  ログアウト
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login" className="">
              ログイン
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
