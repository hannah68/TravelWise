import { useCities } from "../contexts/CitiesContext";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";

const formatDate = (date) =>
	new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(new Date(date));

export default function CityItem({ city }) {
	const { currentCity, deleteCity } = useCities();
	const handleClick = (e) => {
		e.preventDefault();
		deleteCity(city.id);
	};
	return (
		<li>
			<Link
				className={`${styles.cityItem} ${
					city.id === currentCity.id ? styles["cityItem--active"] : ""
				}`}
				to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
			>
				<span className={styles.emoji}>{city.emoji}</span>
				<h3 className={styles.name}>{city.cityName}</h3>
				<time className={styles.date}>{formatDate(city.date)}</time>
				<button className={styles.deleteBtn} onClick={handleClick}>
					&times;
				</button>
			</Link>
		</li>
	);
}
