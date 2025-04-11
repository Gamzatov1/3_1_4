$(document).ready(function () {
    loadRoles($('#newRoles'));
});

function createUser() {
    const user = {
        username: $('#newUsername').val(),
        lastName: $('#newLastName').val(),
        age: $('#newAge').val(),
        email: $('#newEmail').val(),
        password: $('#newPassword').val(),
        roles: $('#newRoles').val().map(id => ({id: parseInt(id)}))
    };

    fetch('/admin/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        if (response.ok) {
            // Clear form
            $('#newUserForm')[0].reset();
            // Switch to Users Table tab
            $('#usersTable-tab').tab('show');
            // Refresh users table
            refreshTable();
        }
    })
    .catch(error => console.error('Error creating user:', error));
} 