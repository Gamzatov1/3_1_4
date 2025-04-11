$(document).ready(function () {
    console.log("Current user script loaded (for admin panel's User tab/header). Attempting to load current user data...");
    loadCurrentUser();
});

function loadCurrentUser() {
    console.log("Fetching current user data from /api/user (for admin panel)");
    fetch('/api/user')
        .then(response => {
            console.log("Current User (Admin Panel) Response status:", response.status);
            if (!response.ok) {
                console.error("Current User (Admin Panel) Network response error:", response.statusText);
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(user => {
            console.log("Current User data received (for admin panel):", user);
            if (!user || !user.roles) {
                 console.error("Current User data or user roles are missing (for admin panel).", user);
                 $('#currentUserTableBody').html('<tr><td colspan="6">Error: Missing user data or roles.</td></tr>');
                 $('#headerUsername').text('Error');
                 $('#headerRoles').text('Error');
                 return;
            }

            let roles = user.roles.map(role => role.name.replace('ROLE_', '')).join(', ');
            console.log("Current User (Admin Panel) Formatted roles:", roles);

            let row = `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.lastName}</td>
                    <td>${user.age}</td>
                    <td>${user.email}</td>
                    <td>${roles}</td>

                </tr>
            `;

            
            // Update the table body
            $('#currentUserTableBody').html(row);
            
            // Update header info
            $('#headerUsername').text(user.email);
            $('#headerRoles').text(roles);
        })
        .catch(error => console.error('Error loading current user:', error));

}