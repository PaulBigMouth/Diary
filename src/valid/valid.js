import axios from 'axios'

export const emailValid = id => {
    if (id.value) {
        id.classList.add('AuthEmailInvalid')
    } else {
        id.classList.remove('AuthEmailInvalid')
    }
}


function signInWithEmailAndPassword(email, password) {
    const apiKey = 'AIzaSyDaLPO4RJTOBA6u4ioC8MmVBuxryG7BgGE';
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: "POST",
        body: JSON.stringify({
            email, password,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((resolve) => {
            resolve.json()
            if (resolve.status === 200) {
                createUser(email)

                setTimeout(() => {
                    document.location.replace('/base')
                }, 1000)
            } else {
                errorText(document.querySelector('.errorAuth'), 'Неверный логин или пароль', document.querySelectorAll('.AuthInput'))
            }
        })
        .catch(e => {
            alert(e)
        })


}

export function submitAuthFormHandler(event) {
    event.preventDefault()

    const email = document.querySelector('#AuthEmail').value;
    const password = document.querySelector('#AuthPassword').value



    try {
        signInWithEmailAndPassword(email, password)
    } catch (e) {
        alert(e)
    }

}
function createAuthWithEmailAndPassword(email, password, nickname) {
    const apiKey = "AIzaSyDaLPO4RJTOBA6u4ioC8MmVBuxryG7BgGE";
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
        method: "POST",
        body: JSON.stringify({
            email, password,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(resolve => resolve.json())
        .then(data => {

        })

}

export function SubmitRegisterFormHandler(event) {
    event.preventDefault()

    const email = document.querySelector('#AuthEmail').value;
    const password = document.querySelector('#AuthPassword').value

    try {
        createAuthWithEmailAndPassword(email, password).then(() => {
            signInWithEmailAndPassword(email, password)
        })
    } catch (error) {
        alert(error)
    }

}

async function createUser(email) {
    const user = {
        email
    }

    try {
        const res = await axios.get(`https://react-app-23624.firebaseio.com/users.json`)
        const dt = Object.keys(res.data).map(key => ({
            ...res.data[key],
            id: key
        }))
        const r = dt.find(item => {
            return item.email === email
        })

        if (!r) {
            axios.post(`https://react-app-23624.firebaseio.com/users.json`, user).then((resolve) => localStorage.setItem('userId', resolve.data.name))
        } else {
            localStorage.setItem('userId', r.id)
        }

    } catch (error) {
        throw new Error(error.message)
    }
}

function errorText(block, text, inputs) {
    block.classList.add('open')
    block.innerHTML = text
    inputs.forEach(input => {
        input.classList.add('invalid')
    })

}
export function errorTextRemove(block, input) {
    block.classList.add('hide')
    block.classList.remove('open')
    input.classList.remove('invalid')


    setTimeout(() => {
        block.classList.remove('hide')
    }, 300);
}




