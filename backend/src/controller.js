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

        // Check for connection error then for fail status code
        if (infoRes.error) {
            throw infoRes.data;
        } else if (infoRes.status !== 200) {
            const data = await infoRes.json();
            return res.status(infoRes.status).json({ endpoint: 'info', data });
        }

        if (flagRes.error) {
            throw flagRes.data;
        } else if (flagRes.status !== 200 && flagRes.status !== 404) {
            const data = await flagRes.json();
            return res.status(flagRes.status).json({ endpoint: 'flag', data });
        }

        if (populationRes.error) {
            throw populationRes.data;
        } else if (populationRes.status !== 200 && populationRes.status !== 404) {
            const data = await populationRes.json();
            return res.status(populationRes.status).json({ endpoint: 'population', data });
        }

        const info = await infoRes.json();
        const flag = flagRes.status === 200 && (await flagRes.json());
        const population = populationRes.status === 200 && (await populationRes.json());

        // Return only relevant data
        return res.status(200).json({
            ...info,
            borders: info.borders?.map((c) => ({ name: c.commonName, code: c.countryCode })),
            flag: flag.data?.flag,
            population: population.data?.populationCounts.map(({ year, value }) => [year, value])
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: 'Internal server error' });
    }
};
