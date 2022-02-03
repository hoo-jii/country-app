import './../App.css';
import React from "react";


import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';



export const SingleCountry = () => {

    let url = window.location.href;
    let chosen = url.slice(-2);

    const [singleCountryToShow, setSingleCountryToShow] = useState([]);
    const [countryLang, setCountryLang] = useState([]);
    const [countryCur, setCountryCur] = useState([]);




    // Haetaan kaikki maakoodin (cca2) perusteella
    useEffect(() => {
        const fetchSingleCountry = async () => {
            // console.log("Haetaan valittu maa ", chosen);

            const r = await fetch('https://restcountries.com/v2/alpha/' + chosen);
            console.log("Statuscode: ", r.status);
            const data = await r.json();

            // jos puhuttuja kieliä tai valuuttoja usemapi, käydään läpi
            for (var i = 0; i < data.languages.length; i++) {
                countryLang.push(data.languages[i].name);
                if (i < data.languages.length) {
                    countryLang.push(", ");
                }
            }
            for (var i = 0; i < data.currencies.length; i++) {
                countryCur.push(data.currencies[i].name);
                if (i < data.currencies.length) {
                    countryCur.push(", ");
                }
            }
            setSingleCountryToShow({ flag: data.flag, code: data.alpha2Code, name: data.name, capital: data.capital, population: data.population, languages: countryLang, currencies: countryCur });
        }
        if (chosen != "" || chosen != undefined) { fetchSingleCountry() };

    }, [chosen]);








    return (
        <div className='country-container'>

            <div className='flag'  >
                <img src={singleCountryToShow.flag} height="200" />
                <div style={{ paddingTop: '10%' }}>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <Button color="primary" variant="contained" href="" > Back to list  </Button>
                    </Link>
                </div>
            </div>

            <div className='info'>
                <table>
                    <tbody>
                        <tr>
                            <td colSpan={4}><h1>{singleCountryToShow.name} </h1></td>
                        </tr>
                        <tr>
                            <td><h4>Capital City: </h4></td>
                            <td style={{ paddingLeft: '10px' }}>{singleCountryToShow.capital}</td>
                        </tr>
                        <tr>
                            <td><h4>Population: </h4></td>
                            <td colSpan={2} style={{ paddingLeft: '10px' }}>{singleCountryToShow.population}</td>
                        </tr>
                        <tr>
                            <td ><h4>Spoken languages: </h4></td>
                            <td colSpan={2} style={{ paddingLeft: '10px' }}>{singleCountryToShow.languages} </td>
                        </tr>
                        <tr>
                            <td><h4>Currencies: </h4></td>
                            <td colSpan={2} style={{ paddingLeft: '10px' }}>{singleCountryToShow.currencies}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
}

