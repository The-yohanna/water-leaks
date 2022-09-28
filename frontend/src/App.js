import ReportedLeaks from './components/reportedLeaks.js';
import ResponsiveAppBar from './components/navbar.js';
import WaterLeaks from './components/waterLeaks.js';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <ResponsiveAppBar />
      <Routes>
        <Route path='/' element={<WaterLeaks />} />
        <Route path='/reportedLeaks' element={<ReportedLeaks />} />
      </Routes>
    </Router>
  );
};

export default App;
