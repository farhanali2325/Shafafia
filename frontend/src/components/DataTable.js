import React from 'react';
import { useRouter } from 'next/router';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import styles from '../styles/Home.module.css'; // Adjust the path as necessary

const EditButton = ({ row, onEdit, isDisabled }) => (
  <button className="btn btn-primary btn-sm" onClick={() => onEdit(row)} disabled={isDisabled}>
    <i className="fas fa-edit"></i>
  </button>
);

const DataTable = ({ data }) => {
  const router = useRouter();
  const handleEdit = async (row) => {
    const { cardNo, polNo, endNo, endSrl } = row;
    const payload = { cardNo, polNo, endSrl };
    
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
    console.log("cell: ", cell)
    return (
      <span style={{ color: cell == 1 ? 'green' : 'red' }}>
        {cell == 1 ? 'Success' : 'Error'}
      </span>
    );
  };

  const uploadStatusFilter = textFilter({
    placeholder: 'Enter 0/1',
    filterCellStyle: { fontSize: '0.75rem', padding: '5px' }
  });

  const cellFormatter = (cell) => {
    return (
      <span data-tooltip={cell} className={styles.tableCellTooltip}>
        {cell}
      </span>
    );
  };

  const columns = [
    { dataField: 'polNo', text: 'Policy Number', sort: true, filter: textFilter({ filterCellStyle: { fontSize: '0.75rem', padding: '5px' } }), formatter: cellFormatter, style: { width: '100px' } },
    { dataField: 'endName', text: 'Endorsement', sort: true, filter: textFilter({ filterCellStyle: { fontSize: '0.75rem', padding: '5px' } }), formatter: cellFormatter, style: { width: '250px' } },
    { dataField: 'endNo', hidden: true },
    { dataField: 'endSrl',  text: 'End.Srl', sort: true, filter: textFilter({ filterCellStyle: { fontSize: '0.75rem', padding: '5px' } }), formatter: cellFormatter, style: { width: '10px' } },
    { dataField: 'memName', text: 'Member Name', sort: true, filter: textFilter({ filterCellStyle: { fontSize: '0.75rem', padding: '5px' } }), formatter: cellFormatter, style: { width: '300px' } },
    { dataField: 'eidNo', text: 'Emirates ID', sort: true, filter: textFilter({ filterCellStyle: { fontSize: '0.75rem', padding: '5px' } }), formatter: cellFormatter, style: { width: '100px' } },
    { dataField: 'cardNo', text: 'Med. Card Number', sort: true, filter: textFilter({ filterCellStyle: { fontSize: '0.75rem', padding: '5px' } }), formatter: cellFormatter, style: { width: '180px' } },
    { dataField: 'memType', text: 'Member Type', sort: true, filter: textFilter({ filterCellStyle: { fontSize: '0.75rem', padding: '5px' } }), formatter: cellFormatter, style: { width: '120px' } },
    { dataField: 'entryDate', text: 'Entry Date', sort: true, filter: textFilter({ filterCellStyle: { fontSize: '0.75rem', padding: '5px' } }), formatter: cellFormatter, style: { width: '100px' } },
    { dataField: 'exitDate', text: 'Date To', sort: true, filter: textFilter({ filterCellStyle: { fontSize: '0.75rem', padding: '5px' } }), formatter: cellFormatter, style: { width: '100px' } },
    { dataField: 'relation', text: 'Relation', sort: true, filter: textFilter({ filterCellStyle: { fontSize: '0.75rem', padding: '5px' } }), formatter: cellFormatter, style: { width: '70px' } },
    { dataField: 'visaRegion', text: 'Visa Region', sort: true, filter: textFilter({ filterCellStyle: { fontSize: '0.75rem', padding: '5px' } }), formatter: cellFormatter, style: { width: '80px' } },
    { dataField: 'validStatus', text: 'Valid Status', sort: true, hidden: true },
    { dataField: 'uploadStatus', text: 'Upload Status', sort: true, formatter: uploadStatusFormatter, filter: uploadStatusFilter, style: { width: '100px' } },
    {
      dataField: 'edit',
      text: 'Edit',
      formatter: (cell, row) => <EditButton row={row} onEdit={handleEdit} isDisabled={row.uploadStatus == 1} />,
      style: { width: '80px' }
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
      filter={filterFactory({ filterPosition: 'bottom', headerStyle: { fontSize: '0.75rem', padding: '10px' } })}
      cellEdit={false}
      wrapperClasses="table-responsive"
      headerClasses="thead-dark"
      classes={styles.table}
    />
  );
};

export default DataTable;
