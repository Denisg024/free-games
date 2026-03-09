import { httpClient } from "../../services/httpClient";

export const getGames = () => httpClient("/games");

export const getGameById = (id) => httpClient(`/game?id=${id}`);

export const getGamesByPlatform = (platform) =>
  httpClient(`/games?platform=${platform}`);