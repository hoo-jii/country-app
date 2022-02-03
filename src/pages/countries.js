import './../App.css';
import React from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


import MaterialTable from "material-table";
import TablePagination from '@mui/material/TablePagination';

import { useState, useEffect } from 'react';

import { SingleCountry } from './singlecountry';



import { AddBox, ArrowDownward, Check, ChevronLeft, ChevronRight, DeleteOutline, Edit, FilterList, FirstPage, LastPage, Remove, SaveAlt, Search, ViewColumn } from "@material-ui/icons";
import { forwardRef as onChangePage } from 'react';
import Clear from '@material-ui/icons/Clear';



export const Countries = () => {


    const [allCountries, setAllCountries] = useState([]);


    const [singlecountry, setSinglecountry] = useState();
    const [showsinglecountry, setShowsinglecountry] = useState(false);

    const [singleCountryToShow, setSingleCountryToShow] = useState([]);







    const tableIcons = {
        Add: onChangePage((props, ref) => <AddBox {...props} ref={ref} />),
        Check: onChangePage((props, ref) => <Check {...props} ref={ref} />),
        Clear: onChangePage((props, ref) => <Clear {...props} ref={ref} />),
        Delete: onChangePage((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: onChangePage((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: onChangePage((props, ref) => <Edit {...props} ref={ref} />),
        Export: onChangePage((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: onChangePage((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: onChangePage((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: onChangePage((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: onChangePage((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: onChangePage((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: onChangePage((props, ref) => <Clear {...props} ref={ref} />),
        Search: onChangePage((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: onChangePage((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: onChangePage((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: onChangePage((props, ref) => <ViewColumn {...props} ref={ref} />)
    };







    // Haetaan kaikki maat 
    useEffect(() => {
        const fetchAllCountries = async () => {
            console.log("Haetaan kaikki maat");

            const r = await fetch('https://restcountries.com/v3.1/all');

            console.log("Statuscode: ", r.status);

            const data = await r.json();
            console.log("Kaikki maat: ", data);
            console.log("Kaikki maat pituus: ", data.length);
            setAllCountries(data);

        }
        fetchAllCountries();

    }, [])




    


    // Haetaan kaikki maakoodin (cca2) perusteella
    useEffect(() => {
        const fetchSingleCountry = async () => {
            console.log("Haetaan valittu maa ", singlecountry);

            const r = await fetch('https://restcountries.com/v2/alpha/' + singlecountry);

            console.log("Statuscode: ", r.status);

            const data = await r.json();
            console.log("valittu maa: ", data);
            console.log("valittu maa pituus: ", data.length);
            setSingleCountryToShow(data);

        }
        if (singlecountry != "") {fetchSingleCountry()};

    }, [singlecountry])







    function showSingleCountry(row){

        console.log("maakoodi cca2", row.cca2);

        setSinglecountry(row.cca2);


        setShowsinglecountry(true);

    }
    





    const rows = allCountries || [];

    const rowsOne = singleCountryToShow || [];


    // datatablen sarakkeet materaialUI
    const columnsAll = [
        {
            title: "Name",
            field: "name.official",
        },
        {
            title: "Sub region",
            field: "region",
        },
        {
            title: "Flag",
            field: "flag",
            filtering: false
        },
        {
            title: "Population",
            field: "population",
            filtering: false
        },
    ];



        const columnsSingle = [
            {
                title: "Name",
                field: "name.official",
            },
            {
                title: "Sub region",
                field: "region",
            },
            {
                title: "Flag",
                field: "flag",
                filtering: false
            },
            {
                title: "Population",
                field: "population",
                filtering: false
            },
        ];
    
    





    return (
        <div >


            {showsinglecountry ?




                // <SingleCountry />

      

               <MaterialTable
                    title={"Chosen country"}
                    data={rowsOne}
                    columns={columnsSingle}
                   
                />

            







                : 
                <MaterialTable
                    title={"Countries of the world"}
                    data={rows}
                    columns={columnsAll}
                    options={{
                        search: true,
                        paging: true,
                        filtering: true,
                        pageSize: 20
                    }}
                    icons={tableIcons}


                    actions={[
                        {
                            icon: AddBox,
                            tooltip: 'Read more',
                            onClick: (event, rowData) => showSingleCountry(rowData)
                        },
                    ]}
                />

            }







        </div>
    );
}

