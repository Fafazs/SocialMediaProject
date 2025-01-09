const profileSec = document.getElementById('profileSection');
const mediaSec = document.getElementById('mediaSection');
const contactSec = document.getElementById('contactSection');

const homePage = async (profileSec, mediaSec, contactSec) => {
    try {
        const response = await fetch('/homePage', {
            method: 'GET',
            credentials: 'include',
        });

        if (response.status === 200) {
            const userData = await response.json();
        }

    } catch (err) { }
}


const renderHomePage = async (userData, profileSec, mediaSec, contactSec) => {
    try {
        

    } catch (err) {

    }
}