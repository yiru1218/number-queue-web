import './App.css';
import CurrentDataTable from './components/current-waitline/current-data-table';
import CurrentWaitLine from './components/current-waitline/current-waitline';

function App() {
  return (
    <div className="Container">
      <CurrentWaitLine />
      <CurrentDataTable />
    </div>
  );
}

export default App;
