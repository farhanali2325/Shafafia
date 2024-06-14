import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Datatable from '../components/DataTable';
import HorizontalForm from '../components/HorizontalForm';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [searchParams, setSearchParams] = useState(null);

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  return (
    <>
      <div className={`container-fluid ${styles.fullWidthContainer}`}>
        <h1 className="my-4">Fetch List</h1>
        <HorizontalForm onSearch={handleSearch} />
      </div>
      {searchParams && (
        <div className={`container-fluid mt-5 ${styles.fullWidthContainer}`}>
          <h1>Data Table</h1>
          <Datatable searchParams={searchParams} />
        </div>
      )}
    </>
  );
}
