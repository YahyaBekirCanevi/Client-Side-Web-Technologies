class StudentAddUpdate extends HTMLElement {
    connectedCallback() {
        this.tid = this.getAttribute('tid')
        this.detail = this.getAttribute('detail')
        let newId = ""
        let title = ""
        let buttonName = ""
        if (this.detail !== null && this.tid !== null) {
            newId = "studentDetail-" + this.tid
            title = "Öğrenci Detay Bilgileri"
        } else if (this.tid !== null) {
            newId = "studentUpdate-" + this.tid
            title = "Güncellenecek Öğrenci Bilgileri"
            buttonName = "Güncelle"
        } else {
            newId = "studentAdd"
            title = "Eklenecek Öğrenci Bilgileri"
            buttonName = "Ekle"
        }
        this.innerHTML = `<div class="modal fade" id="${newId}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="needs-validation" novalidate>
                        <div class="row">
                            <div class="col-md-6 form-group" id="nameForm">
                                <label for="name">İsim</label>
                                <input type="text" class="form-control" id="name" />
                                <div class="valid">Geçerli</div>
                                <div class="invalid">İsim en az 3 harf içermelidir</div>
                            </div>
                            <div class="col-md-6 form-group" id="surnameForm">
                                <label for="surname">Soyisim</label>
                                <input type="text" class="form-control" id="surname" />
                                <div class="valid">Geçerli</div>
                                <div class="invalid">İsim en az 3 harf içermelidir</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 form-group" id="studentNumberForm">
                                <label for="studentNumber">Öğrenci Numarası</label>
                                <input type="number" class="form-control" id="studentNumber" />
                                <div class="valid">Geçerli</div>
                                <div class="invalid">Öğrenci numarası en az 12 rakam içermelidir.</div>
                            </div>
                            <div class="col-md-6 form-group" id="studentDepartmantForm">
                                <label for="studentDepartmant">Bölüm</label>
                                <select class="form-control" id="studentDepartmant">
                                    <option selected>Bölüm Seçiniz</option>
                                    <option value="1">Bilgisayar Müh.</option>
                                    <option value="2">Elektrik-Elektronik Müh.</option>
                                    <option value="3">Endüstri Müh.</option>
                                    <option value="4">İnşaat Müh.</option>
                                </select>
                                <div class="valid">Geçerli</div>
                                <div class="invalid">Bölüm seçiniz</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 form-group" id="placeBirthForm">
                                <label for="placeBirth">Doğum Yeri</label>
                                <input type="text" class="form-control" id="placeBirth" />
                                <div class="valid">Geçerli</div>
                                <div class="invalid">Doğum yeri en az 3 harf içermelidir</div>
                            </div>
                            <div class="col-md-6 form-group" id="dateBirthForm">
                                <label for="dateBirth">Doğum Tarihi</label>
                                <input type="date" class="form-control" id="dateBirth" />
                                <div class="valid">Geçerli</div>
                                <div class="invalid">Tarih giriniz</div>
                            </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Kapat</button>
                    ` + (buttonName === "" ? `` : `<input type="submit" value="${buttonName}" class="btn btn-primary" />`) + `
                </div>
            </div>
        </div>
    </div>`
        switch (buttonName) {
            case "Ekle":
                {
                    const button = this.querySelector('.modal-footer>input')
                    button.addEventListener('click', () => addUpdateButtonAction(document))
                    break;
                }
            case "Güncelle":
                {

                    const button = this.querySelector('.modal-footer>input')
                    button.addEventListener('click', () => addUpdateButtonAction(this, this.tid))
                    break;
                }
            default:
                break;
        }
        if (buttonName !== "Ekle") {
            fetchAsync(`http://localhost:3000/students/${this.tid}`, 'GET', null)
                .then(async (response) => {
                    let res = await response.json()
                    this.querySelector('#name').value = res.fname
                    this.querySelector('#surname').value = res.lname
                    this.querySelector('#studentNumber').value = res.num
                    this.querySelector('#studentDepartmant').value = res.dept
                    this.querySelector('#placeBirth').value = res.pob
                    this.querySelector('#dateBirth').value = res.dob
                })
        }
        var validValue = document.querySelectorAll(".valid")
        var invalidValue = document.querySelectorAll(".invalid")
        validValue.forEach((e) => { e.style.display = "none" })
        invalidValue.forEach((e) => { e.style.display = "none" })
    }
}

customElements.define('add-update-student', StudentAddUpdate)