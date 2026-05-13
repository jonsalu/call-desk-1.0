
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router';
import FormPage from './components/FormPage';
import ListTicket from './components/ListTicket';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Criar Ticket</Link> | <Link to="/tickets">Listar Tickets</Link>
        </nav>
        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route path="/tickets" element={<ListTicket />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
