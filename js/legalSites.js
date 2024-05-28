async function init() {
    await initInclude();
    await loadAllData('loginData');
    getProfileInitials();
}