import { Link, useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "@/firebase/auth";
import { useAuth } from "@/contexts/authContext";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  email: z.string(),
  password: z.string(),
});

const LoginForm = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

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

        navigate({ to: "/" });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSignInWithGoogle = async (e: any) => {
    try {
      await doSignInWithGoogle();

      navigate({ to: "/" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="w-full mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">ログイン</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
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
                  <Link
                    to="/"
                    className="ml-auto inline-block text-sm underline"
                  >
                    パスワードを忘れた場合
                  </Link>
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              <Button
                type="submit"
                className="w-full bg-sky-500 hover:bg-sky-400"
              >
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
      </CardContent>
    </Card>
  );
  // );
};

export default LoginForm;
