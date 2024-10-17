export const getAvailableCountries = async () => {
    try {
        const response = await fetch('https://date.nager.at/api/v3/AvailableCountries');

        return response;
    } catch (e) {
        throw { data: e, error: true };
    }
};

export const getCountryInfo = async (countryCode) => {
    try {
        const response = await fetch(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`);

        return response;
    } catch (e) {
        throw { data: e, error: true };
    }
};

export const getCountryPopulation = async (country) => {
    try {
        const reqOpts = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ country })
        };
        const response = await fetch(
            `https://countriesnow.space/api/v0.1/countries/population`,
            reqOpts
        );

        return response;
    } catch (e) {
        throw { data: e, error: true };
    }
};

export const getCountryFlag = async (countryCode) => {
    try {
        const reqOpts = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ iso2: countryCode })
        };
        const response = await fetch(
            `https://countriesnow.space/api/v0.1/countries/flag/images`,
            reqOpts
        );

        return response;
    } catch (e) {
        throw { data: e, error: true };
    }
};
