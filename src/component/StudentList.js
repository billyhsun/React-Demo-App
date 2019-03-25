// Student list component, for displaying all student cards

import React from "react";
import StudentCard from "./StudentCard";

const StudentList = props => {
	return <StudentCard student={props.student} dropdown={props.dropdown} />;
};

export default StudentList;
