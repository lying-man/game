
"use strict";

//preloader
const preloader = document.querySelector(".preloader");

window.addEventListener("load", () => {
    preloader.style.opacity = "0";
    setTimeout( () => {
        preloader.remove();
    }, 300 );
});


//игровые данные
let nicknameUser = "User";
let userAvatar = "Images/Image for game/defaultuser-image.svg";
let statWinsIndex = 0;
let statLoseIndex = 0;

//возвращение старых данных пользователю
if (localStorage.length) {
    nicknameUser = localStorage.getItem("username");
    userAvatar = localStorage.getItem("userimage");
    statWinsIndex = localStorage.getItem("statwins")
    statLoseIndex = localStorage.getItem("statlose");
}

console.log(localStorage.getItem("username"));

//элементы для игровых данных
const userNameScore = document.querySelector(".title-score-user");
const processUserName = document.querySelector(".title-process-user");
const userImage = document.querySelector(".user-avatar-image");
const userImageScore = document.querySelector(".score-user-image");
const imageProcessGame = document.querySelector(".image-user-process");

let inWindow = false;
let disableButtonAction = 0;

const actionsUser = document.querySelector(".actions-user");
let actionTargets = actionsUser.children;
const submitAction = document.querySelector(".submit-action");


//кнопки соответсвующие игровым элементам
let stone = document.querySelector(".actions-user .stone");
let paper = document.querySelector(".actions-user .paper");
let scissors = document.querySelector(".actions-user .scissors");

//кнопка открытия подсказки
const openModalHint = document.querySelector(".hint-by-game");


//выбранный элемент пользователя
let chooseSign;

//выбранный элемент компьютера
let randomGameSign;

let choicePC;
let choiceUser;

//иконки выбора пользователя
const chooseIcon = document.querySelectorAll(".icon-choose-user");

//score user
const userScore = document.querySelector(".user-score");
const computerScore = document.querySelector(".computer-score");

//элементы показа победителя
const processGameWindow = document.querySelector(".process-game");
const chooseIconUser = document.querySelector(".bgc-image-user");
const chooseIconComputer = document.querySelector(".bgc-image-computer");
const blockAttack = document.querySelectorAll(".block-attack");

//окно показа конечного победителя
const modalWinner = document.querySelector(".modal-winner");
const titleModalWinner = document.querySelector(".winner-title");
const modalWinnerAvatar = document.querySelector(".winner-icon-item");

//фото игрока
const arrayUserPicture = ["Images/Image for game/defaultuser-image.svg",];
const computerPicture = "Images/Image for game/computer-image.svg";
let userPicture = arrayUserPicture[0];

//блок статистики игрока
const statistic = document.querySelector(".statistic-block");
const btnCloseStat = document.querySelector(".btn-close-stat");

//цифры побед и поражений
const statWins = document.querySelector(".stat-wins");
const statLose = document.querySelector(".stat-lose");

statLose.textContent = statLoseIndex;
statWins.textContent = statWinsIndex;

//элементы профиля игрока
const profile = document.querySelector(".profile-block");
const btnCloseProfile = document.querySelector(".btn-close-profile");
const nameInputUser = document.querySelector(".choose-block-name");
const nameInputTitle = document.querySelector(".choose-name-user");
const inputElemUser = document.querySelector(".choose-name-field");
const btnSubmitName = document.querySelector(".submit-choose-name");
const imagesChoiceUser = document.querySelector(".choose-block-img");
const profileUserImage = document.querySelector(".user-profile-img");

//отправка сообщения
const myForm = document.querySelector("form");
const messageUser = document.querySelector(".write-author-block");
const btnCloseMessage = document.querySelector(".btn-close-message");
const inpWriteMessage = document.querySelector(".inp__write-name");
const textWriteMessage = document.querySelector(".message-user");

//profile user buttons
const profileControls = document.querySelector(".menu-proile");

//подсказка для автарок
const hinForAvatars = document.querySelector(".hint-for-avatars");

//о игре
const aboutGame = document.querySelector(".about-game");
const aboutGameClose = document.querySelector(".close-about-game");

