// Search box component, for searching for students by name

import React from "react";

const SearchBox = ({ search, placeholder }) => {
	return (
		<input className="search-input" type="text" placeholder={placeholder} onChange={search}
		/>
	);
};

export default SearchBox;
