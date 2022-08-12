import React from "react";
import { Container } from 'react-bootstrap';
import "./App.css";
import { OrderDetailsProvider } from './contexts/OrderDetails';
import OrderEntry from './pages/entry/OrderEntry';

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summay page and entry page need provider */}
        <OrderEntry />
      </OrderDetailsProvider>
      {/* Confirmation page doesn't need provider */}
    </Container>
  );
}

export default App;
