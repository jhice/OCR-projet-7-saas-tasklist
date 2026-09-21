'use client';

import { LoginContext } from "@/services/context";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/api";

export default function LoginForm() {

  const { token, setToken } = useContext(LoginContext);
  console.log("token", token);
  
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState("Entrez vos identifiants");

  const router = useRouter();

  // si loggué, goto dashboard
  useEffect(() => {
    // if (token) {
    //   router.push("/");
    // }
  });

  const handleSubmit = async formData => {
    try {
      // login vers le backend
      const responseData = await login({
        email: formData.get("email"),
        password: formData.get("password")
      });
      setToken(responseData.data.token);
      router.push("/");
    } catch (err) {
      setMessage(err.message);
    }
  };

  // if (token) {
  //   return <p>Redirection...</p>;
  // }

  return (
    <form action={handleSubmit}>
      {/* <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" placeholder="Name" />
      </div> */}
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" defaultValue="alice@example.com" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" defaultValue="P@ssword123" />
      </div>
      <button type="submit">Sign Up</button>
      <p>{message}</p>
    </form>
  )
}