import axios from 'axios';

const API_URL = 'http://localhost:5000/api/packages';

export const getPackages = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getPackageById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
