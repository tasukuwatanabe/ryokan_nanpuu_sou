import { Link, useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  doCreateUserWithEmailAndPassword,
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

const RegisterForm = () => {
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
        await doCreateUserWithEmailAndPassword(values.email, values.password);

        navigate({ to: "/" });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      await doSignInWithGoogle();

      window.location.href = "/";
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
          </div>
        </div>
        <div className="grid gap-4">
          <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-400">
            新規登録
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleSignInWithGoogle}
            className="w-full"
          >
            Googleで新規登録
          </Button>
        </div>
        <div className="text-center text-sm">
          アカウントをお持ちの方は{" "}
          <Link to="/register" className="underline">
            ログイン
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
