import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv'; // importing react-csv;
import '../Components/main.css';
import'../App.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-table/dist/bootstrap-table.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, { numberFilter, textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';


const Main = () => {

    //passing the useeffect data to usestate
    const [bankTransactions, setbankTransactions] = useState([]);


    //useffect to make request to the server
    useEffect(() => {
        const getbankTransactions = async () => {
            const bankreq = await fetch("http://localhost:3001/bankTransactions");
            const bankres = await bankreq.json();
            //console.log(bankres);
            setbankTransactions(bankres);
        }
        getbankTransactions(); //recursion
    }, []);

    //creating columns for bootstraptable
    const columns = [
        { dataField: 'AccountName', text: 'Account', filter: textFilter() },
        { dataField: 'AccountNumber', text: 'Number', filter: textFilter() },
        { dataField: 'ImportSourceBank', text: 'Bank', filter: textFilter() },
        { dataField: 'Amount', text: 'Amount', filter: numberFilter() },
    ]

    //setting the props for the imported pagination module
    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 6,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        showTotal: true,
        alwaysShowAllBtns: true,
        onPageChange: function (page, sizePerPage) {
            console.log('page', page);
            console.log('sizePerPage', sizePerPage);
        }
    });


    //renderng the app
    return (
        <div className="main">
            <button className='btnexport'>
                <CSVLink data={bankTransactions} filename='TransactionReport' className='csvbtn'>Export</CSVLink></button>

            <BootstrapTable
                bootstrap4
                keyField='AccountName'
                columns={columns}
                data={bankTransactions}
                pagination={pagination}
                filter={filterFactory()}
            />
        </div>
    )
}

export default Main;