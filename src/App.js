import ProductListing from './component/ProductListing/ProductListing';
import './App.css';

function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        <div className="container">
          <h1 class="healthHeader">Health and Glow</h1>
        </div>
          
      </header>
      <ProductListing />
    </div>
  );
}

export default App;
