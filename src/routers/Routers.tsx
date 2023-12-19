import { Routes, Route } from "react-router-dom";
import Form from "../components/form/Form";
import Login from "../components/login/Login";
import MainPage from "../components/mainPage/MainPage";

const Routers: React.FC<any> = ({ user }) => {
  const arrToElem: Array<{ element: JSX.Element; path: string }> = [
    {
      element:
        user?.isActive === true ? <MainPage user={user} /> : <div>no</div>,
      path: "/",
    },
    {
      element:
        user?.isActive === true ? <MainPage user={user} /> : <div>no</div>,
      path: "/users/:id",
    },
    { element: <Form />, path: "/auth" },
    { element: <Login />, path: "/sign" },
  ];

  return (
    <Routes>
      {arrToElem.map(({ element, path }, i) => (
        <Route key={i} path={path} element={element} />
      ))}
    </Routes>
  );
};

export default Routers;
