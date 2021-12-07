// Get the modal
var modal = document.getElementById('simpleModal');

// Get the button that opens the modal
var modalBtn = document.getElementById('modalBtn');

// Get the <span> element that closes the modal
var closeBtn = document.getElementsByClassName('closeBtn')[0];


if (modalBtn) {
    modalBtn.addEventListener('click', openModal);
}

if (closeBtn){
    closeBtn.addEventListener('click', closeModal)
}

window.addEventListener('click', outsideClick)


function openModal() {
    modal.style.display = 'block'
}

function closeModal(){
    modal.style.display = 'none'
}

function outsideClick(e){
    if(e.target == modal){
        modal.style.display = 'none'
    }
}