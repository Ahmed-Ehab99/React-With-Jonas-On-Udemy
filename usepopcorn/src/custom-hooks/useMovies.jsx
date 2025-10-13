import { useEffect, useState } from "react";

export const apiKey = "289cd016";

export const useMovies = (query) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setIsError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`,
          {
            signal: controller.signal,
          }
        );

        if (!res.ok) throw new Error("Something went wrong, Please try again!");

        const data = await res.json();
        if (data.Response === "False") throw new Error(data.Error);

        setMovies(data.Search);
        setIsError("");
      } catch (error) {
        console.error(error);
        if (error.name !== "AbortError") setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setIsError("");
      return;
    }

    fetchMovies();

    // Cleanp Function
    return function () {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, isError };
};
