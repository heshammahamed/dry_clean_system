
let number;
let password;
let tries = 0;

const form = document.getElementById("form_submit")
const phone_err_container = document.getElementById("phone_error")


form.addEventListener("submit" , async (e) => {
    e.preventDefault();

    const formData = new FormData(form)
    const number = formData.get("phonenumber");
    const password = formData.get("password")

    if (number.length != 11) {
        form.reset()
        return
    }

    const response =  await fetch("http://localhost:8010/api/login" , {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            phonenumber : number,
            password : password,
        })
    })

    if (response.status === 200) {
        window.location.replace('/main/')
        return
    }
    const data = await response.json()

    console.log(data.message)

    form.reset()
    
    return
})

