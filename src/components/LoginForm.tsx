import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "@/firebase/auth";
import { useAuth } from "@/contexts/authContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "メールアドレスの形式が正しくありません。" }),
  password: z.string().min(6, "パスワードは6文字以上で入力してください。"),
});

const LoginForm = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const pathname = useLocation();
  const redirectPath = pathname.pathname === "/login" ? "/" : pathname.pathname;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!userLoggedIn) {
      try {
        await doSignInWithEmailAndPassword(values.email, values.password);

        navigate({ to: redirectPath });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      await doSignInWithGoogle();

      location.pathname = redirectPath;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>メールアドレス</FormLabel>
                  <FormControl>
                    <Input placeholder="hello@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>パスワード</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="">
              <Link to="/" className="ml-auto inline-block text-sm underline">
                パスワードを忘れた場合
              </Link>
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-400">
            ログイン
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleSignInWithGoogle}
            className="w-full"
          >
            Googleでログイン
          </Button>
        </div>
        <div className="text-center text-sm">
          アカウントをお持ちでない方は{" "}
          <Link to="/register" className="underline">
            新規登録
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