imageProcessGame.src = userAvatar;
userImage.src = userAvatar;
userImageScore.src = userAvatar;
profileUserImage.src = userAvatar;

userNameScore.textContent = nicknameUser;
processUserName.textContent = nicknameUser;
nameInputTitle.textContent = nicknameUser;

//game
const INDEX_ENDGAME = 3; //поменяй потом
const gameSigns = ["камень", "ножницы", "бумага"];
//элементы идут по порядку камень -- бумага -- ножницы 
const chooseIconArr = ["Images/Image for game/rock.svg", "Images/Image for game/notes.svg", "Images/Image for game/scissors.svg",];

// ВАЖНО белый фон работает, но на секунду, то есть он срабатывает и тут же исчезает, интересно почему?


//выбор элемента в игре
actionsUser.addEventListener("click", (event) => {
    let target = event.target;

    if (!target.classList.contains("actions-user-item")) {
        return;
    }

    for (let elem of actionTargets) {
        
        if (elem.classList.contains("choose-user-action")) {
            elem.classList.remove("choose-user-action");
        }

    }

    target.classList.add("choose-user-action");

    if (target.classList.contains("stone")) {

        for (let elem of chooseIcon) {

            if (elem.classList.contains("stone")) {
                elem.classList.add("icon-choose-active");

                setTimeout( () => elem.classList.add("icon-choose-animate"), 0 );
            } else {
                elem.classList.remove("icon-choose-animate");

                setTimeout( () => elem.classList.remove("icon-choose-active"), 300 );
            }

        }

    } else if (target.classList.contains("paper")) {

        for (let elem of chooseIcon) {

            if (elem.classList.contains("paper")) {
                elem.classList.add("icon-choose-active");

                setTimeout( () => elem.classList.add("icon-choose-animate"), 0 );
            } else {
                elem.classList.remove("icon-choose-animate");

                setTimeout( () => elem.classList.remove("icon-choose-active"), 300 );
            }

        }

        //если ножницы
    } else {
        for (let elem of chooseIcon) {

            if (elem.classList.contains("scissors")) {
                elem.classList.add("icon-choose-active");

                setTimeout( () => elem.classList.add("icon-choose-animate"), 0 );
            } else {
                elem.classList.remove("icon-choose-animate");

                setTimeout( () => elem.classList.remove("icon-choose-active"), 300 );
            }

        }
    }

});

submitAction.addEventListener("click", (event) => {

    let element;

    for (let elem of actionTargets) {

        if (elem.classList.contains("choose-user-action")) element = elem;

    }

    if (!element) {
        return;
    }

    //блокировка кнопки
    if (disableButtonAction) {
        return;
    }

    disableButtonAction = 1;

    if (element.classList.contains("stone")) {
        chooseSign = "камень";
        choiceUser = 1;
    } else if (element.classList.contains("paper")) {
        chooseSign = "бумага";
        choiceUser = 2;
    } else {
        chooseSign = "ножницы";
        choiceUser = 3;
    }

    //получение победителя
    definiteUser();

   setTimeout( () => disableButtonAction = 0, 300 );

});


//определение победителя
function definiteUser() {
    randomGameSign = gameSigns[Math.round(Math.random() * gameSigns.length)];

    if (randomGameSign === "камень") {
        choicePC = 1;
    } else if (randomGameSign === "бумага") {
        choicePC = 2;
    } else {
        choicePC = 3;
    }

    if (chooseSign === randomGameSign) {
        showWinner(choiceUser, choicePC);
        getScore("nobody");
        return;
        // alert("Ничья");
    }

    //главный игровой процесс
    //если у пк камень
    if (choicePC === 1) {

        if (choiceUser === 2) {
            // alert("Победил пользователь");
            showWinner(choiceUser, choicePC);
            getScore("user");
            return;
        }

        if (choiceUser === 3) {
            // alert("Победил компьютер");
            showWinner(choiceUser, choicePC);
            getScore("computer");
            return;
        }

    }

    //если у пк бумага
    if (choicePC === 2) {

        if (choiceUser === 1) {
            // alert("Победил компьютер");
            showWinner(choiceUser, choicePC);
            getScore("computer");
            return;
        }

        if (choiceUser === 3) {
            // alert("Победил пользователь");
            showWinner(choiceUser, choicePC);
            getScore("user");
            return;
        }

    }

    //если у пк ножницы
    if (choicePC === 3) {

        if (choiceUser === 1) {
            // alert("Победил пользователь");
            showWinner(choiceUser, choicePC);
            getScore("user");
            return;
        }

        if (choiceUser === 2) {
            // alert("Победил компьютер");
            showWinner(choiceUser, choicePC);
            getScore("computer");
            return;
        }

    }

}

