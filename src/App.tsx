import React from 'react';
import Navbar from './components/navbar';
import Main from './components/main';

const App: React.FC = () => {
  return (
    <div className='w-screen h-screen flex flex-col'>
      <Navbar />
      <Main />
    </div>
  );
}

export default App;
