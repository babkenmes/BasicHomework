import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">        
        <form action="/upload_img" method="post" enctype="multipart/form-data">
          <input type="file" name="image" />
          <button>Upload</button>
        </form>
      </header>
    </div>
  );
}

export default App;
