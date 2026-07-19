"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginAction } from "../_actions/authAction";

const LoginFrom = () => {
  return (
    <form action={loginAction} className="space-y-4 w-full max-w-sm">
      <Card className="">
        <CardHeader className="">
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="Enter your password"
            required
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

export default LoginFrom;
