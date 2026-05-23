const students = [

    {
        name: "Sanskruti Bhoyar",
        password: "sanskruti123",

        subjects: [
            { name: "Mathematics", score: 88, total: 100 },
            { name: "English", score: 82, total: 100 },
            { name: "Science", score: 90, total: 100 },
            { name: "History", score: 85, total: 100 },
            { name: "Geography", score: 87, total: 100 },
            { name: "Computer Science", score: 92, total: 100 }
        ]
    },

    {
        name: "Rutika Bhoyar",
        password: "rutika456",

        subjects: [
            { name: "Mathematics", score: 91, total: 100 },
            { name: "English", score: 86, total: 100 },
            { name: "Science", score: 89, total: 100 },
            { name: "History", score: 84, total: 100 },
            { name: "Geography", score: 88, total: 100 },
            { name: "Computer Science", score: 94, total: 100 }
        ]
    },

    {
        name: "Shreyash Chavhan",
        password: "shreyash789",

        subjects: [
            { name: "Mathematics", score: 79, total: 100 },
            { name: "English", score: 75, total: 100 },
            { name: "Science", score: 81, total: 100 },
            { name: "History", score: 77, total: 100 },
            { name: "Geography", score: 80, total: 100 },
            { name: "Computer Science", score: 83, total: 100 }
        ]
    }

];

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("studentName").value.trim();

    const password =
        document.getElementById("studentPassword").value.trim();

    clearErrors();

    if (name === "") {
        document.getElementById("nameError").innerText =
            "Name is required";
        return;
    }

    if (password === "") {
        document.getElementById("passwordError").innerText =
            "Password is required";
        return;
    }

    document.getElementById("spinner").classList.remove("hidden");

    document.getElementById("btnText").innerText =
        "Logging in...";

    setTimeout(() => {

        const student = students.find(s =>
            s.name.toLowerCase() === name.toLowerCase()
            && s.password === password
        );

        if (student) {

            localStorage.setItem(
                "student",
                JSON.stringify(student)
            );

            showResults(student);

        } else {

            const error =
                document.getElementById("loginError");

            error.innerText =
                "Invalid name or password";

            error.classList.remove("hidden");
        }

        document.getElementById("spinner")
            .classList.add("hidden");

        document.getElementById("btnText")
            .innerText = "Login";

    }, 800);

});

function clearErrors() {

    document.getElementById("nameError").innerText = "";

    document.getElementById("passwordError").innerText = "";

    document.getElementById("loginError")
        .classList.add("hidden");
}

function showResults(student) {

    document.getElementById("loginPage")
        .classList.add("hidden");

    document.getElementById("resultPage")
        .classList.remove("hidden");

    document.getElementById("welcomeText")
        .innerText = `Welcome, ${student.name}!`;

    const totalScore =
        student.subjects.reduce((sum, s) =>
            sum + s.score, 0);

    const totalMarks =
        student.subjects.reduce((sum, s) =>
            sum + s.total, 0);

    const average =
        Math.round(totalScore / student.subjects.length);

    document.getElementById("averageScore")
        .innerText = average;

    document.getElementById("averagePercentage")
        .innerText = average + "%";

    document.getElementById("totalSubjects")
        .innerText = student.subjects.length;

    document.getElementById("totalMarks")
        .innerText = `${totalScore}/${totalMarks}`;

    const container =
        document.getElementById("subjectsContainer");

    container.innerHTML = "";

    student.subjects.forEach(subject => {

        const percentage =
            Math.round((subject.score / subject.total) * 100);

        let grade = "";

        if (percentage >= 90) {
            grade = "A+";
        }

        else if (percentage >= 80) {
            grade = "A";
        }

        else if (percentage >= 70) {
            grade = "B";
        }

        else if (percentage >= 60) {
            grade = "C";
        }

        else {
            grade = "F";
        }

        const card = document.createElement("div");

        card.className = "subject-card";

        card.innerHTML = `

            <div class="subject-top">

                <h2>${subject.name}</h2>

                <span>${percentage}%</span>

            </div>

            <p>
                <strong>
                    ${subject.score}/${subject.total}
                </strong>
            </p>

            <div class="progress">

                <div class="progress-bar"
                    style="width:${percentage}%">
                </div>

            </div>

            <div class="grade-row">

                <p>Grade: <strong>${grade}</strong></p>

                <p>
                    ${percentage >= 90
                        ? "Excellent"
                        : percentage >= 75
                            ? "Good"
                            : percentage >= 60
                                ? "Pass"
                                : "Fail"}
                </p>

            </div>

        `;

        container.appendChild(card);

    });

    lucide.createIcons();
}

/* LOGOUT */

document.getElementById("logoutBtn")
    .addEventListener("click", () => {

        localStorage.removeItem("student");

        document.getElementById("resultPage")
            .classList.add("hidden");

        document.getElementById("loginPage")
            .classList.remove("hidden");

        document.getElementById("studentName").value = "";

        document.getElementById("studentPassword").value = "";

    });

/* AUTO LOGIN */

window.onload = () => {

    const saved = localStorage.getItem("student");

    if (saved) {
        showResults(JSON.parse(saved));
    }

    lucide.createIcons();
};
