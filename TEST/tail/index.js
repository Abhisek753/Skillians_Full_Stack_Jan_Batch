function addTodo() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;

    if (name === "" || email === "") {
        alert("Please enter name and email");
        return;
    }

    let li = document.createElement("li");

    li.className =
        "flex justify-between items-center bg-gray-100 p-2 rounded";

    li.innerHTML = `
        <div>
            <p class="font-semibold">${name}</p>
            <p class="text-sm text-gray-600">${email}</p>
        </div>

        <button
            onclick="deleteTodo(this)"
            class="bg-red-500 text-white px-2 py-1 rounded"
        >
            Delete
        </button>
    `;

    document
        .getElementById("todoList")
        .appendChild(li);

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
}

function deleteTodo(button) {
    button.parentElement.remove();
}