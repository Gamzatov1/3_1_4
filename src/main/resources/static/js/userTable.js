$(document).ready(function () {
    loadUserTable();
});

function loadUserTable() {
    fetch('/admin/users')
        .then(response => response.json())
        .then(users => {
            let tableBody = $('#userTableBody');
            tableBody.empty();
            
            users.forEach(user => {
                let roles = user.roles.map(role => role.name.replace('ROLE_', '')).join(', ');
                let row = `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.lastName}</td>
                        <td>${user.age}</td>
                        <td>${user.email}</td>
                        <td>${roles}</td>
                        <td>
                            <button class="btn btn-info" onclick="openEditModal(${user.id})">
                                Edit
                            </button>
                        </td>
                        <td>
                            <button class="btn btn-danger" onclick="openDeleteModal(${user.id})">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;
                tableBody.append(row);
            });
        })
        .catch(error => console.error('Error loading users:', error));
}

function refreshTable() {
    loadUserTable();
} 