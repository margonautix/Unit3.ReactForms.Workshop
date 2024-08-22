import { useState } from "react";

export default function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);

  async function handleClick() {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      console.log("API Response: ", result);
      console.log(result.data);

      setSuccessMessage(result.message);
      setUsername(result.data.username);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="auth">
      <h2>Authenticate</h2>
      {successMessage && <p>{successMessage}</p>}
      {username && <p>Welcome, {username}!</p>}
      {error && <p>{error}</p>}
      <button className="authbutton" onClick={handleClick}>
        Authenticate Token!
      </button>
    </div>
  );
}
