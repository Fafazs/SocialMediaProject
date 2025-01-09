
const authenticationCookies = async (event) => {
    try {
        const response = fetch('/cookieAuth', {
            method: 'GET',
            credentials: 'include',
        })
        switch (response.status) {
            case 200:
                {
                    const data = await response.json();
                    const params = new URLSearchParams({
                        message: `Welcome Back ${data.message.name}, your session started with ${data.message.email}.`,
                    }).toString();
                    if (window.location.pathname !== '/homePage.html') {
                        window.location.href = `/homePage?${params}`;
                    } else {
                        console.log('You are already on the home page.');
                    }
                    break;
                }

            case 400:
                {
                    const params = new URLSearchParams({
                        message: 'User not found, please log in or create an account.',
                    }).toString();
                    window.location.href = `/login?${params}`;
                    break;
                }


            case 401:
                {
                    const params = new URLSearchParams({
                        message: 'Login not found, please log in or create an account.',
                    }).toString();
                    window.location.href = `/login?${params}`;
                    break;
                }

            case 403:
                {
                    const params = new URLSearchParams({
                        message: 'Token is invalid, please log in again.',
                    }).toString();
                    window.location.href = `/login?${params}`;
                    break;
                }

            default:
                {
                    console.error('Unexpected status code:', response.status);
                    alert('Something went wrong. Please try again.');
                    break;
                }
        }
    } catch (err) {
        console.error('Error during authentication:', err);
        alert('An error occurred. Please try again later.');
    }

}