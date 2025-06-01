import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./firebase/AuthProvider";
import PublicRoute from "./routes/access/PublicRoute";
import ProtectedRoute from "./routes/access/ProtectedRoute";
import CompleteSignUp from "./routes/complete-signup/CompleteSignUp";
import Home from "./routes/app/Home";
import Settings from "./routes/settings/Settings";
import UsersData from "./routes/users-data/UsersData";
import Login from "./routes/login/Login";
import { SignUp } from "./routes/signup/SignUp";
import SignUpSuccess from "./routes/complete-signup/SignupSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      // <PublicRoute>
      <SignUp />
      // </PublicRoute>
    ),
  },
  {
    path: "/signup-success",
    element: (
      // <PublicRoute>
      <SignUpSuccess />
      // </PublicRoute>
    ),
  },
  {
    path: "/completar-cadastro",
    element: <CompleteSignUp />,
  },
  {
    path: "/dados",
    element: (
      <ProtectedRoute>
        <UsersData />
      </ProtectedRoute>
    ),
  },
  {
    path: "/configuracoes",
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
