import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { LineChart } from 'react-chartkick';
import { getCountry } from '../../api';
import Loading from '../Loading/Loading';
import styles from './Country.module.css';
import './Country.module.css';
import 'chartkick/chart.js';

const Country = () => {
    const location = useLocation();
    const [queryParams] = useSearchParams();
    const [country, setCountry] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCountry();
    }, []);

    useEffect(() => {
        // Fetch country data after 300ms to avoid multiple requests
        const timer = setTimeout(() => {
            fetchCountry();
        }, 300);

        // Cleanup the timer on unmount or dependency change
        return () => clearTimeout(timer);
    }, [location.search]);

    const fetchCountry = async () => {
        const country = await getCountry(queryParams.get('name'), queryParams.get('code'));

        country.error ? setCountry({ error: true }) : setCountry(country);
        setLoading(false);
    };

    return loading ? (
        <Loading />
    ) : (
        <div key={queryParams.get('code')}>
            {country.error ? (
                <>
                    <h1>Ups! There is no available data for {queryParams.get('name')}</h1>
                    <Link to="/">
                        <button>Back</button>
                    </Link>
                </>
            ) : (
                <>
                    {country.flag ? (
                        <img src={country.flag} alt={`${country.officialName} flag`} />
                    ) : (
                        <p>&lt;Flag not available&gt;</p>
                    )}
                    <h1>{country.officialName}</h1>
                    <p>
                        <span className={styles.bold}>Region:</span> {country.region}
                    </p>
                    <p>
                        <span className={styles.bold}>Borders:</span>{' '}
                        {country.borders?.map(({ name, code }, i) => (
                            <span
                                key={code}
                                onClick={() => {
                                    setLoading(true);
                                    setCountry({});
                                }}
                            >
                                <Link to={`/country?name=${name}&code=${code}`}>{name}</Link>
                                {/* Add comma if not last border */}
                                {i < country.borders.length - 1 && ', '}
                            </span>
                        ))}
                    </p>
                    <LineChart
                        data={country.population || []}
                        xtitle="Time"
                        ytitle="Population"
                        thousands="."
                        empty="No data"
                    />
                    <Link to="/">
                        <button>Back</button>
                    </Link>
                </>
            )}
        </div>
    );
};

export default Country;
