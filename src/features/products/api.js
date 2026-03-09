// api.js
import { httpClient } from "../../services/httpClient";

export const getGames = async (searchParams) => {
  let endpoint = "/games";
  const params = new URLSearchParams();

  // Extraer parámetros
  const platform = searchParams.get("platform");
  const category = searchParams.get("category");
  const sortBy = searchParams.get("sort-by");
  const search = searchParams.get("search");

  // Agregar parámetros a la URL (si el backend los soporta)
  if (platform) params.append("platform", platform);
  if (category) params.append("category", category);
  if (sortBy) params.append("sort-by", sortBy);

  const queryString = params.toString();
  
  // Llamada a la API
  const data = await httpClient(
    endpoint + (queryString ? `?${queryString}` : "")
  );

  // Filtro LOCAL para búsqueda por nombre (si el backend no lo soporta)
  if (search) {
    return data.filter((game) =>
      game.title.toLowerCase().includes(search.toLowerCase())
    );
  }
 // 2. Filtro LOCAL para categoría (AGREGAR ESTO)
  if (category) {
    return data.filter((game) =>
      game.genre.toLowerCase() === category.toLowerCase() ||
      game.category?.toLowerCase() === category.toLowerCase()
    );
  }
  // 3. Filtro LOCAL para plataforma (AGREGAR ESTO)
  if (platform) {
    return data.filter((game) =>
      game.platform?.toLowerCase() === platform.toLowerCase()
    );
  }

  return data;
};