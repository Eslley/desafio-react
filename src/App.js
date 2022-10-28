import { Container } from "@mui/material";
import AlertMessageProvider from "./components/AlertMessageProvider";
import ToastMessageProvider from "./components/ToastMessageProvider";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="App">
      <Container sx={{ height: '100%', mt: '10%', pb: '1em', }}>
        <AlertMessageProvider>
          <ToastMessageProvider>
            <Home />
          </ToastMessageProvider>
        </AlertMessageProvider>
      </Container>
    </div>
  );
}

export default App;
