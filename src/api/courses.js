export async function fetchCourses() {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'HTML Basics' },
        { id: 2, name: 'CSS Mastery' },
        { id: 3, name: 'JavaScript Pro' },
        { id: 4, name: 'React In Depth' },
      ]);
    }, 1000);
  });
}
