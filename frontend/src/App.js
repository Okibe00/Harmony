import Header from './components/header/header.js';
import Footer from './components/footer/Footer.js';
import Result from './components/Result/Result.js';
import Filter from './components/Filter/Filter.js';
import Login from './components/Login/login.js';
import { Admin } from './components/Admin/admin.js';
import './App.css';

// import  Header from './components/Header';
// import  Header from './components/Header';
const config = { label: 'submit', type: 'submit' };
const isLoggedIn = true;
function App() {
  return (
    <div className="app-cont">
      <header className="app-header">
        <Header />
      </header>
      <main className="main">
        {/* <Admin /> */}
        {/* <Login /> */}
        {/* <Filter /> */}
        <Admin/>
        {/* <Result data={drugs} /> */}
      </main>
      <section className="app-footer">
        <Footer />
      </section>
    </div>
  );
}

export default App;
