import React from 'react';
import { useRouter } from 'next/router';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

const Datatable = ({ data }) => {
  const router = useRouter();

  const handleEdit = async (row) => {
    const { cardNo, polNo, endNo } = row;
    const payload = { cardNo, polNo, endNo };

    try {
      const response = await axios.post('http://maneesha-pc:8089/Policy/MemberDetails', payload);
      const memberData = response.data;

      router.push({
        pathname: '/edit',
        query: { data: JSON.stringify(memberData) },
      });
    } catch (error) {
      console.error('Error fetching member details:', error);
      alert('Error fetching member details');
    }
  };

  const columns = [
    { dataField: 'polNo', text: 'Policy Number', sort: true, filter: textFilter() },
    { dataField: 'endName', text: 'Endorsement', sort: true, filter: textFilter() },
    { dataField: 'memName', text: 'Member Name', sort: true, filter: textFilter() },
    { dataField: 'exitDate', text: 'Date To', sort: true, filter: textFilter() },
    { dataField: 'eidNo', text: 'Emirates ID', sort: true, filter: textFilter() },
    { dataField: 'cardNo', text: 'Medical Card Number', sort: true, filter: textFilter() },
    { dataField: 'memType', text: 'Member Type', sort: true, filter: textFilter() },
    { dataField: 'entryDate', text: 'Entry Date', sort: true },
    { dataField: 'relation', text: 'Relation', sort: true, filter: textFilter() },
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
    />
  );
};

export default Datatable;
