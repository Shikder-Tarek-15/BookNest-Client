import axios from "axios";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  // Register
  const registerUser = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   Login
  const loginUser = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //google
  const google = () => {
    setLoader(true);
    return signInWithPopup(auth, googleProvider);
  };

  //gitHub
  const github = () => {
    setLoader(true);
    return signInWithPopup(auth, githubProvider);
  };

  //Logout
  const logOut = () => {
    setLoader(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };
      setUser(currentUser);

      setLoader(false);

      if (currentUser) {
        axios
          .post(`${import.meta.env.VITE_API_LINK}/jwt`, loggedUser, {
            withCredentials: true,
          })
          .then((res) => {
            console.log("token", res.data);
          });
      } else {
        axios
          .post(`${import.meta.env.VITE_API_LINK}/logOut`, loggedUser, {
            withCredentials: true,
          })
          .then((res) => {
            console.log("I am tarek", res.data);
          });
      }
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const value = {
    user,
    loader,
    registerUser,
    loginUser,
    logOut,
    google,
    github,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
