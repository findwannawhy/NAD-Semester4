const API_URL = '/';

// Функция для выполнения GET запросов
async function fetchData(endpoint) {
    try {
        const response = await fetch(`${API_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Функция для выполнения POST запросов
async function postData(endpoint, data) {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Проверяем, есть ли тело ответа
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        }
        return null; // Возвращаем null, если ответ пустой
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
}

// Функция для выполнения PATCH запросов
async function patchData(endpoint, data) {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Проверяем, есть ли тело ответа
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        }
        return null; // Возвращаем null, если ответ пустой
    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }
}

// Функция для выполнения DELETE запросов
async function deleteData(endpoint) {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Проверяем, есть ли тело ответа
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        }
        return null; // Возвращаем null, если ответ пустой
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