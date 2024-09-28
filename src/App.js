import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import './App.css';
import Create from './component/Create';
import Cards from './component/Cards';
import Update from './component/Update';
import { RecoilRoot } from 'recoil';
import { Toaster } from 'react-hot-toast';



function App() {
  return (
    <RecoilRoot>
    <Toaster />
      <Router>
        <Navbar />
        <Routes>
            <Route path = "/create" element = {<Create/>} />
            <Route path="/cards" element = {<Cards/>}/>
            <Route path="/challenge-update/:id" element = {<Update />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
