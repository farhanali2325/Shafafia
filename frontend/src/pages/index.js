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
      setData([]); // Clear previous data
  
      // Make MongoDB API call
      const mongoResponse = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}api/fetch-endorsments`, searchParams);
  
      // Check if MongoDB response is null or its data array length is 0
      if (mongoResponse.data == '' ) {
        // If MongoDB response is null or empty, make Java API call
        const javaResponse = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL_JAVA}Policy/EndorsementDetails`, searchParams);
        if (javaResponse.data) {
          setData(javaResponse.data); // Update state with Java API data
          const mongoResponse = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}api/save-endorsments`, javaResponse.data);
        } else {
          setData([]); // Set data to empty array if no records found from Java API
        }
      } else {
        // If MongoDB response has data, use that
        setData(mongoResponse.data); // Update state with MongoDB data
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
