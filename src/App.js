// Main application structure

import React, { Component } from "react";
import { createFilter } from "react-search-input";
import "./App.css";
import SearchBox from "./component/SearchBox";
import StudentCard from "./component/StudentCard";

const TAG_FILTERS = ["tags"];

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			students: [],
			searchfield: "",
			dropdown: false,
			searchTagTerm: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.searchTag = this.searchTag.bind(this);
	}

	componentDidMount() {
		// Fetch the data from the API provided
		fetch("https://www.hatchways.io/api/assessment/students")
		.then(res => res.json())
		// Save fetched data into state
		.then(data => { this.setState({ students: data.students }); 
		});
	}

	// Handles the input tag
	handleChange = e => {
		this.setState({ searchfield: e.target.value });
	};

	// Handle tag search
	searchTag = e => {
		this.setState({ searchTagTerm: e.target.value });
	};

	// Adds a tag to the specific student
	addTag = (id, tag) => {
		this.state.students.forEach(element => {
			if (element.id === id) {
				Object.assign(element, { tags: tag });
			}
		});
	};

	render() {
		// Retrieve data from saved state
		const { students, searchfield, dropdown, searchTagTerm } = this.state;

		// Filter by name in search
		const filteredStudents = students.filter(students => {
			return (
				students.firstName.toLowerCase().includes(searchfield.toLowerCase()) ||
				students.lastName.toLowerCase().includes(searchfield.toLowerCase())
			);
		});

		// Filter by tag in search
		const filteredTags = filteredStudents.filter(
			createFilter(this.state.searchTagTerm, TAG_FILTERS)
		);

		return (
			<div className="StudentList">
				<div className="search-input-container">
					<SearchBox search={this.handleChange} placeholder="Search by name" />
					<SearchBox search={this.searchTag} placeholder="Search by tags" />
				</div>
				<div>
					{filteredTags.map((student, i) => (
						<StudentCard key={i} student={student} 
						expand={this.handleClick} dropdown={dropdown} addTag={this.addTag}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default App;
