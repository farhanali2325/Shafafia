import React from 'react';
import { useRouter } from 'next/router';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

const EditButton = ({ row, onEdit, isDisabled }) => (
  <button className="btn btn-primary" onClick={() => onEdit(row)} disabled={isDisabled}>
    <i className="fas fa-edit"></i>
  </button>
);

const DataTable = ({ data, setData }) => {
  const router = useRouter();

  const handleEdit = async (row) => {
    const { cardNo, polNo, endNo } = row;
    const payload = { cardNo, polNo, endNo };
    
    try {
      // Check MongoDB first
      const mongoDBResponse = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}api/person`, payload);
      if (mongoDBResponse.data) {
        // Record found in MongoDB
        router.push({
          pathname: '/edit',
          query: { data: JSON.stringify(mongoDBResponse.data) },
        });
      } else {
        // Record not found in MongoDB, fetch from INHOUSE
        const inhouseResponse = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL_JAVA}Policy/MemberDetails`, payload);
        const memberData = inhouseResponse.data;
        router.push({
          pathname: '/edit',
          query: { data: JSON.stringify(memberData) },
        });
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error:', error);
    }
  };

  const uploadStatusFormatter = (cell, row) => {
    return (
      <span style={{ color: cell == 1 ? 'green' : 'red' }}>
        {cell == 1 ? 'Success' : 'Error'}
      </span>
    );
  };

  const columns = [
    { dataField: 'polNo', text: 'Policy Number', sort: true, filter: textFilter() },
    { dataField: 'endName', text: 'Endorsement', sort: true, filter: textFilter() },
    { dataField: 'endNo', hidden: true },
    { dataField: 'memName', text: 'Member Name', sort: true, filter: textFilter() },
    { dataField: 'exitDate', text: 'Date To', sort: true, filter: textFilter() },
    { dataField: 'eidNo', text: 'Emirates ID', sort: true, filter: textFilter() },
    { dataField: 'cardNo', text: 'Medical Card Number', sort: true, filter: textFilter() },
    { dataField: 'memType', text: 'Member Type', sort: true, filter: textFilter() },
    { dataField: 'entryDate', text: 'Entry Date', sort: true },
    { dataField: 'relation', text: 'Relation', sort: true, filter: textFilter() },
    { dataField: 'visaRegion', text: 'Visa Region', sort: true, filter: textFilter() },
    { dataField: 'validStatus', text: 'Valid Status', sort: true, hidden: true },
    { dataField: 'uploadStatus', text: 'Upload Status', sort: true, formatter: uploadStatusFormatter },
    {
      dataField: 'edit',
      text: 'Edit',
      formatter: (cell, row) => <EditButton row={row} onEdit={handleEdit} isDisabled={row.uploadStatus == 1} />,
    },
  ];

  if (!data.length) {
    return <div>No data available</div>;
  }

  return (
    <BootstrapTable
      keyField="polNo"
      data={data}
      columns={columns}
      pagination={paginationFactory()}
      filter={filterFactory()}
      cellEdit={false}
      wrapperClasses="table-responsive"
      headerClasses="thead-dark"
    />
  );
};

export default DataTable;
