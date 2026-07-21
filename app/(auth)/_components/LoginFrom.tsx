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
import { loginAction, LoginState } from "../_actions/authAction";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const initialState: LoginState = {
  success: false,
  statusCode: 0,
  message: "",
  data: {
    accessToken: "",
    refreshToken: "",
  },
};

const LoginFrom = () => {

  const [state, action, pending] = useActionState(loginAction, initialState);

  useEffect(() => {
    if (!state) return
    if (state.success) {
      toast.success(state.message || "Login Successfull")
      // router.push('/user-dashboard')
    }
   else{
     toast.error(state.message || "Login Failed")
    
    }
   
  }, [state])

  return (
    <form action={action} className="space-y-4 w-full max-w-sm">
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
            {pending ? 'Submitting...' : 'Login'}
          </Button>
          <Button type="button" variant="outline" className="w-full">
            Login with Google
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

export default LoginFrom;
