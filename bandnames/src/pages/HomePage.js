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
          Service Status: 
          {
            online 
            ? <span className='text-success mx-2'>Online</span>
            : <span className='text-danger mx-2'>Offline</span>
          }
        </p>
      </div>

      <h1>BandNames</h1>
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
