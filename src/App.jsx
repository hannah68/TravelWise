import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountriesList from "./components/CountriesList";

const BASE_URL = "http://localhost:9000";

export default function App() {
	const [cities, setCities] = useState([]);
	const [loading, setLoading] = useState(false);

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

	console.log(cities);

	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Homepage />} />
				<Route path="product" element={<Product />} />
				<Route path="pricing" element={<Pricing />} />
				<Route path="login" element={<Login />} />
				<Route path="app" element={<AppLayout />}>
					<Route
						index
						element={<CityList cities={cities} loading={loading} />}
					/>
					<Route
						path="cities"
						element={<CityList cities={cities} loading={loading} />}
					/>
					<Route
						path="countries"
						element={<CountriesList cities={cities} loading={loading} />}
					/>
					<Route path="form" element={<p>city</p>} />
				</Route>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
