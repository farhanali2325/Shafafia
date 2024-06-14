import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

const Datatable = ({ searchParams }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (searchParams) {
      axios.get('/api/data', { params: searchParams })
        .then(response => {
          setData(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [searchParams]);

  const columns = [
    { dataField: 'policyNumber', text: 'Policy Number', sort: true, filter: textFilter() },
    { dataField: 'endorsement', text: 'Endorsement', sort: true, filter: textFilter() },
    { dataField: 'memberName', text: 'Member Name', sort: true, filter: textFilter() },
    { dataField: 'dateTo', text: 'Date To', sort: true, filter: textFilter() },
    { dataField: 'emiratesId', text: 'Emirates ID', sort: true, filter: textFilter() },
    { dataField: 'medicalCardNumber', text: 'Medical Card Number', sort: true, filter: textFilter() },
    { dataField: 'memberType', text: 'Member Type', sort: true, filter: textFilter() },
    { dataField: 'entryDate', text: 'Entry Date', sort: true },
    { dataField: 'reltaion', text: 'Reltaion', sort: true, filter: textFilter() },
    { dataField: 'visaRegion', text: 'Visa Region', sort: true, filter: textFilter() },
    { dataField: 'validStatus', text: 'Valid Status', sort: true },
    { dataField: 'uploadStatus', text: 'Upload Status', sort: true },
    {
      dataField: 'edit',
      text: 'Edit',
      formatter: (cell, row) => (
        <button className="btn btn-primary" onClick={() => handleEdit(row)}>
          <i className="fas fa-edit"></i>
        </button>
      ),
    },
  ];

  const handleEdit = (row) => {
    console.log('Edit row:', row);
    // Add your edit logic here
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BootstrapTable
      keyField="policyNumber"
      data={data}
      columns={columns}
      pagination={paginationFactory()}
      filter={filterFactory()}
      cellEdit={false}
    />
  );
};

export default Datatable;
