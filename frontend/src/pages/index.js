import 'bootstrap/dist/css/bootstrap.min.css';
import Datatable from '../components/DataTable';
import HorizontalForm from '../components/HorizontalForm';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [data, setData] = useState([]);

  // Function to handle search and update data
  const handleSearch = async (searchParams) => {
    try {
      setData([]);
        const javaResponse = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL_JAVA}Policy/EndorsementDetails`, searchParams);
        if (javaResponse.data) {
          setData(javaResponse.data);
        }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data');
    }
  };

  return (
    <>
      <div className={`container-fluid ${styles.fullWidthContainer}`}>
        <h1 className="my-4">Fetch List</h1>
        <HorizontalForm onSearch={handleSearch} />
      </div>
      {data.length > 0 && (
        <div className={`container-fluid mt-5 ${styles.fullWidthContainer}`}>
          <h1>Data Table</h1>
          <Datatable data={data} setData={setData} /> {/* Pass setData to DataTable */}
        </div>
      )}
    </>
  );
}
