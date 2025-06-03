import '../App';
import HikeTable from '../components/hikeTable';
import {MileCalc} from '../components/milecalc';

function Home() {
  return (
    <div>
      <h1>Hiking Trails</h1>
      <MileCalc />
      <HikeTable />
    </div>
  );
}

export default Home;