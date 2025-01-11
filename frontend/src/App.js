import Header from './components/header/header.js';
import Footer from './components/footer/Footer.js';
import Result from './components/Result/Result.js';
import Filter from './components/Filter/Filter.js';
import Login from './components/Login/login.js';
import { Admin } from './components/Admin/admin.js';
import Contact from './components/Nav/Contact.js';
import About from './components/Nav/About.js';
import Nomatch from './components/Nav/404.js';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Protected from './components/Auth/Auth.js';
import { loginContext } from './loginContext.js';
import { useContext } from 'react';

const config = { label: 'submit', type: 'submit' };
function App() {
  const context = useContext(loginContext);
  return (
    <loginContext.Provider value={context}>
      <div className="app-cont">
        <header className="app-header">
          <Header />
        </header>
        <main className="main">
          <Routes>
            <Route path="/" element={<Filter />} />
            <Route
              path="/admin"
              element={
                <Protected>
                  <Admin />
                </Protected>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Nomatch />} />
          </Routes>
        </main>
        <section className="app-footer">
          <Footer />
        </section>
      </div>
    </loginContext.Provider>
  );
}

export default App;
