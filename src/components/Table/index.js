import React from 'react';
import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'

export function Table(){
  const data = React.useMemo(
    () => [
      {
        firstName: 'Hugo',
        lastName: 'Cardenas',
        age: 20,
        visits: 100,
        status: 'valid',
        progress: '10%',
      },
      {
        firstName: 'Raul',
        lastName: 'Zavala',
        age: 15,
        visits: 100,
        status: 'valid',
        progress: '10%',
      },
      {
        firstName: 'Pepe',
        lastName: 'Castillo',
        age: 35,
        visits: 100,
        status: 'valid',
        progress: '10%',
      },
      {
        firstName: 'Luis',
        lastName: 'Lopez',
        age: 25,
        visits: 100,
        status: 'valid',
        progress: '10%',
      },
    ],
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
            sortType: 'basic'
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
            sortType: 'basic'
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
            sortType: 'basic'
          },
          {
            Header: 'Visits',
            accessor: 'visits',
            sortType: 'basic'
          },
          {
            Header: 'Status',
            accessor: 'status',
            sortType: 'basic'
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
            sortType: 'basic'
          },
        ],
      },
    ],
    []
  )
  const tableInstance = useTable({ columns, data }, useSortBy)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  return (
    // apply the table props
    <div className={"inline-block min-w-full shadow rounded-lg overflow-hidden mt-6"}>
      <table className="min-w-full leading-normal" {...getTableProps()}>
      <thead >
      {// Loop over the header rows
        headerGroups.map(headerGroup => (
          // Apply the header row props
          <tr  {...headerGroup.getHeaderGroupProps()}>
            {// Loop over the headers in each row
              headerGroup.headers.map(column => (
                // Apply the header cell props
                <th className={"px-5 py-3 border-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"}
                    {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {// Render the header
                    column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
          </tr>
        ))}
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
      {// Loop over the table rows
        rows.map(row => {
          // Prepare the row for display
          prepareRow(row)
          return (
            // Apply the row props
            <tr {...row.getRowProps()}>
              {// Loop over the rows cells
                row.cells.map(cell => {
                  // Apply the cell props
                  return (
                    <td className={"px-5 py-5 border-b border-gray-200 bg-white text-sm text-[#5f9ea0]"} {...cell.getCellProps()}>
                      {// Render the cell contents
                        cell.render('Cell')}
                    </td>
                  )
                })}
            </tr>
          )
        })}
      </tbody>
    </table>
    </div>

  )
}