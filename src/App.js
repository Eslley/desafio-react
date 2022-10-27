import { Container } from "@mui/material";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="App">
      <Container sx={{ minHeight: '80%', mt: '3em', pb: '1em' }}>
        <Home />
      </Container>
    </div>
  );
}

export default App;
