import React from 'react';
import './App.css';
import VideoProcessor from './VideoProcessor';
import RequirementsModal from './RequirementsModal';

function App() {
  return (
    <div className="App">
      <RequirementsModal />
      <VideoProcessor />
    </div>
  );
}

export default App;
