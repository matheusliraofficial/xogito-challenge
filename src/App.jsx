import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./components/Header";
import Project from "./pages/Project";
import User from "./pages/User";
import Home from "./pages/Home";

const pages = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "Create Project",
    path: "/project",
  },
  {
    id: 3,
    name: "Create User",
    path: "/user",
  },
];

const App = () => (
  <>
    <Header title="Xogito Challenge">
      {pages.map(({ id, name, path }) => (
        <Header.Item key={id} path={path}>
          {name}
        </Header.Item>
      ))}
    </Header>
    <Container maxWidth="xl" sx={{ my: 3 }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />}>
          <Route path=":id" element={<Project />} />
        </Route>
        <Route path="user" element={<User />} />
      </Routes>
    </Container>
  </>
);

export default App;
