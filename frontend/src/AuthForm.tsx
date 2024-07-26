import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import type React from "react";
import { useState } from "react";

export const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast({
        title: "アカウント作成成功",
        description: "新しいアカウントが作成されました。",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "エラー",
        description: "アカウントの作成に失敗しました。",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "ログイン成功",
        description: "ログインに成功しました。",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "エラー",
        description: "ログインに失敗しました。",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      toast({
        title: "ログアウト成功",
        description: "ログアウトしました。",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "エラー",
        description: "ログアウトに失敗しました。",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>アカウント</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">パスワード</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleSignUp} disabled={isLoading}>
          登録
        </Button>
        <Button onClick={handleSignIn} disabled={isLoading}>
          ログイン
        </Button>
        <Button onClick={handleSignOut} variant="outline" disabled={isLoading}>
          ログアウト
        </Button>
      </CardFooter>
    </Card>
  );
};
