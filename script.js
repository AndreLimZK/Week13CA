document.addEventListener("DOMContentLoaded", function () {
  const APIKEY = "d809449e2adb6884fb5b6a44123aeb9455ffb"; // Replace with your RESTDb API key

  // Load students on page load
  getStudents();

  // Add Student Listener
  document.getElementById("student-submit").addEventListener("click", function (e) {
      e.preventDefault();

      let studentName = document.getElementById("student-name").value;
      let studentId = document.getElementById("student-id").value;
      let studentMentor = document.getElementById("student-mentor").value;
      let studentClass = document.getElementById("student-class").value;
      let studentEmail = document.getElementById("student-email").value;
      let studentBirthday = document.getElementById("student-birthday").value;

      let jsondata = {
          "name": studentName,
          "student_id": studentId,
          "mentor": studentMentor,
          "class": studentClass,
          "email": studentEmail,
          "birthday": studentBirthday
      };

      let settings = {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "x-apikey": APIKEY,
              "Cache-Control": "no-cache"
          },
          body: JSON.stringify(jsondata)
      };

      fetch("https://week13ca-5072.restdb.io/rest/students", settings)
          .then(response => response.json())
          .then(data => {
              console.log(data);
              getStudents(); // Refresh student list
              document.getElementById("add-student-form").reset();
          });
  });

  // Fetch and display students
  function getStudents() {
      let settings = {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "x-apikey": APIKEY,
              "Cache-Control": "no-cache"
          }
      };

      fetch("https://week13ca-5072.restdb.io/rest/students", settings)
          .then(response => response.json())
          .then(response => {
              let content = "";
              response.forEach(student => {
                  content += `
                      <tr id="${student._id}">
                          <td>${student.name}</td>
                          <td>${student.student_id}</td>
                          <td>${student.mentor}</td>
                          <td>${student.class}</td>
                          <td>${student.email}</td>
                          <td>${student.birthday}</td>
                          <td>
                              <a href="#" class="delete" data-id="${student._id}">Delete</a>
                          </td>
                      </tr>`;
              });
              document.querySelector("#student-list tbody").innerHTML = content;
              document.getElementById("total-students").textContent = response.length;
          });
  }

  // Delete Student Listener
  document.getElementById("student-list").addEventListener("click", function (e) {
      if (e.target.classList.contains("delete")) {
          e.preventDefault();
          let id = e.target.getAttribute("data-id");

          let settings = {
              method: "DELETE",
              headers: {
                  "Content-Type": "application/json",
                  "x-apikey": APIKEY,
                  "Cache-Control": "no-cache"
              }
          };

          fetch(`https://week13ca-5072.restdb.io/rest/students/${id}`, settings)
              .then(response => response.json())
              .then(() => {
                  getStudents(); // Refresh student list
              });
      }
  });
});


