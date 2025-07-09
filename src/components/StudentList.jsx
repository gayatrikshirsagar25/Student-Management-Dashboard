import React from 'react';

// StudentList component displays a table of students with their details.
// Props:
// - students: array of student objects to display.
// - onEdit: callback function to trigger editing a student.
function StudentList({ students, onEdit, onDelete }) {
  if (students.length === 0) {
    return <p>No students added yet.</p>;
  }

  return (
    <table className="student-list" aria-label="Student List">
      <thead>
        <tr>
          <th>Profile</th>
          <th>Name</th>
          <th>Email</th>
          <th>Course</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>
              {student.profileImage ? (
                <img
                  src={student.profileImage}
                  alt={`Profile of ${student.name}`}
                  className="profile-image"
                />
              ) : (
                <div className="profile-placeholder">No Image</div>
              )}
            </td>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.courseId}</td>
            <td>
              <button onClick={() => onEdit(student)} aria-label={`Edit ${student.name}`}>
                Edit
              </button>
              <button
                onClick={() => onDelete(student.id)}
                aria-label={`Delete ${student.name}`}
                className="delete-btn"
                style={{ marginLeft: '8px' }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentList;
