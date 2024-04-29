import axios from "axios";
import { CityData } from "./types";

export const fetchPlaces = async (query: string, page: number, limit: number): Promise<{results:CityData[],metadata:{totalCount:number}}> => {
    const options = {
      method: "GET",
      url: `${import.meta.env.VITE_RAPID_API_URL}/geo/adminDivisions`,
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
        "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
      },
      params: { namePrefix: query, limit, offset: (page - 1) * limit,
      },
    };
  
    try {
      const response = await axios.request(options);
      return {
        results: response.data.data,
        metadata: response.data.metadata 
      };
    } catch (error) {
      throw new Error("Failed to fetch data");
    }
  };