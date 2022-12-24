async function fetchAsync(url, method, data) {
    let response = await fetch(url, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: data === null ? undefined : JSON.stringify(data)
    })
    return response
}

fetchAsync('http://localhost:3000/students', 'GET', null)
    .then(async (response) => {
        const res = await response.json()
        res.map((el) => {
            const c_nav = document.querySelector('custom-navigation');
            const navigation = c_nav.querySelector(".elements")
            const customRow = document.createElement('custom-row')
            customRow.setAttribute("tid", el.id)
            customRow.setAttribute("fname", el.fname)
            customRow.setAttribute("lname", el.lname)
            customRow.setAttribute("num", el.num)
            customRow.setAttribute("dept", el.dept)
            customRow.setAttribute("pob", el.pob)
            customRow.setAttribute("dob", el.dob)
            navigation.appendChild(customRow)
        })
        navigationLoaded(10)
    })