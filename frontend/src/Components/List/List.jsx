import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCountries } from '../../api';
import Loading from '../Loading/Loading';
import './List.module.css';

const List = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    //Fetch API data on mount
    useEffect(() => {
        async function fetchCountries() {
            const countries = await getCountries();

            // Store countries sorted alphabetically
            !countries.error &&
                setCountries(countries.sort((a, b) => a.name.localeCompare(b.name)));
            setLoading(false);
        }

        fetchCountries();
    }, []);

    return loading ? (
        <Loading />
    ) : (
        <ul>
            {countries.map(({ name, countryCode: code }, i) => (
                <li key={i}>
                    <h2>
                        <Link to={`/country?name=${name}&code=${code}`}>
                            {name} ({code})
                        </Link>
                    </h2>
                </li>
            ))}
        </ul>
    );
};

export default List;
