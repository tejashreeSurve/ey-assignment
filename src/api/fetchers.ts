import api from "./api";

export type Charater = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type PageInfo = {
  count: number;
  next: string;
  pages: number;
  prev: number | null;
};

export async function fetchCharaters(page: number) {
  try {
    const { data } = await api.get<{
      info: PageInfo;
      results: Charater[];
    }>(`/character/?page=${page}`);
    return {
      info: data.info,
      results: data.results,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function fetchCharater(id: string) {
  try {
    const { data } = await api.get<Charater>(`/character/${id}`);

    return data;
  } catch (error) {
    console.error(error);
  }
}
