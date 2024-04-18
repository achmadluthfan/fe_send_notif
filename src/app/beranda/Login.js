"use client";
import { useContext, useState } from "react";
import { AuthContext } from "@/service/authentication/AuthProvider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const [credential, setCredential] = useState({ username: "", password: "" });

  const { LogIn } = useContext(AuthContext);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your username and password below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            onChange={(e) => {
              setCredential({
                ...credential,
                username: e.target.value,
              });
            }}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            onChange={(e) => {
              setCredential({
                ...credential,
                password: e.target.value,
              });
            }}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={async () => {
            const { username, password } = credential;
            await setCredential({
              username: "",
              password: "",
            });
            return await LogIn({ identifier: username, password: password });
          }}
        >
          Sign in
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
