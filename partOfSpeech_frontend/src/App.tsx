import AppLayout from './layouts/AppLayout';
import { BrowserRouter as Router } from "react-router-dom";



function App() {
  return (
    <div>
      <Router>
        <AppLayout />
      </Router>
    </div>
  );
}

export default App;
