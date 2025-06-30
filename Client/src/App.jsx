import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";
import { GoogleBtn } from "./Google";

function App() {
  const id = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  return (
    <GoogleOAuthProvider clientId={id}>
      <GoogleBtn />
    </GoogleOAuthProvider>
  );
}

export default App;
