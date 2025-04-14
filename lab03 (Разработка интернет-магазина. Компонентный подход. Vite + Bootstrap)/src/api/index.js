import { makeXhrRequest } from '../widgets/MakeXhrRequest';

const API_URL = '/';

// Функция для выполнения GET запросов
async function fetchData(endpoint) {
    try {
        // Заменяем fetch на makeXhrRequest для GET
        return await makeXhrRequest('GET', `${API_URL}${endpoint}`);
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Функция для выполнения POST запросов
async function postData(endpoint, data) {
    try {
        // Заменяем fetch на makeXhrRequest для POST
        return await makeXhrRequest('POST', `${API_URL}${endpoint}`, data);
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
}

// Функция для выполнения PATCH запросов
async function patchData(endpoint, data) {
    try {
        // Заменяем fetch на makeXhrRequest для PATCH
        return await makeXhrRequest('PATCH', `${API_URL}${endpoint}`, data);
    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }
}

// Функция для выполнения DELETE запросов
async function deleteData(endpoint) {
    try {
        // Заменяем fetch на makeXhrRequest для DELETE
        return await makeXhrRequest('DELETE', `${API_URL}${endpoint}`);
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
}

// API для работы с акциями
export const stocksApi = {
    getAllStocks: (title) => fetchData(`stocks${title ? `?title=${title}` : ''}`),
    getStockById: (id) => fetchData(`stocks/${id}`),
    createStock: (data) => postData('stocks', data),
    updateStock: (id, data) => patchData(`stocks/${id}`, data),
    deleteStock: (id) => deleteData(`stocks/${id}`),
};

// Экспортируем все API
export default {
    stocks: stocksApi
}; 