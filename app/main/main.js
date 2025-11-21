const date_ele = document.getElementById("date")

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


(async () => {
            try {
                const response = await fetch("http://localhost:8010/api/orders/?date=2025-08-26");

                // what about the other possible errors
                if (response.status == 401) {
                    window.location.replace("/login/");
                    return
                }

                const data = await response.json()
                return
            }catch(err) {
                console.log(err)
            }

        })();