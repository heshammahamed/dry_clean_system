const date_ele = document.getElementById("date")
const list_ele = document.getElementById("list")

setDate()

function setDate () {
    const date = new Date();
    const arabicDate = date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
    date_ele.innerText=arabicDate
}


function list_content (data) {
    if (data.length === 0) {
        list_ele.innerHTML = `<p class ="empty">` + `كل طلبات النهارده جاهزه للتسليم` + `</p>` 
    }else {
        data.forEach(element => {
            list_ele.innerHTML+=`<div>${element.id}</div>`
        });
    }
}

(async () => {

            const response = await fetch("http://localhost:8010/api/orders/?date=2025-08-29");

            // what about the other possible errors
            if (response.status == 401) {
                window.location.replace("/login/");
                return
            }

            if (response.status == 500) {
                window.location.replace("/login/");
                return
            }

            const data = await response.json()

            console.log(data)

            list_content(data)
            return

        })();