import { Outlet } from "react-router";
import "./App.scss";

function App() {
  return (
    <div className="parent">
      <header
        className="header"
        style={{ backgroundImage: `url("/header.svg")` }}
      >
        <span>Make MyNews your homepage</span>
        <span>Every day discover what’s trending on the internet!</span>
        <button>
          <strong>GET</strong>
        </button>
      </header>
      <div className="content">
        <div className="outletParent">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
