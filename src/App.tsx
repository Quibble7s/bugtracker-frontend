import React, { useEffect } from 'react';
import { Container } from './Components/Layout';
import { useAuth } from './Hooks';

function App() {
  const { user } = useAuth();
  console.log(user);

  return (
    <div>
      <Container>Hello World</Container>
    </div>
  );
}

export default App;
