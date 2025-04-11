$(document).ready(function () {
    console.log("User profile page loaded. Attempting to load user profile data...");
    loadUserProfile();
});

function loadUserProfile() {
    console.log("Fetching user data from /api/user");
    fetch('/api/user')
        .then(response => {
            console.log("Response status:", response.status);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(user => {
            console.log("User data received:", user);
            if (!user || !user.roles) {
                 console.error("User data or user roles are missing.", user);
                 $('#userProfileTableBody').html('<tr><td colspan="6">Error loading user data.</td></tr>');
                 return;
            }

            let roles = user.roles.map(role => role.name.replace('ROLE_', '')).join(', ');
            console.log("Formatted roles:", roles);
            
            let row = `
                <tr>
                    <td>${user.id !== null && user.id !== undefined ? user.id : 'N/A'}</td>
                    <td>${user.username ? user.username : 'N/A'}</td>
                    <td>${user.lastName ? user.lastName : 'N/A'}</td>
                    <td>${user.age !== null && user.age !== undefined ? user.age : 'N/A'}</td>
                    <td>${user.email ? user.email : 'N/A'}</td>
                    <td>${roles ? roles : 'N/A'}</td>
                </tr>
            `;
            
            console.log("Generated HTML row:", row);
            $('#userProfileTableBody').html(row);
            console.log("User profile table updated.");
            
            // Update header info
            $('#headerUsername').text(user.email ? user.email : 'N/A');
            $('#headerRoles').text(roles ? roles : 'N/A');
            console.log("Header updated.");
        })
        .catch(error => {
            console.error('Error loading user profile:', error);
            $('#userProfileTableBody').html('<tr><td colspan="6">Failed to load user profile. Check console for details.</td></tr>');
        });
} 