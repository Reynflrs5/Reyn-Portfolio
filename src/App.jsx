import { useState } from "react";
import Profile from "./pages/Profile";
import IceBackground from "./Components/IceBackground/IceBackground";
import LoadingScreen from "./Components/LoadingScreen/LoadingScreen";

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <IceBackground />
      <Profile />
    </>
  );
}

export default App;
