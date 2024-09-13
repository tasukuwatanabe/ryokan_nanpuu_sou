import { Link } from "@tanstack/react-router";
import { CircleUser } from "lucide-react";

import { doSignOut } from "@/firebase/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "../contexts/authContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

const Header = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const redirectMyPage = () => {
    navigate({ to: "/mypage" });
  };

  return (
    <header className="sticky top-0 border-b bg-background">
      <div className="max-w-[1000px] flex h-16 justify-between items-center m-auto px-6">
        <nav className="flex-col gap-6 text-lg font-medium">
          <Link to="/" className="text-xl">
            南風荘
          </Link>
        </nav>
        <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          {userLoggedIn ? (
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
                <DropdownMenuItem
                  className="block hover:cursor-pointer"
                  onClick={redirectMyPage}
                >
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
            <div className="flex gap-x-4 md:gap-x-10">
              <Link to="/login" className="text-sm">
                ログイン
              </Link>
              <Link to="/register" className="text-sm">
                新規登録
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
