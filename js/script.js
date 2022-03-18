"use strict";

// model
function ManModel() {
    this.posX = 50;
    this.posY = 50;
    this.isRun = false;
    let myView = null;

    this.start = function (view) {
        myView = view;
    };

    this.updateView = function () {
        if (myView) {
            myView.update();
        }
    };

    this.shift = function (x, y) {
        this.posX += (this.isRun ? 30 : 5) * x;
        this.posY += (this.isRun ? 30 : 5) * y;
        this.updateView();
    };

    this.setRun = function (r) {
        this.isRun = r;
        this.updateView();
    };
};

// view
function ManViewWebPage() {

    let myModel = null;
    let myField = null;
    let runCheckbox = null;
    let manDiv = null;

    this.start = function (model, field) {
        myModel = model;
        myField = field;

        runCheckbox = myField.querySelector(".SRun");
        manDiv = myField.querySelector(".SMan");
    };

    this.update = function () {
        runCheckbox.checked = myModel.isRun;
        manDiv.style.left = myModel.posX + "px";
        manDiv.style.top = myModel.posY + "px";
    };
};

// controller
function ManControllerButtons() {
    let myModel = null;
    let myField = null;
    let runCheckbox = null;
    let mySaveParam = null;

    this.start = function (model, field, SaveParam) {
        myModel = model;
        myField = field;
        mySaveParam = SaveParam;

        runCheckbox = myField.querySelector(".SRun");
        runCheckbox.addEventListener("change", this.runChanged);

        const buttonUp = myField.querySelector(".SUp"),
            buttonDown = myField.querySelector(".SDown"),
            buttonLeft = myField.querySelector(".SLeft"),
            buttonRight = myField.querySelector(".SRight"),
            buttonSave = myField.querySelector(".save"),
            buttonClear = myField.querySelector(".clear");

        buttonUp.addEventListener("click", this.shiftUp);
        buttonDown.addEventListener("click", this.shiftDown);
        buttonLeft.addEventListener("click", this.shiftLeft);
        buttonRight.addEventListener("click", this.shiftRight);
        buttonSave.addEventListener("click", this.funSave);
        buttonClear.addEventListener("click", this.funClear);
    };

    this.shiftLeft = function () {
        myModel.shift(-1, 0);
    };

    this.shiftRight = function () {
        myModel.shift(1, 0);
    };

    this.shiftUp = function () {
        myModel.shift(0, -1);
    };

    this.shiftDown = function () {
        myModel.shift(0, 1);
    };

    this.runChanged = function () {
        if (myModel) {
            myModel.setRun(runCheckbox.checked);
        }
    };

    this.funSave = function () {
        mySaveParam.setLoc(myModel);
    };

    this.funClear = function () {
        let manSaved = JSON.parse(localStorage[mySaveParam.save]);
        manSaved.posX = 50;
        manSaved.posY = 50;
        manSaved.isRun = false;
        mySaveParam.setLoc(manSaved);
        mySaveParam.getLoc(myModel);
        myModel.updateView();
    };
}

function LocalStorage(save) {
    this.save = save;

    this.setLoc = function (man) {
        localStorage[this.save] = JSON.stringify(man);
    };

    this.getLoc = function (man) {
        if (localStorage[this.save] != null) {
            let manSaved = JSON.parse(localStorage[this.save]);
            man.posX = manSaved.posX;
            man.posY = manSaved.posY;
            man.isRun = manSaved.isRun;
        }
    };
}

// настройка, инициализация 1st

let man = new ManModel();
let view = new ManViewWebPage();
let controller = new ManControllerButtons();
let saveParam1 = new LocalStorage("save");

let containerElem = document.getElementById("IManContainer");
man.start(view);
view.start(man, containerElem, saveParam1);
controller.start(man, containerElem, saveParam1);
// первичное отображение Model во View
saveParam1.getLoc(man);
man.updateView();

// настройка, инициализация 2nd

let man1 = new ManModel();
let view1 = new ManViewWebPage();
let controller1 = new ManControllerButtons();
let saveParam2 = new LocalStorage("save1");

let containerElem1 = document.getElementById("IManContainer1");
man1.start(view1);
view1.start(man1, containerElem1, saveParam2);
controller1.start(man1, containerElem1, saveParam2);

// первичное отображение Model во View
saveParam2.getLoc(man1);
man1.updateView();
