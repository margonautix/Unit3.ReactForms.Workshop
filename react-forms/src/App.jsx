import { useState } from "react";
import Authenticate from "./components/Authenticate";
import SignUpForm from "./components/SignUpForm";
import "./App.css";

function App() {
  const [token, setToken] = useState(null);
  return (
    <>
      <div className="container">
        <Authenticate token={token} setToken={setToken} />
        <SignUpForm token={token} setToken={setToken} />
      </div>
    </>
  );
}

export default App;
