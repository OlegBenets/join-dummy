/**
 * This function is used to toggle the visibility of the profile sidebar.
 */
function showProfileSidebar() {
    var sidebar = document.getElementById('profileSidebar');
        if (sidebar.style.display === 'none' || sidebar.style.display === '') {
            sidebar.style.display = 'block';
        } else {
            sidebar.style.display = 'none';
        }
}