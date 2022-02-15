import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SingelRestaurant from "./components/Restaurant/SingelRestaurant/SingelRestaurant";
import DashBoard from "./pages/DashBoard";
import { restaurants } from "./utils/data";
import Connect from "./pages/Connect";
import Cart from "./components/Cart";
import { getDatabase, ref, set } from "firebase/database";
import { useProductsContext } from "./context/products_context";
function App() {
  const { cart } = useProductsContext();
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
  // löst auth som checkar database och användare med loid === localid
  // så nu har vi access till dem som är auktoriserade och nu kan du börja bygga ui för dom så dom kan skapa meny mm. så ny skall dy bygga dashboard år användaren / admin för restauarngen egen route som är privat och där skall du fetch all info för just den restauarnegn från data.js nu och server sen

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
    <Router>
      <Navbar
        signIn={signIn}
        logedinUser={logedinUser}
        loading={loading}
        usersBusiness={usersBusiness}
      />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/connectbusiness" exact element={<Connect />} />
        <Route
          path="/cart"
          exact
          element={
            <Cart
              signIn={signIn}
              logedinUser={logedinUser}
              loading={loading}
              usersBusiness={usersBusiness}
            />
          }
        />
        <Route path={`/restaurant/:id`} exact element={<SingelRestaurant />} />
        <Route path={`/dashboard/:loid`} exact element={<DashBoard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
