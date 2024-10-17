import { getAvailableCountries, getCountryInfo, getCountryFlag, getCountryPopulation } from './api';

export const getCountries = async (req, res) => {
    try {
        const response = await getAvailableCountries();

        // Check for connection error then for fail status code
        if (response.error) {
            throw response.data;
        } else if (response.status !== 200) {
            const data = await response.json();

            return res.status(response.status).json(data);
        }

        const countries = await response.json();

        return res.status(200).json(countries);
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getCountry = async (req, res) => {
    try {
        const { name, code } = req.query;
        const infoRes = await getCountryInfo(code);
        const flagRes = await getCountryFlag(code);
        const populationRes = await getCountryPopulation(name);
        const responses = [infoRes, flagRes, populationRes];

        // Check if any response failed connection, then check for fail status codes
        for (let i = 0; i < responses.length; i++) {
            if (res.error) {
                throw responses[i].data;
            } else if (responses[i].status !== 200) {
                // eslint-disable-next-line no-await-in-loop
                const data = await responses[i].json();
                return res.status(responses[i].status).json(data);
            }
        }

        const info = await infoRes.json();
        const flag = await flagRes.json();
        const population = await populationRes.json();

        // Return only relevant data
        return res.status(200).json({
            info: {
                ...info,
                borders: info.borders?.map((c) => ({ name: c.commonName, code: c.countryCode }))
            },
            flag: flag.data?.flag,
            population: population.data?.populationCounts
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: 'Internal server error' });
    }
};
