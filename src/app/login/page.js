import { LoginContext } from "@/services/context";
import { useState } from "react";

export const metadata = {
  title: "Connexion",
};

export default function LoginForm() {

  const { token, setToken } = useContext(LoginContext);

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // si loggué, goto dashboard
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = await login({ username, password });
      setToken(token);
      navigate("/dashboard");
    } catch (err) {
      setMessage(err.message);
    }
  };

  if (token) {
    return <p>Redirection...</p>;
  }

  return (
    <form action={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" placeholder="Name" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="Email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  )
}