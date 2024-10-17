const baseUrl = process.env.REACT_APP_API_URL;

export const getCountries = async () => {
    try {
        const response = await fetch(baseUrl);
        const data = await response.json();

        return data;
    } catch (e) {
        console.log(e);
        return e;
    }
};

export const getCountry = async (name, code) => {
    try {
        const response = await fetch(`${baseUrl}/country?name=${name}&code=${code}`);
        const data = await response.json();

        return data;
    } catch (e) {
        console.log(e);
        return e;
    }
};
