class CustomNavigation extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<div class="elements"></div>` + this.innerHTML
    }
}

customElements.define("custom-navigation", CustomNavigation)

const navigationLoaded = (paginationLimit = 10, currentPage = 1) => {
    const paginationNumbers = document.querySelector("custom-navigation .paginationNumbers")
    const paginatedList = document.querySelector("custom-navigation>.elements")
    const listItems = [...paginatedList.children]

    const pageCount = Math.ceil(listItems.length / paginationLimit)
    paginationNumbers.innerHTML = ``

    const appendPageNumber = (index) => {
        const pageNumber = document.createElement('div')
        pageNumber.className = "paginationNumber"
        pageNumber.innerHTML = index.toString()
        pageNumber.setAttribute("page-index", index)
        paginationNumbers.appendChild(pageNumber)
    };

    const getPaginationNumbers = () => {
        for (let i = 1; i <= pageCount; i++) {
            appendPageNumber(i);
        }
    };

    const handleActivePageNumber = () => {
        document.querySelectorAll(".paginationNumber").forEach((button) => {
            button.classList.remove("active");
            const pageIndex = Number(button.getAttribute("page-index"));
            if (pageIndex == currentPage) {
                button.classList.add("active");
            }
        });
    };
    const boldList = document.querySelectorAll(".pageNumber>.bold")

    const setCurrentPage = (pageNum) => {
        currentPage = pageNum > pageCount ? pageCount : pageNum;

        boldList[0].innerHTML = listItems.length

        let bottom = (currentPage - 1) * paginationLimit + 1
        bottom = listItems.length < bottom ? listItems.length : bottom

        let top = currentPage * paginationLimit
        top = listItems.length < top ? listItems.length : top

        boldList[1].innerHTML = `${bottom}-${top}`
        handleActivePageNumber();

        const prevRange = (currentPage - 1) * paginationLimit;
        const currRange = currentPage * paginationLimit;

        listItems.forEach((item, index) => {
            item.classList.add("hidden");
            if (index >= prevRange && index < currRange) {
                item.classList.remove("hidden");
            }
        });
    };
    getPaginationNumbers();
    setCurrentPage(currentPage);

    document.querySelectorAll(".paginationNumber").forEach((button) => {
        const pageIndex = Number(button.getAttribute("page-index"));

        if (pageIndex) {
            button.addEventListener("click", () => {
                setCurrentPage(pageIndex);
            });
        }
    });


    const pageCounterChildren = document.querySelectorAll(".pageCounter>*")
    pageCounterChildren.forEach((button) => {
        const count = button.innerHTML;
        if (count === paginationLimit.toString()) {
            button.classList.add("active")
        } else {
            button.classList.remove("active")
        }
        if (count) {
            button.addEventListener("click", () => {
                navigationLoaded(count, currentPage)
            });
        }
    });
}