import './../App.css';
import React from "react";

import MaterialTable from "material-table";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


import { AddBox, ArrowDownward, ChevronLeft, ChevronRight, FilterList, FirstPage, LastPage,  Search } from "@material-ui/icons";
import { forwardRef as onChangePage } from 'react';
import Clear from '@material-ui/icons/Clear';



//kaikki maat
export const Countries = () => {

    const [allCountries, setAllCountries] = useState([]);

    const tableIcons = {
        Filter: onChangePage((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: onChangePage((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: onChangePage((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: onChangePage((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: onChangePage((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: onChangePage((props, ref) => <Clear {...props} ref={ref} />),
        Search: onChangePage((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: onChangePage((props, ref) => <ArrowDownward {...props} ref={ref} />),
    };



    // Haetaan kaikki maat 
    useEffect(() => {
        const fetchAllCountries = async () => {
            // console.log("Haetaan kaikki maat");

            const r = await fetch('https://restcountries.com/v3.1/all');
            console.log("Statuscode: ", r.status);

            const data = await r.json();
            setAllCountries(data);
        }
        fetchAllCountries();
    }, [])





    const columnsAll = [
        {
            title: "Flag",
            field: "flag",
            filtering: false,
            render: rowData => <Link to={'/details/' + rowData.cca2}> {rowData.flag} </Link>,
            cellStyle: { fontSize: 25 },
        },
        {
            title: "Name",
            field: "name.official",
            render: rowData => <Link to={'/details/' + rowData.cca2}>  {rowData.name.official}</Link>,
            cellStyle: { padding: '5px' },
        },
        {
            title: "Sub region",
            field: "region",
        },
        {
            title: "Population",
            field: "population",
            filtering: false
        },
    ];
    const rows = allCountries || [];




    return (
        <div>
            <MaterialTable
                title={"Countries of the world"}
                data={rows}
                columns={columnsAll}
                options={{
                    search: true,
                    paging: true,
                    filtering: true,
                    pageSize: 20,
                    headerStyle: {
                        backgroundColor: '#01579b',
                        color: '#FFF'
                    }
                }}
                icons={tableIcons}
            />
        </div>
    );
}

