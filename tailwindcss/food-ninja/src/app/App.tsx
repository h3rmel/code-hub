// Router
import Router from "./pages/Router";

// Component(s)
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="text-gray-600 font-default grid md:grid-cols-5">
      <Navbar />
      <Router />
    </div>
  );
};

export default App;