//присуждение очков

let scoreIndexComputer = 0;
let scoreIndexUser = 0;

function getScore(result) {

    if (result === "nobody") {
        return;
    } 

    if (result === "computer") {
        scoreIndexComputer++;

        if (scoreIndexComputer === INDEX_ENDGAME) {
            scoreIndexComputer = 0;
            scoreIndexUser = 0; 
            computerScore.textContent = scoreIndexComputer;
            userScore.textContent = scoreIndexUser;
            statLoseIndex++;
            statLose.textContent = statLoseIndex;

            localStorage.setItem("statlose", statLoseIndex);

            setTimeout(showEndWinner, 1300, "computer");
            return;
        }

        computerScore.textContent = scoreIndexComputer;
        return;
    } 

    if (result === "user") {
        scoreIndexUser++;

        //как идея, не добавлять кнопки закрытия окна показа победителя
        if (scoreIndexUser === INDEX_ENDGAME) {
            scoreIndexComputer = 0;
            scoreIndexUser = 0; 
            computerScore.textContent = scoreIndexComputer;
            userScore.textContent = scoreIndexUser;
            statWinsIndex++;
            statWins.textContent = statWinsIndex;

            localStorage.setItem("statwins", statWinsIndex);

            setTimeout(showEndWinner, 1300, "user"); 
            return;
        }

        userScore.textContent = scoreIndexUser;
        return;
    }

}

//показ победителя (в конце раунда) ----------------------------------------------
function showEndWinner(endWinner) {

    if (endWinner === "computer") {
        modalWinnerAvatar.src = computerPicture;
        titleModalWinner.textContent = "Выиграл компьютер";

    } else {
        modalWinnerAvatar.src = userAvatar;
        titleModalWinner.textContent = `Выиграл ${nicknameUser}`;
    }

    overlayModalHint.classList.add("overlay-hint-active");
    modalWinner.classList.add("modal-winner-active");

    setTimeout( () => {
        modalWinner.classList.remove("modal-winner-active");
        overlayModalHint.classList.remove("overlay-hint-active");
    }, 1300 );

}

//показ победителя
function showWinner(choiceUser, choicePC) {

    //for PC
    if (choicePC === 1) {
        chooseIconComputer.src = chooseIconArr[0];
    } else if (choicePC === 2) {
        chooseIconComputer.src = chooseIconArr[1];
    } else if (choicePC === 3) {
        chooseIconComputer.src = chooseIconArr[2];
    }

    //for user
    if (choiceUser === 1) {
        chooseIconUser.src = chooseIconArr[0];
    } else if (choiceUser === 2) {
        chooseIconUser.src = chooseIconArr[1];
    } else if (choiceUser === 3) {
        chooseIconUser.src = chooseIconArr[2];
    }

    overlayModalHint.classList.add("overlay-hint-active");
    processGameWindow.classList.add("process-game-active");

    for (let elem of blockAttack) {
        elem.classList.add("block-attack-active");
    }

    chooseIconComputer.classList.add("background-process-active");
    chooseIconUser.classList.add("background-process-active");

    setTimeout( () => {

        chooseIconComputer.classList.remove("background-process-active");
        chooseIconUser.classList.remove("background-process-active");
        
        for (let elem of blockAttack) {
            elem.classList.remove("block-attack-active");
        }

        overlayModalHint.classList.remove("overlay-hint-active");
        processGameWindow.classList.remove("process-game-active");
    
    }, 1300 );

}

