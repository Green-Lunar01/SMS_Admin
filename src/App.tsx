import Header from './components/Header';
import Navigation from './components/Navigation';
import Rout from './components/Rout';
import './index.css';

const App = () => {
  return (
    <div>
      <Header />

      <div className="border border-red-600 flex px-5">
        <Navigation />

        <div className="border border-blue-600 w-[95%] py-5 px-8">
          <Rout />
        </div>
      </div>
    </div>
  );
};

export default App;
