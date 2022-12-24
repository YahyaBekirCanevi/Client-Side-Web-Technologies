class DeleteStudent extends HTMLElement {
    connectedCallback() {
        this.tid = this.getAttribute('tid')
        this.fname = ""
        this.lname = ""
        fetchAsync(`http://localhost:3000/students/${this.tid}`, 'GET', null)
            .then(async (response) => {
                let res = await response.json()
                this.fname = res.fname
                this.lname = res.lname
                this.innerHTML = `
        <div class="modal fade" id="studentDelete-${this.tid}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                            style="color: rgb(220, 53, 69);" class="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                            <path
                                d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                            <path
                                d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
                        </svg>

                        <h5 class="modal-title" id="exampleModalLabel">Öğrenci Sil</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p><strong>${this.fname} ${this.lname}</strong> isimli öğrenciyi siliyorsunuz. Bu işlem geri alınamaz. Devam
                            etmek istediğinize emin misiniz?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Vazgeç</button>
                        <input type="submit" value="Sil" class="btn btn-danger" />
                    </div>
                </div>
            </div>
        </div>`
                const button = this.querySelector('.modal-footer>input')
                button.addEventListener('click', () => deleteButtonAction(this.tid))
            })

    }
}

customElements.define('delete-student', DeleteStudent)