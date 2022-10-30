import { Container } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AlertMessageProvider from "./components/AlertMessageProvider";
import ToastMessageProvider from "./components/ToastMessageProvider";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";

function App() {
  return (
      <Router>

        <Container sx={{ height: '100%', mt: '10%', pb: '1em', }}>
          <AlertMessageProvider>
            <ToastMessageProvider>
              
              <Routes>
                <Route path="/desafio-react" element={<Home />} />
                <Route path="/desafio-react/users" element={<Users />} />
              </Routes>

            </ToastMessageProvider>
          </AlertMessageProvider>
        </Container>

      </Router>
  );
}

export default App;
