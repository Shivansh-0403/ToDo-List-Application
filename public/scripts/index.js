
function onClick(element) {
    if (document.getElementById("popupContainer").style.display === 'none') {
        document.getElementById("popupContainer").style.display = 'flex';
        document.getElementById("popupContainer").classList.add('newStyling');
    }
    else if (document.getElementById("popupContainer").style.display = 'flex') {
        document.getElementById("popupContainer").style.display = 'none';
    }
}


function submitClick() {
    document.getElementById("popupContainer").style.display = 'none';
}


function checkboxSubmit(element) {
    document.getElementById("checkboxSubmitForm").submit();
}

function ask(event) {

    const userConfirmed = window.confirm('Do you want to delete the task?');

    if (userConfirmed) {
        // If user confirms, submit the form
        document.getElementById('myForm').submit();
    } else {
        // If user denies, do nothing or redirect to home route
        // window.location.href = '/'; // Uncomment this line to redirect
        event.preventDefault();
    }
}


async function openEditPopUp(event) {
    document.getElementById("editContent").style.display = 'flex';
    document.getElementById("editContent").classList.add('newStyling');

    document.getElementById("editCancel").addEventListener("click", async () => {
        document.getElementById('editContent').style.display = 'none';
    });

    document.getElementById("editSubmit").addEventListener("click", async () => {
        document.getElementById('editContent').submit();
    })
}


function removeEditForm() {
    document.getElementById("editContent").style.display = 'none';
}
