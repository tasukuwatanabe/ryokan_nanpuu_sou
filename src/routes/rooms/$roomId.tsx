import {
  createFileRoute,
  Link,
  notFound,
  useNavigate,
} from "@tanstack/react-router";
import { getRoomById } from "@/api/room";

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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/contexts/authContext";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "@/firebase/auth";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "メールアドレスの形式が正しくありません。" }),
  password: z.string().min(6, "パスワードは6文字以上で入力してください。"),
});

const Room = () => {
  const { userLoggedIn } = useAuth();
  const { room } = Route.useLoaderData();
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

  const handleSignInWithGoogle = async () => {
    try {
      await doSignInWithGoogle();

      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl mb-8">確認と予約</h1>
      <div className="grid grid-cols-roomPageGrid gap-x-10 items-start">
        <div className="border p-4 rounded-sm">
          <div className="grid grid-cols-roomPageCardGrid gap-3">
            <img
              className="block w-[100px] h-[100px] object-cover rounded-lg"
              src={`/room/${room.image}`}
              alt={room.name}
            />
            <div>
              <h2 className="text-lg font-bold mb-1">{room.name}</h2>
              <p>{room.description}</p>
            </div>
          </div>
          <hr className="my-5" />
          <div className="flex justify-between px-2">
            <p>合計額</p>
            <p className="font-bold text-xl">¥32,800</p>
          </div>
        </div>
        <div>
          <div>
            <h2 className="text-2xl mb-2">{room.name}</h2>
            <p>{room.description}</p>
          </div>
          <hr className="my-6" />
          <div className="grid gap-y-7">
            <div className="grid gap-y-2">
              <p className="text-gray-500">宿泊日</p>
              <div className="flex justify-between">
                <div className="grid gap-y-2">
                  <p className="text-lg">10月1日〜10月3日</p>
                </div>
                <p className="underline">編集</p>
              </div>
            </div>
            <div className="grid gap-y-2">
              <p className="text-gray-500">宿泊人数</p>
              <div className="flex justify-between">
                <div>
                  <p className="text-lg">大人：2名</p>
                  <p className="text-lg">小人：3名</p>
                </div>
                <p className="underline">編集</p>
              </div>
            </div>
          </div>
          <hr className="my-6" />
          <div>
            <h2 className="text-2xl mb-6">
              予約するにはログインまたは登録してください
            </h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-8"
              >
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
          </div>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/rooms/$roomId")({
  component: Room,
  loader: async ({ params: { roomId } }) => {
    const room = await getRoomById(roomId);
    if (!room) throw notFound();

    return { room };
  },
});
