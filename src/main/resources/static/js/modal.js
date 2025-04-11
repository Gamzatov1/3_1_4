// Load roles for select options
function loadRoles(selectElement) {
    fetch('/admin/roles')
        .then(response => response.json())
        .then(roles => {
            selectElement.empty();
            roles.forEach(role => {
                selectElement.append(new Option(role.name.replace('ROLE_', ''), role.id));
            });
        })
        .catch(error => console.error('Error loading roles:', error));
}

// Edit Modal
function openEditModal(userId) {
    fetch(`/admin/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            $('#editId').val(user.id);
            $('#editUsername').val(user.username);
            $('#editLastName').val(user.lastName);
            $('#editAge').val(user.age);
            $('#editEmail').val(user.email);
            $('#editPassword').val('');
            
            let editRolesSelect = $('#editRoles');
            loadRoles(editRolesSelect);
            
            setTimeout(() => {
                let userRoleIds = user.roles.map(role => role.id);
                editRolesSelect.val(userRoleIds);
            }, 100);
            
            $('#editModal').modal('show');
        })
        .catch(error => console.error('Error loading user:', error));
}

function updateUser() {
    const user = {
        id: $('#editId').val(),
        username: $('#editUsername').val(),
        lastName: $('#editLastName').val(),
        age: $('#editAge').val(),
        email: $('#editEmail').val(),
        password: $('#editPassword').val(),
        roles: $('#editRoles').val().map(id => ({id: parseInt(id)}))
    };

    fetch(`/admin/users/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        if (response.ok) {
            $('#editModal').modal('hide');
            refreshTable();
        }
    })
    .catch(error => console.error('Error updating user:', error));
}

// Delete Modal
function openDeleteModal(userId) {
    fetch(`/admin/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            $('#deleteId').val(user.id);
            $('#deleteUsername').text(user.username);
            $('#deleteLastName').text(user.lastName);
            $('#deleteAge').text(user.age);
            $('#deleteEmail').text(user.email);
            
            let roles = user.roles.map(role => role.name.replace('ROLE_', '')).join(', ');
            $('#deleteRoles').text(roles);
            
            $('#deleteModal').modal('show');
        })
        .catch(error => console.error('Error loading user:', error));
}

function deleteUser() {
    const userId = $('#deleteId').val();
    
    fetch(`/admin/users/${userId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            $('#deleteModal').modal('hide');
            refreshTable();
        }
    })
    .catch(error => console.error('Error deleting user:', error));
} 