import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion as m } from "framer-motion";
import styled from "styled-components";
import BackButton from "../components/basic/GoBack.jsx";
import FavoriteButton from "../components/basic/FavoriteButton.jsx";

function MovieDetails() {
	const [details, setDetails] = useState();
	const { id } = useParams();
	const apiKey = import.meta.env.VITE_API_KEY;
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
			.then((response) => response.json())
			.then((data) => setDetails(data))
			.catch((err) => console.log(err));
	}, []);
	if (!details) return;

	const routeVariants = {
		initial: {
			// x: "100%",
			scale: 0.4,
			// opacity: 0,
		},
		final: {
			scale: 1,
			// opacity: 1,
			transition: {
				duration: 0.3,
			},
			// x: "0vw",
		},
		exit: {
			opacity: 0,
			scale: 0.2,
		},
	};

	return (
		<Window
			$image={details.poster_path}
			variants={routeVariants}
			initial="initial"
			animate="final"
			exit="exit"
			transition={{ duration: 0.2 }}
			key={`details-${id}`}
			layoutId={`movie-${id}`}>
			{/* <m.img
				layoutId="poster"
				transition={{ duration: 0.3 }}
				src={`https://image.tmdb.org/t/p/original/${details.poster_path}`}
				alt="poster"
				width="100%"
			/> */}
			<Header>
				<BackButton />
				<FavoriteButton />
			</Header>

			<Description>
				<h4>⭐️ {details.vote_average.toFixed(2)}</h4>
				<Title>{details.title}</Title>
				<Genres>
					{details.genres.map((genre, index) => (
						<Badge key={index}>{genre.name}</Badge>
					))}
				</Genres>
				<Overview>{details.overview}</Overview>
			</Description>
			<BookingButton
				whileTap={{ scale: 0.97 }}
				onClick={() => navigate(`/booking/${id}`)}>
				Buy Ticket
			</BookingButton>
		</Window>
	);
}

export default MovieDetails;

const Window = styled(m.main)`
	position: relative;
	padding: 2rem;
	display: grid;
	gap: 0.5rem;
	grid-template-rows: min-content 1fr 1.5fr min-content;
	width: 100%;
	height: 100%;
	background: linear-gradient(
			180deg,
			rgba(255, 255, 255, 0) 0%,
			rgba(0, 0, 0, 1) 70%
		),
		url(https://image.tmdb.org/t/p/original/${(props) => props.$image}) center
			100% / cover no-repeat;
`;

const Header = styled.header`
	display: flex;
	justify-content: space-between;
`;

const Title = styled.h1`
	font-size: 1.3rem;
`;

const BookingButton = styled(m.button)`
	border-radius: 10px;
	background: linear-gradient(145deg, #e84849, #c33c3d);
	box-shadow: 0px 10px 100px 0px #c4504178;
	border: none;
	grid-row: 5/6;
`;
const Description = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	grid-row: 3/4;
	overflow-y: scroll;
	justify-content: flex-end;
	h4 {
		font-size: 0.9rem;
	}
`;
const Overview = styled.p`
	overflow-y: scroll;
	font-size: 0.8rem;
`;

const Genres = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	justify-content: center;
	width: 100%;
	/* background-color: green; */
`;
const Badge = styled.a`
	text-wrap: nowrap;
	border-radius: 7px;
	backdrop-filter: blur(10px);
	background-color: #ece3e3f4;
	padding: 0.2rem 0.6rem;
	font-size: 0.7rem;
`;
