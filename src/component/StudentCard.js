// Student card component, for displaying student information

import React, { Component } from "react";

class StudentCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isexpand: false,
			tags: [],
			value: ""
		};
		this.handleEnter = this.handleEnter.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	// Handles the expand button
	handleClick = e => {
		this.setState({ isexpand: !this.state.isexpand });
	};

	// Handles the input tag
	handleChange(e) {
		this.setState({ value: e.target.value });
	}

	// Handles the enter key
	handleEnter = e => {
		if (e.key === "Enter" && e.target.value !== "") {
			const newtag = e.target.value;
			this.setState({ tags: [...this.state.tags, newtag] });
			this.props.addTag(this.props.student.id, this.state.tags);
			e.target.value = "";
		}
	};

	componentDidMount() {
		this.props.addTag(this.props.student.id, this.state.tags);
	}

	render() {
		// Retrieve student info
		const { isexpand, tags } = this.state;
		const { 
			grades, pic, firstName, lastName, email, company, skill, id 
		} = this.props.student;

		// Calculate average mark of student
		const sum = grades.reduce(function(sum, value) {
			return parseInt(sum) + parseInt(value);
		});
		const average = sum / grades.length;

		return (
			<div id={`student-${id}`} className="card" tagList={tags}>
				<img src={pic} alt={firstName} />
				<div className="inforBox">
					<h4 className="stuName"> {firstName + " " + lastName}</h4>
					<p className="stuInfo">Email: {email}</p>
					<p className="stuInfo">Company: {company}</p>
					<p className="stuInfo">Skill: {skill}</p>
					<p className="stuInfo">Average: {average}%</p>
					{isexpand
						? [
						<div className="gradeList">
							{grades.map((grade, i) => (
								<p key={i}>{grade}</p>
							))}
							<div className="tagList">
								{tags.map((tag, i) => (
									<div className="tag-box" key={i}>
										{tag}
									</div>
								))}
							</div>
							<input
								className="tag-input"
								type="text"
								placeholder="Add a tag"
								onChange={this.handleChange}
								onKeyDown={this.handleEnter}
							/>
						</div>
						]
					: null}
				</div>
			<div className="collapsible " onClick={this.handleClick}>
				{isexpand ? "-" : "+"}
			</div>
		</div>
		);
	}
}

export default StudentCard;
