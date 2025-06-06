import React, { useEffect, useState } from "react";
import './App.css';

function App() {
	const [books, setBooks] = useState([]);

	useEffect(() => {
		fetch("https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json")
		.then((res) => res.json())
		.then((data) => setBooks(data.slice(0, 100)));
	}, []);
	
	const page = {
		fontFamily: "'Merriweather'",
		margin: 0,
		display: "flex",
		flexDirection: "column",
	};

	const topbar = {
		width: "100%",
		padding: "20px 40px",
		borderBottom: "2px solid #999",
		fontSize: "32px",
		fontWeight: "bold",
		textAlign: "center",
		boxSizing: "border-box",
	};
	
	const layout = {
		display: "flex",
		flexDirection: "row",
	};
	
	const sidebar = {
		width: "200px",
		padding: "30px 20px",
		borderRight: "2px solid #aaa",
		boxSizing: "border-box",
		backgroundColor: "#f4f4f4",
	};

	const content = {
		flex: 1,
		padding: "40px",
		boxSizing: "border-box",
	};
	
	const grid = {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
		gap: "30px",
	};
	
	const card = {
		background: "#ddd",
		padding: "15px",
		borderRadius: "6px",
		border: "1px solid #aaa",
		display: "flex",
		flexDirection: "column",
		minHeight: "300px",
		boxSizing: "border-box",
		overflow: "hidden",
	};
	
	const contentRow = {
		display: "flex",
		flexDirection: "row",
		flex: 1,
		gap: "15px",
		marginTop: "10px",
	};
	
	const imageWrapper = {
		width: "150px",
		height: "100%",
		flexShrink: 0,
		overflow: "hidden",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	};
	
	const imageStyle = {
		maxHeight: "100%",
		maxWidth: "100%",
		objectFit: "contain",
	};
	
	const info = {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		fontSize: "14px",
		lineHeight: "1.6",
		flex: 1,
	};
	
	const titleStyle = {
		fontWeight: "bold",
		fontSize: "24px",
		marginBottom: "10px",
		textAlign: "center",
		borderBottom: "1px solid #aaa",
		paddingBottom: "5px",
	};
	
	const textLine = {
		marginBottom: "6px",
		padding: "4px 8px",
		backgroundColor: "#f0f0f0",
		borderRadius: "4px",
		fontSize: "16px",
		color: "#333",
		boxShadow: "inset 0 0 2px rgba(0, 0, 0, 0.1)",
	};

	return (
		<div style={page}>
			<div style={topbar}>List of Books</div>
			<div style={layout}>
				<div style={sidebar}>
					<div style={{ fontWeight: "bold", marginBottom: "20px", fontSize: "24px" }}>
						Filters
					</div>
					<ul style={{ listStyle: "none", padding: 0, fontSize: "18px" }}>
						<li>By Country</li>
						<li>By Language</li>
						<li>By Year</li>
						<li>By Pages</li>
					</ul>
				</div>
				<div style={content}>
					<div style={grid}>
						{books.map((book, index) => (
							<div key={index} style={card}>
								<div style={titleStyle}>{book.title}</div>
								<div style={contentRow}>
									<div style={imageWrapper}>
										<img
										  src={`https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/${book.imageLink}`}
										  alt={book.title}
										  style={imageStyle}
										/>
									</div>
									<div style={info}>
										<div style={textLine}>Author: {book.author}</div>
										<div style={textLine}>Country: {book.country}</div>
										<div style={textLine}>Language: {book.language}</div>
										<div style={textLine}>Pages: {book.pages}</div>
										<div style={textLine}>Year: {book.year}</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
