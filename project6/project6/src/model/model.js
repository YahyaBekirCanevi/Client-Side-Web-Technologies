function addUpdateButtonAction(base, tid = -1) {
    console.log(tid)
    const nameForm = base.querySelector('#nameForm')
    const name = base.querySelector('#name');

    const surnameForm = base.querySelector('#surnameForm')
    const surname = base.querySelector('#surname');

    const studentNumberForm = base.querySelector('#studentNumberForm')
    const studentNumber = base.querySelector('#studentNumber');

    const studentDepartmantForm = base.querySelector('#studentDepartmantForm')
    const studentDepartmant = base.querySelector('#studentDepartmant');

    const placeBirthForm = base.querySelector('#placeBirthForm')
    const placeBirth = base.querySelector('#placeBirth');

    const dateBirthForm = base.querySelector('#dateBirthForm')
    const dateBirth = base.querySelector('#dateBirth');

    const nameCondition = name.value.length >= 3
    const surnameCondition = surname.value.length >= 3
    const studentNumberCondition = studentNumber.value.length === 12
    const studentDepartmantCondition = studentDepartmant.value !== "Bölüm Seçiniz"
    const placeBirthCondition = placeBirth.value.length >= 3
    const dateBirthCondition = dateBirth.value.length >= 3

    nameForm.querySelector(".valid").style.display = nameCondition ? "block" : "none"
    nameForm.querySelector(".invalid").style.display = !nameCondition ? "block" : "none"
    if (nameCondition) {
        name.classList.add('validForm')
        name.classList.remove('invalidForm')
    } else {
        name.classList.add('invalidForm')
        name.classList.remove('validForm')
    }
    surnameForm.querySelector(".valid").style.display = surnameCondition ? "block" : "none"
    surnameForm.querySelector(".invalid").style.display = !surnameCondition ? "block" : "none"
    if (surnameCondition) {
        surname.classList.add('validForm')
        surname.classList.remove('invalidForm')
    } else {
        surname.classList.add('invalidForm')
        surname.classList.remove('validForm')
    }
    studentNumberForm.querySelector(".valid").style.display = studentNumberCondition ? "block" : "none"
    studentNumberForm.querySelector(".invalid").style.display = !studentNumberCondition ? "block" : "none"
    if (studentNumberCondition) {
        studentNumber.classList.add('validForm')
        studentNumber.classList.remove('invalidForm')
    } else {
        studentNumber.classList.add('invalidForm')
        studentNumber.classList.remove('validForm')
    }
    studentDepartmantForm.querySelector(".valid").style.display = studentDepartmantCondition ? "block" : "none"
    studentDepartmantForm.querySelector(".invalid").style.display = !studentDepartmantCondition ? "block" : "none"
    if (studentDepartmantCondition) {
        studentDepartmant.classList.add('validForm')
        studentDepartmant.classList.remove('invalidForm')
    } else {
        studentDepartmant.classList.add('invalidForm')
        studentDepartmant.classList.remove('validForm')
    }
    placeBirthForm.querySelector(".valid").style.display = placeBirthCondition ? "block" : "none"
    placeBirthForm.querySelector(".invalid").style.display = !placeBirthCondition ? "block" : "none"
    if (placeBirthCondition) {
        placeBirth.classList.add('validForm')
        placeBirth.classList.remove('invalidForm')
    } else {
        placeBirth.classList.add('invalidForm')
        placeBirth.classList.remove('validForm')
    }
    dateBirthForm.querySelector(".valid").style.display = dateBirthCondition ? "block" : "none"
    dateBirthForm.querySelector(".invalid").style.display = !dateBirthCondition ? "block" : "none"
    if (dateBirthCondition) {
        dateBirth.classList.add('validForm')
        dateBirth.classList.remove('invalidForm')
    } else {
        dateBirth.classList.add('invalidForm')
        dateBirth.classList.remove('validForm')
    }

    let isValid = nameCondition &&
        surnameCondition &&
        studentNumberCondition &&
        studentDepartmantCondition &&
        placeBirthCondition &&
        dateBirthCondition;

    console.log(isValid)
    if (isValid) {
        if (tid === -1) {
            console.log('New Student')
            let data = {
                "fname": name.value,
                "lname": surname.value,
                "num": studentNumber.value,
                "dept": studentDepartmant.value,
                "pob": placeBirth.value,
                "dob": dateBirth.value
            }
            fetchAsync('http://localhost:8000/students', 'POST', data)
                .then((response) => {
                    console.log('New Student', response.status)
                })
        } else {
            console.log('Update Student')
            let data = {
                "id": tid,
                "fname": name.value,
                "lname": surname.value,
                "num": studentNumber.value,
                "dept": studentDepartmant.value,
                "pob": placeBirth.value,
                "dob": dateBirth.value
            }
            fetchAsync('http://localhost:8000/students/' + tid, 'PUT', data)
                .then((response) => {
                    console.log('Update Student', response.status)
                })
        }
    }
}
function deleteButtonAction(tid) {
    console.log('delete', tid)
    fetchAsync(`http://localhost:8000/students/${tid}`, 'DELETE', null)
        .then((response) => { console.log(response.status) })
}