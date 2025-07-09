import React, { useState, useEffect } from 'react';

function StudentForm({ courses, onSave, onCancel, editingStudent, onDelete }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [courseId, setCourseId] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [errors, setErrors] = useState({});

  // Populate form when editing a student.
  // This demonstrates controlled components and useEffect hook to update form state.
  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setEmail(editingStudent.email);
      setCourseId(editingStudent.courseId);
      setProfileImage(editingStudent.profileImage);
      setErrors({});
    } else {
      setName('');
      setEmail('');
      setCourseId('');
      setProfileImage('');
      setErrors({});
    }
  }, [editingStudent]);

  // Validate form fields before submission.
  // Checks required fields and email format.
  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!courseId) newErrors.courseId = 'Course selection is required';
    return newErrors;
  };

  // Handle form submission.
  // Prevents default form submit, validates inputs, and calls onSave prop with student data.
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    onSave({
      id: editingStudent ? editingStudent.id : null,
      name: name.trim(),
      email: email.trim(),
      courseId,
      profileImage: profileImage.trim(),
    });
  };

  return (
    <form className="student-form" onSubmit={handleSubmit} noValidate>
      <h2>{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-describedby="name-error"
          required
        />
        {errors.name && (
          <span className="error" id="name-error">
            {errors.name}
          </span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby="email-error"
          required
        />
        {errors.email && (
          <span className="error" id="email-error">
            {errors.email}
          </span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="course">Enrolled Course *</label>
        <select
          id="course"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          aria-describedby="course-error"
          required
        >
          <option value="">-- Select a course --</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
        {errors.courseId && (
          <span className="error" id="course-error">
            {errors.courseId}
          </span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="profileImage">Profile Image URL</label>
        <input
          id="profileImage"
          type="url"
          value={profileImage}
          onChange={(e) => setProfileImage(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>
  <div className="form-actions">
    <button type="submit">{editingStudent ? 'Update' : 'Add'}</button>
    {editingStudent && (
      <button type="button" onClick={onCancel} className="cancel-btn" style={{ marginLeft: '8px' }}>
        Cancel
      </button>
    )}
  </div>
    </form>
  );
}

export default StudentForm;
