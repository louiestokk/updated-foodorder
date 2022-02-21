import React, { useState } from "react";
import Stripecheckout from "../components/Stripecheckout";
import AdressForm from "../components/AdressForm";
import { Paper, Stepper, Step, StepLabel } from "@material-ui/core";

const steps = ["Address", "Payment"];
const Checkout = ({ sendOrderData, setContact, contact, orderId }) => {
  const [activeStep, setActiveStep] = useState(0);

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
      {activeStep === 0 && (
        <AdressForm
          setActiveStep={setActiveStep}
          setContact={setContact}
          contact={contact}
          sendOrderData={sendOrderData}
          orderId={orderId}
        />
      )}
      {activeStep === 1 && (
        <Stripecheckout
          setActiveStep={setActiveStep}
          sendOrderData={sendOrderData}
        />
      )}
    </div>
  );
};

export default Checkout;
