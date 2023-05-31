import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';

const Dashboard = () => {

    const options = {
        method: 'GET',
        url: 'https://covid-193.p.rapidapi.com/statistics',
        headers: {
          'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
          'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
        }
      };
      
      try {
          const response = axios.request(options);
          console.log(response);
      } catch (error) {
          console.error(error);
      }



    return (
      <>
        <div className="flex justify-center items-center text-blue-lover text-4xl font-bold m-5 text-center bg-black-lover rounded-3xl h-12">DASHBOARD</div>
        <div className="flex w-128 justify-between mx-20 bg-black-lover p-10 rounded-2xl">
            <div className="text-blue-lover">
                <h2 className="text-2xl">TOTAL MATCHES</h2>
            </div>
            <div className="text-blue-lover">
                <h2 className="text-2xl">CONNECTED USERS</h2>
            </div>
            <div className="text-blue-lover">
                <h2 className="text-2xl">RATIO MERGE/CONST</h2>
            </div>

            {/* <Doughnut data={...} /> */}
        </div>
      </>
    );
  };
  
export default Dashboard;