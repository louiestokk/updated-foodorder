import React, { useState, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { restaurants } from "../utils/data";
const FirebaseContext = React.createContext();

const FirebaseProvider = ({ children }) => {
  const [logedinUser, setLogedinUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [usersBusiness, setUsersBusiness] = useState([]);

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "zanzifood-98826.firebaseapp.com",
    databaseURL: "https://zanzifood-98826-default-rtdb.firebaseio.com",
    projectId: "zanzifood-98826",
    storageBucket: "zanzifood-98826.appspot.com",
    messagingSenderId: "554696686395",
    appId: "1:554696686395:web:dcadb3237dfc66e673951e",
    measurementId: "G-PGJTLMRSXM",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const checkAuthUserIfHaveBusiness = (user) => {
    const business = restaurants.filter(
      (el) => el.loid === user.reloadUserInfo.localId
    );
    if (business.length > 0) {
      setUsersBusiness(business);
    }
  };

  const signIn = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setLogedinUser(user);
        setLoading(false);
        checkAuthUserIfHaveBusiness(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <FirebaseContext.Provider
      value={{
        logedinUser,
        setLogedinUser,
        loading,
        setLoading,
        usersBusiness,
        setUsersBusiness,
        signIn,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebaseContext = () => {
  return useContext(FirebaseContext);
};

export { FirebaseContext, FirebaseProvider };
