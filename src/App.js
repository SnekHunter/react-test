import React, { useEffect, useState } from "react";
import './App.css';

function App() {
	const [books, setBooks] = useState([]);

	useEffect(() => {
		fetch("https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json")
		.then((res) => res.json())
		.then((data) => setBooks(data.slice(0, 100)));
	}, []);
	
	const container = {
		padding: "20px",
		maxWidth: "1200px",
		margin: "auto",
	};
	
	const header = {
		textAlign: "center",
		fontSize: "24px",
		marginBottom: "20px",
		paddingBottom: "10px",
		borderBottom: "2px solid #333",
	};
	
	const grid = {
		display: "grid",
		gridTemplateColumns: "repeat(4, 1fr)",
		gap: "20px",
	};
	
	const imageStyle = {
		width: "100px",
		height: "auto",
		flexShrink: 0,
	};
	
	const info = {
		display: "flex",
		flexDirection: "column",
		fontSize: "14px",
		lineHeight: "1.4",
	};
	
	const titleStyle = {
		fontWeight: "bold",
		fontSize: "16px",
		marginBottom: "4px",
	};
	
	const card = {
		background: "#ddd",
		padding: "10px",
		borderRadius: "6px",
		display: "flex",
		flexDirection: "row",
		alignItems: "flex-start",
		gap: "10px",
	};
	
	return (
		<div style={container}>
			<h2 style={header}>Top Books</h2>
			<div style={grid}>
				{books.map((book, index) => (
					<div key={index} style={card}>
						<img
						  src={`https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/${book.imageLink}`}
						  alt={book.title}
						  style={imageStyle}
						/>
						<div style={info}>
						  <div style={titleStyle}>{book.title}</div>
						  <div>Author: {book.author}</div>
						  <div>Country: {book.country}</div>
						  <div>Language: {book.language}</div>
						  <div>Pages: {book.pages}</div>
						  <div>Year: {book.year}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
