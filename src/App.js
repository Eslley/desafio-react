import { Container } from "@mui/material";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="App">
      <Container sx={{ height: '100%', mt: '10%', pb: '1em', }}>
        <Home />
      </Container>
    </div>
  );
}

export default App;