//альтернативное управление
document.addEventListener("keydown", keyControls);

function keyControls(event) {

    //если в каком то окне
    if (inWindow) {
        return;
    }

    let myEventClick = new Event("click", {
        bubbles: true,
    });

    let code = event.code;

    if (code === "KeyQ") {
        stone.dispatchEvent(myEventClick);
    } else if (code === "KeyW") {
        paper.dispatchEvent(myEventClick);
    } else if (code === "KeyE") {
        scissors.dispatchEvent(myEventClick);
    }

    if (code === "Space") {
        submitAction.dispatchEvent(myEventClick);
    }

}



//модальное окно с подсказкой
const modalHint = document.querySelector(".modal-hint");
const overlayModalHint = document.querySelector(".overlay-hint");
const animateTitleHint = document.querySelector(".modal-hint-title");
const btnCloseModal = document.querySelector(".btn-close-modal");

openModalHint.addEventListener("click", () => {
    inWindow = true;
    overlayModalHint.classList.add("overlay-hint-active");
    modalHint.classList.add("modal-hint-active");
    animateTitleHint.classList.add("active-elem-move");
});

btnCloseModal.addEventListener("mousedown", () => {
    inWindow = false;
    animateTitleHint.classList.remove("active-elem-move");
    modalHint.classList.remove("modal-hint-active");
    overlayModalHint.classList.remove("overlay-hint-active");
});

//profile keyControls
profileControls.addEventListener("click", (event) => {
    let target = event.target;

    if (target.tagName !== "LI") {
        return;
    }

    //если нажата кнопка статистики
    if (target.classList.contains("statistic")) {
        inWindow = true;
        overlayModalHint.classList.add("overlay-hint-active");
        statistic.classList.add("statistic-block-active");
    }

    //если нажата кнопка профиля
    if (target.classList.contains("profile")) {
        inWindow = true;
        overlayModalHint.classList.add("overlay-hint-active");
        profile.classList.add("profile-block-active");
    }   

    //если нажата кнопка сообщения
    if (target.classList.contains("write-author")) {
        inWindow = true;
        inpWriteMessage.focus();
        overlayModalHint.classList.add("overlay-hint-active");
        messageUser.classList.add("write-author-active");
    }

    //если нажата кнопка о игре
    if (target.classList.contains("about--game")) {
        inWindow = true;
        overlayModalHint.classList.add("overlay-hint-active");
        aboutGame.classList.add("about-game-active");
    }

}); 

//кнопка закрытия статистики
btnCloseStat.addEventListener("mousedown", () => {
    inWindow = false;
    statistic.classList.remove("statistic-block-active");
    overlayModalHint.classList.remove("overlay-hint-active");
});

//кнопка закрытия профиля
btnCloseProfile.addEventListener("mousedown", () => {
    inWindow = false;
    profile.classList.remove("profile-block-active");
    overlayModalHint.classList.remove("overlay-hint-active");
    hinForAvatars.style.bottom = "-" + hinForAvatars.offsetHeight + "px";
    hinForAvatars.classList.remove("hint-avatars-active");

    localStorage.setItem("username", nicknameUser);
    localStorage.setItem("userimage", userAvatar);

});

//кнопка закрытия окна сообщения автору
btnCloseMessage.addEventListener("mousedown", () => {
    inWindow = false;
    messageUser.classList.remove("write-author-active");
    overlayModalHint.classList.remove("overlay-hint-active");
});


//скрипты для профиля
let check = 1;
nameInputTitle.addEventListener("click", () => {

    if (check === 1) {
        nameInputUser.style.maxHeight = nameInputUser.scrollHeight + "px";
        inputElemUser.focus();
        check = 0;
    } else {
        nameInputUser.style.maxHeight = "";
        inputElemUser.blur();
        check = 1;
    }

});

