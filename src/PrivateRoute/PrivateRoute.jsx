import Lottie from "lottie-react";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import spinner from "../../spinner.json";
import { AuthContext } from "../AuthProvider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { users, loader } = useContext(AuthContext);
  const location = useLocation();

  console.log(location);
  console.log(location.pathname);
  console.log(loader);
  console.log(users);

  if (loader) {
    return (
      <div className="flex justify-center items-center">
        {/* <span className="loading loading-spinner loading-lg"></span> */}
        <Lottie animationData={spinner} />
      </div>
    );
  }
  if (users) {
    return children;
  }
  return (
    <Navigate state={location.pathname} to="/login" replace="true"></Navigate>
  );
};

export default PrivateRoute;
