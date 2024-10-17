import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { getCountry } from '../../api';
import './Country.module.css';
import styles from './Country.module.css';
import Loading from '../Loading/Loading';

const Country = () => {
    const location = useLocation();
    const [queryParams] = useSearchParams();
    const [country, setCountry] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCountry();
    }, []);

    useEffect(() => {
        setLoading(true);
        fetchCountry();
    }, [location.search]);

    const fetchCountry = async () => {
        const country = await getCountry(queryParams.get('name'), queryParams.get('code'));

        !country.error && setCountry(country);
        setLoading(false);
    };

    return loading ? (
        <Loading />
    ) : (
        <div>
            <h1>{country.officialName}</h1>
            <p>
                <span className={styles.bold}>Region:</span> {country.region}
            </p>
            <p>
                <span className={styles.bold}>Borders:</span>{' '}
                {country.borders.map(({ name, code }, i) => (
                    <span key={code}>
                        <Link to={`/country?name=${name}&code=${code}`}>{name}</Link>
                        {/* Add comma if not last border */}
                        {i < country.borders.length - 1 && ', '}
                    </span>
                ))}
            </p>
            <img src={country.flag} alt={`${country.officialName} flag`} />
            <Link to="/">
                <button>Back</button>
            </Link>
        </div>
    );
};

export default Country;