btnSubmitName.addEventListener("click", () => {

    if (Number(inputElemUser.value) === 0) {
        inputElemUser.value = "User";
        nameInputTitle.textContent = "User";
    }

    nameInputUser.style.maxHeight = "";
    inputElemUser.blur();
    check = 1;
});

//изменение никнейма пользователя
inputElemUser.addEventListener("input", () => {

    nameInputTitle.textContent = inputElemUser.value;

});

//получение никнейма пользователя
inputElemUser.addEventListener("change", () => {
    nicknameUser = nameInputTitle.textContent;
    userNameScore.textContent = nicknameUser;
    processUserName.textContent = nicknameUser;
});

inputElemUser.addEventListener("paste", (event) => {
    event.preventDefault();
    return;
});

//ВАЖНО закрытие модальных окон нужно делать через моус даун шоб ничё не ломалось

let lastElem;

imagesChoiceUser.addEventListener("click", (event) => {
    let target = event.target;

    if (!target.closest(".image-new-avatar")) {
        return;
    }

    let elem = target.closest(".image-new-avatar");

    let collectionElems = document.querySelectorAll(".image-new-avatar");

    for (let elem of collectionElems) {

        if (elem.classList.contains("image-avatar-checked")) {
            elem.classList.remove("image-avatar-checked");
        }

    }

    elem.classList.add("image-avatar-checked");
    let imageElem = elem.children[0];

    for (let i = 0; i < collectionElems.length; i++) {

        if (lastElem === target) {
            return;
        }

        //прошлый элемент для которого отыгрывалась подсказка
        lastElem = elem;

        hinForAvatars.style.bottom = "-" + hinForAvatars.offsetHeight + "px";
        hinForAvatars.classList.remove("hint-avatars-active");

        //для дэфолтного аватара
        if (elem === collectionElems[0]) {
            userAvatar = imageElem.src;
            hinForAvatars.textContent = "Аватар для простачков.";
        }

        //для чела с большой шапкой
        if (elem === collectionElems[1]) {
            userAvatar = imageElem.src;
            hinForAvatars.textContent = "Этот аватар для тебя, если ты всегда считал что твой головной убор недостаточно велик.";
        }

        //для рыцаря
        if (elem === collectionElems[2]) {
            userAvatar = imageElem.src;
            hinForAvatars.textContent = "Если вы когда-нибудь, предъвляли что-нибудь своей математичке, то этот аватар будет идеальным отражением вашей личности.";
        }

        //для принцессы
        if (elem === collectionElems[3]) {
            userAvatar = imageElem.src;
            hinForAvatars.textContent = "А вы думали я настолько глупый, что не предусмотрел возможности пацанам перевоплощаться в девушку?";
        }

        //для шейха 
        if (elem === collectionElems[4]) {
            userAvatar = imageElem.src;
            hinForAvatars.textContent = "Аватар для тех, у кого на карте есть хотя бы 2 рубля и 26 копеек.";
        }

        //для короля
        if (elem === collectionElems[5]) {
            userAvatar = imageElem.src;
            hinForAvatars.textContent = "Только для Сани.";
        }

    }

    profileUserImage.src = userAvatar;
    imageProcessGame.src = userAvatar;
    userImage.src = userAvatar;
    userImageScore.src = userAvatar;
    hinForAvatars.style.bottom = "";
    hinForAvatars.classList.add("hint-avatars-active");

    //анимация переключения изображения
    profileUserImage.classList.add("switch-image-user");
    setTimeout( () => {
        profileUserImage.classList.remove("switch-image-user");
        profileUserImage.src = imageElem.src;
    }, 200 );

});

//прикол
const messageSending = document.querySelector(".message-sending");
myForm.addEventListener("submit", (event) => {
    myForm.reset();
    messageSending.classList.add("message-sending-active");
    setTimeout( () => messageSending.classList.remove("message-sending-active"), 1500 );
    event.preventDefault();
});

aboutGameClose.addEventListener("mousedown", () => {
    inWindow = false;
    overlayModalHint.classList.remove("overlay-hint-active");
    aboutGame.classList.remove("about-game-active");
});
