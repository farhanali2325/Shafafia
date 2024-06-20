import 'bootstrap/dist/css/bootstrap.min.css';
import Datatable from '../components/DataTable';
import HorizontalForm from '../components/HorizontalForm';
import styles from '../styles/Home.module.css';
import { useState } from 'react';

export default function Home() {
  const [data, setData] = useState([]);

  const handleSearch = (fetchedData) => {
    setData(fetchedData);
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
          <Datatable data={data} />
        </div>
      )}
    </>
  );
}
