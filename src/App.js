import React, { useState, useEffect, useMemo } from 'react';
import StudentList from './components/StudentList.jsx';
import StudentForm from './components/StudentForm.jsx';
import { fetchCourses } from './api/courses';

function App() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [errorCourses, setErrorCourses] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);

  // Fetch courses from mock API using async/await inside useEffect hook.
  // This demonstrates asynchronous data fetching and handling of loading and error states.
  useEffect(() => {
    async function loadCourses() {
      setLoadingCourses(true);
      setErrorCourses(null);
      try {
        // Await the promise returned by fetchCourses.
        const data = await fetchCourses();
        setCourses(data);
      } catch (error) {
        setErrorCourses('Failed to load courses');
      } finally {
        setLoadingCourses(false);
      }
    }
    loadCourses();
  }, []);

  // Memoize students count to demonstrate useMemo hook.
  // This avoids recalculating the count on every render unless students array changes.
  const studentsCount = useMemo(() => students.length, [students]);

  // Add or update student in state.
  // Demonstrates state management and immutability.
  const handleSaveStudent = (student) => {
    if (student.id) {
      // Update existing student by mapping and replacing the matching id.
      setStudents((prev) =>
        prev.map((s) => (s.id === student.id ? student : s))
      );
    } else {
      // Add new student with a unique id using Date.now().
      setStudents((prev) => [...prev, { ...student, id: Date.now() }]);
    }
    setEditingStudent(null);
  };

  // Set the student to be edited.
  const handleEditStudent = (student) => {
    setEditingStudent(student);
  };

  // Cancel editing by clearing editingStudent state.
  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  /*
  Note on JavaScript Hoisting:
  - Function declarations like loadCourses are hoisted, so they can be called before their definition.
  - Variables declared with const and let are not hoisted in the same way and must be declared before use.
  */

  /*
  Event Loop Explanation:
  - The async function loadCourses uses await, which pauses execution until the promise resolves.
  - Meanwhile, the event loop continues processing other tasks, keeping the UI responsive.
  - The setTimeout in fetchCourses simulates network delay, showing asynchronous behavior.
  */

  return React.createElement(
    'div',
    { className: 'app-container' },
    React.createElement('h1', null, 'Student Management Dashboard'),
    loadingCourses && React.createElement('p', null, 'Loading courses...'),
    errorCourses && React.createElement('p', { className: 'error' }, errorCourses),
    !loadingCourses &&
      !errorCourses &&
      React.createElement(StudentForm, {
        key: editingStudent ? editingStudent.id : 'new',
        courses: courses,
        onSave: handleSaveStudent,
        onCancel: handleCancelEdit,
        editingStudent: editingStudent,
      }),
    React.createElement('h2', null, `Students (${studentsCount})`),
    React.createElement(StudentList, { students: students, onEdit: handleEditStudent })
  );
}

export default App;
