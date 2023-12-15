const form = document.getElementById('form-login');

form.addEventListener('submit', evento =>{
    evento.preventDefault()
    
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    fetch('http://localhost:8100/createUser',{
        method:'POST',
        mode:'cors',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            name:name,
            email: email,
            password: password
        })
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error('Erro:', error);
    });
})