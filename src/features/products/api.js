import axios from 'axios';

const API_URL = 'https://www.freetogame.com/api';

// Función asíncrona para obtener juegos con filtros
export const fetchGames = async (filters = {}) => {
  try {
    // Construimos los query params dinámicamente
    const params = new URLSearchParams(filters).toString();
    const response = await axios.get(`${API_URL}/games?${params}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener juegos:", error);
    throw new Error("No se pudo conectar con la API de juegos.");
  }
};

// Función para obtener detalle por ID
export const fetchGameById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/game?id=${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Juego no encontrado.");
  }
};