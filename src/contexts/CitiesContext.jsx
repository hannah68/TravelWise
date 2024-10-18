import { createContext, useState, useEffect, useContext } from "react";
const BASE_URL = "http://localhost:9000";
const CitiesContext = createContext();

function CitiesProvider({ children }) {
	const [cities, setCities] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentCity, setCurrentCity] = useState({});

	useEffect(() => {
		const fetchCities = async () => {
			try {
				setLoading(true);
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();
				setCities(data);
			} catch {
				alert("error");
			} finally {
				setLoading(false);
			}
		};

		fetchCities();
	}, []);

	async function getCity(id) {
		try {
			setLoading(true);
			const res = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await res.json();
			setCurrentCity(data);
		} catch {
			alert("error");
		} finally {
			setLoading(false);
		}
	}

	async function createCity(newCity) {
		try {
			setLoading(true);
			const res = await fetch(`${BASE_URL}/cities`, {
				method: "POST",
				body: JSON.stringify(newCity),
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			setCities((cities) => [...cities, data]);
		} catch {
			alert("error");
		} finally {
			setLoading(false);
		}
	}

	async function deleteCity(id) {
		try {
			setLoading(true);
			await fetch(`${BASE_URL}/cities/${id}`, {
				method: "DELETE",
			});

			setCities((cities) => cities.filter((city) => city.id !== id));
		} catch {
			alert("error");
		} finally {
			setLoading(false);
		}
	}

	return (
		<CitiesContext.Provider
			value={{ cities, loading, currentCity, getCity, createCity, deleteCity }}
		>
			{children}
		</CitiesContext.Provider>
	);
}

function useCities() {
	const context = useContext(CitiesContext);
	if (context === undefined)
		throw new Error("context used outside of the cities provider");
	return context;
}

export { useCities, CitiesProvider };
