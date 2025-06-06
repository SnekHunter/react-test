import React, { useEffect, useState } from "react";

function App() {
	const [books, setBooks] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [filters, setFilters] = useState({
		country: "All",
		language: "All",
		pages: "All",
		year: "All",
	});
	
	const [itemsPerPage, setItemsPerPage] = useState(20);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		fetch("https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json")
		.then((res) => res.json())
		.then((data) => {
			setBooks(data.slice(0, 100));
		});
	}, []);
	
	const getFilteredBooks = () => {
		let result = books;
		
		if (searchTerm)
			result = result.filter((b) =>
				b.title.toLowerCase().includes(searchTerm.toLowerCase())
		);

		if (filters.country !== "All")
			result = result.filter((b) => b.country === filters.country);

		if (filters.language !== "All")
			result = result.filter((b) => b.language === filters.language);

		if (filters.pages !== "All") {
			const [min, max] = filters.pages.split("-").map(Number);
			result = result.filter((b) => b.pages >= min && b.pages <= max);
		}

		if (filters.year !== "All") {
			if (filters.year === "16th century") result = result.filter((b) => b.year >= 1500 && b.year <= 1599);
			if (filters.year === "17th century") result = result.filter((b) => b.year >= 1600 && b.year <= 1699);
			if (filters.year === "18th century") result = result.filter((b) => b.year >= 1700 && b.year <= 1799);
			if (filters.year === "19th century") result = result.filter((b) => b.year >= 1800 && b.year <= 1899);
			if (filters.year === "20th century") result = result.filter((b) => b.year >= 1900 && b.year <= 1999);
		}
		return result;
	};
	
	const filteredBooks = getFilteredBooks();

	const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
	const displayedBooks = filteredBooks.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);
	
	const updateFilter = (type, value) => {
		setFilters({ ...filters, [type]: value });
		setCurrentPage(1);
	};
	
	const unique = (key) => ["All", ...Array.from(new Set(books.map((b) => b[key])))];
	
	const page = {
		fontFamily: "sans-serif",
		margin: 0,
		display: "flex",
		flexDirection: "column",
		backgroundColor: "#ffede2",
	};

	const topbar = {
		width: "100%",
		padding: "20px 40px",
		borderBottom: "2px solid #999",
		fontSize: "32px",
		fontWeight: "bold",
		textAlign: "center",
		boxSizing: "border-box",
		backgroundColor: "#a9b8a4",
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
		backgroundColor: "#e5d5cb",
	};
	
	const searchBox = {
		marginBottom: "20px",
    };
    
	const searchInput = {
		width: "100%",
		padding: "8px",
		fontSize: "13px",
		borderRadius: "4px",
		border: "1px solid #aaa",
		boxSizing: "border-box",
    };
	
	const dropdownContainer = {
		marginBottom: "20px",
		display: "flex",
		flexDirection: "column",
	};
	
	const label = {
		fontWeight: "bold",
		marginBottom: "6px",
		fontSize: "13px",
	};
	
	const select = {
		padding: "6px",
		fontSize: "13px",
		borderRadius: "4px",
		border: "1px solid #aaa",
		marginBottom: "10px",
	};

	const content = {
		flex: 1,
		padding: "40px",
		boxSizing: "border-box",
	};
	
	const controlRow = {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: "20px",
		gap: "20px",
	};
	
	const controlBar = {
		display: "flex",
		alignItems: "center",
		gap: "10px",
    };
	
	const grid = {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
		gap: "30px",
	};
	
	const card = {
		background: "#a9b8a4",
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
		overflow: "hidden",
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
	
	const pagination = {
		display: "flex",
		alignItems: "center",
		gap: "6px",
    };
	
    const pageButton = {
		padding: "6px 12px",
		border: "1px solid #333",
		borderRadius: "4px",
		cursor: "pointer",
		background: "#fff",
    };
	
    const activePage = {
		fontWeight: "bold",
		background: "#ccc",
    };

	return (
		<div style={page}>
			<div style={topbar}>List of Books</div>
			<div style={layout}>
				<div style={sidebar}>
				<div style={searchBox}>
					<input
						type="text"
						placeholder="Search title..."
						value={searchTerm}
						onInput={(e) => setSearchTerm(e.target.value)}
						style={searchInput}
					/>
				</div>
					<div style={dropdownContainer}>
						<div style={label}>Country</div>
						<select style={select} value={filters.country} onChange={(e) => updateFilter("country", e.target.value)}>
							{unique("country").map((c, i) => (
								<option key={i} value={c}>{c}</option>
							))}
						</select>

						<div style={label}>Language</div>
						<select style={select} value={filters.language} onChange={(e) => updateFilter("language", e.target.value)}>
							{unique("language").map((l, i) => (
								<option key={i} value={l}>{l}</option>
							))}
						</select>

						<div style={label}>Pages</div>
						<select style={select} value={filters.pages} onChange={(e) => updateFilter("pages", e.target.value)}>
							{["All", "1-100", "101-200", "201-300", "301-400", "401-500", "501-1000"].map((p, i) => (
								<option key={i} value={p}>{p}</option>
							))}
						</select>

						<div style={label}>Year</div>
						<select style={select} value={filters.year} onChange={(e) => updateFilter("year", e.target.value)}>
							{["All", "16th century", "17th century", "18th century", "19th century", "20th century"].map((y, i) => (
								<option key={i} value={y}>{y}</option>
							))}
						</select>
					</div>
				</div>
				<div style={content}>
					<div style={controlRow}>
						<div style={pagination}>
							<span style={label}>Page:</span>
							{Array.from({ length: totalPages }).map((_, idx) => (
								<button
									key={idx}
									style={{
										...pageButton,
										...(currentPage === idx + 1 ? activePage : {}),
									}}
									onClick={() => setCurrentPage(idx + 1)}
								>
									{idx + 1}
								</button>
							))}
						</div>
						<div style={controlBar}>
							<span style={label}>Items per page:</span>
							<select
								style={select}
								value={itemsPerPage}
								onChange={(e) => {
									setItemsPerPage(Number(e.target.value));
									setCurrentPage(1);
								}}
							>
							{[20, 50, 100].map((n, i) => (
							<option key={i} value={n}>{n}</option>
							))}
							</select>
						</div>
					</div>
					<div style={grid}>
						{displayedBooks.map((book, index) => (
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
