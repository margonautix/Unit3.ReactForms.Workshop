import { useState } from "react";

export default function SignUpForm({ token, setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    setErrors({ username: "", password: "" });

    let formIsValid = true;
    if (username.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Username must be at least 8 characters long.",
      }));
      formIsValid = false;
    }
    if (password.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 8 characters long.",
      }));
      formIsValid = false;
    }
    if (!formIsValid) return;

    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          body: JSON.stringify({
            username: username,
            password: password,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const result = await response.json();
      console.log(result);

      setToken(result.token);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="formDiv">
        <h2>Sign Up!</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:{" "}
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>{" "}
          {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
          <br />
          <label>
            Password:{" "}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>{" "}
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
          <br />
          <button className="subbutton">Submit</button>
        </form>
      </div>
    </>
  );
}
