import { useContext } from "react";
import SocketContext from "../context/SocketContext";
import { BandList } from "../components/BandList";
import { BandAdd } from "../components/BandAdd";
import { BandChart } from "../components/BandChart";


function HomePage() {

  const { online } = useContext( SocketContext )


  return (
    <div className='container'>
      <div className='alert'>
        <p>
          Status: 
          {
            online 
            ? <span className='text-success mx-2 d-inline-flex align-items-center gap-1'>Online <div style={{width: '10px', height:'10px', borderRadius: '50%', backgroundColor: 'green'}}></div></span>
            : <span className='text-danger mx-2 d-inline-flex align-items-center gap-1'>Offline <div style={{width: '10px', height:'10px', borderRadius: '50%', backgroundColor: 'red'}}></div></span>
          }
        </p>
      </div>

      <h1>The Best Bands</h1>
      <hr />

      <div className="row">
          <div className="cols-8">
            <BandChart />
          </div>
      </div>

      <div className='row'>
        <div className='col-8'>
          <BandList />
        </div>
        <div className='col-4'>
          <BandAdd />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
