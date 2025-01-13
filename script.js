const apiBaseUrl = "https://your-database-id.restdb.io/rest/students"; // Replace with your RESTdb collection URL
const apiKey = "your-api-key"; // Replace with your RESTdb API key

document.getElementById("studentForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const newStudent = {
    name: document.getElementById("name").value,
    studentId: document.getElementById("studentId").value,
    mentor: document.getElementById("mentor").value,
    class: document.getElementById("class").value,
    email: document.getElementById("email").value,
    birthday: document.getElementById("birthday").value,
  };

  try {
    // Send POST request to RESTdb to add a student
    const response = await fetch(apiBaseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": apiKey,
      },
      body: JSON.stringify(newStudent),
    });

    if (response.ok) {
      alert("Student added successfully!");
      fetchStudents(); // Refresh the student list
      document.getElementById("studentForm").reset(); // Clear the form
    } else {
      throw new Error("Failed to add student.");
    }
  } catch (error) {
    console.error("Error adding student:", error);
  }
});

// Fetch all students
async function fetchStudents() {
  try {
    const response = await fetch(apiBaseUrl, {
      method: "GET",
      headers: {
        "x-apikey": apiKey,
      },
    });

    const students = await response.json();
    displayStudents(students);
  } catch (error) {
    console.error("Error fetching students:", error);
  }
}

// Display students in the table
function displayStudents(students) {
  const studentTable = document.querySelector("#studentTable tbody");
  studentTable.innerHTML = "";

  students.forEach((student) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.studentId}</td>
      <td>${student.mentor}</td>
      <td>${student.class}</td>
      <td>${student.email}</td>
      <td>${student.birthday}</td>
      <td>
        <button onclick="deleteStudent('${student._id}')">Delete</button>
      </td>
    `;

    studentTable.appendChild(row);
  });
}

// Delete a student
async function deleteStudent(studentId) {
  try {
    const response = await fetch(`${apiBaseUrl}/${studentId}`, {
      method: "DELETE",
      headers: {
        "x-apikey": apiKey,
      },
    });

    if (response.ok) {
      alert("Student deleted successfully!");
      fetchStudents(); // Refresh the student list
    } else {
      throw new Error("Failed to delete student.");
    }
  } catch (error) {
    console.error("Error deleting student:", error);
  }
}

// Initial fetch to display all students
fetchStudents();
