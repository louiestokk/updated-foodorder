import React, { useState } from "react";
import Stripecheckout from "../components/Stripecheckout";
import AdressForm from "../components/AdressForm";
import { Paper, Stepper, Step, StepLabel } from "@material-ui/core";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const steps = ["Address", "Payment"];
const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "food-a14ec.firebaseapp.com",
    databaseURL:
      "https://food-a14ec-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "food-a14ec",
    storageBucket: "food-a14ec.appspot.com",
    messagingSenderId: "940026090369",
    appId: "1:940026090369:web:007a7ba2c8b1091657ce80",
    measurementId: "G-QZFKVCLKMP",
  };
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const database = getDatabase();
  return (
    <div>
      <Paper>
        <Stepper activeStep={activeStep}>
          {steps.map((step) => {
            return (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Paper>
      {activeStep === 0 && <AdressForm setActiveStep={setActiveStep} />}
      {activeStep === 1 && <Stripecheckout setActiveStep={setActiveStep} />}
    </div>
  );
};

export default Checkout;
