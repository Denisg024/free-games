const BASE_URL = 'https://www.freetogame.com/api';
const PROXY_URL = 'https://corsproxy.io/?'; 

export const httpClient = async (endpoint) => {
  try {
    const response = await fetch(`${PROXY_URL}${encodeURIComponent(BASE_URL + endpoint)}`);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error en la petición:", error);
    return { error: true, message: "Error al conectar con la API." };
  }
};