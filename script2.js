const main = document.querySelector(".main");
const liftnum = document.querySelector(".lift-num-input");
const floornum = document.querySelector(".floor-num-input");
let liftval = parseInt(liftnum.value);
let floorval = parseInt(floornum.value);
const liftbox = document.getElementsByClassName("liftbox");
console.log(liftbox);
liftbox[0].addEventListener("click", myFunction);
function myFunction() {
  liftbox[0].style.width = 300 + "px";
  liftbox[0].style.transitionTimingFunction = "ease-in-out";
  setTimeout(() => {
    liftbox[0].style.width = 20 + "px";
    liftbox[0].style.transitionTimingFunction = "ease-in-out";
  }, 1000);
  setTimeout(() => {
    liftbox[0].style.width = 300 + "px";
    liftbox[0].style.transitionTimingFunction = "ease-in-out";
  }, 2000);
}

function generator() {
  console.log(liftval, floorval);
  let l = new Array(liftval).fill(0);
  var floorarray = [];
  for (let i = 0; i < floorval; i++) {
    floorarray[i] = i;
    createfloor(i, l);
  }
  for (let i = 0; i < liftval; i++) {
    createlift(i);
  }
}

function createfloor(i, l) {
  let floorcontainer = document.createElement("div");
  floorcontainer.classList.add("floorcontainer");
  main.appendChild(floorcontainer);

  let buttondiv = document.createElement("div");
  buttondiv.classList.add("button");
  floorcontainer.appendChild(buttondiv);

  let floorwrapdiv = document.createElement("div");
  floorwrapdiv.classList.add("floor-wrap");
  floorcontainer.appendChild(floorwrapdiv);

  let floortopdiv = document.createElement("div");
  floortopdiv.classList.add("floor-top");
  floorwrapdiv.appendChild(floortopdiv);

  let floordiv = document.createElement("div");
  floordiv.classList.add("floor");

  floorwrapdiv.appendChild(floordiv);

  let upbutton = document.createElement("button");
  upbutton.classList.add("up-button");
  upbutton.innerHTML = "Up";
  upbutton?.setAttribute("id", `u${i}`);
  upbutton.addEventListener("click", function (e) {
    moveup(e, this.id, l);
  });
  upbutton.classList.add("btn");
  buttondiv.appendChild(upbutton);

  let downbutton = document.createElement("button");
  downbutton.classList.add("down-button");
  downbutton.innerHTML = "Down";
  downbutton?.setAttribute("id", `d${i}`);
  downbutton.addEventListener("click", function (e) {
    movedown(e, this.id, l);
  });
  downbutton.classList.add("btn");
  buttondiv.appendChild(downbutton);
}

function createlift(i) {
  var liftdiv = document.createElement("div");
  liftdiv.classList.add("lift");
  liftdiv.style.left = `${i * 100 + 100}px`;
  main.lastChild.children[1].children[0].appendChild(liftdiv);
}

function moveup(e, id, l) {
  let fnum = Math.abs(floorval - 1 - parseInt(id[1]));

  for (let i = 0; i < l.length; i++) {
    if (l[i] < fnum) {
      let liftmove = main.lastChild.children[1].children[0].children[i];
      l[i] = fnum;
      liftmove.style.width = 0 + "px";
      liftmove.style.transitionTimingFunction = "ease-in-out";
      setTimeout(() => {
        liftmove.style.width = 50 + "px";
        liftmove.style.width = 300 + "px";
        liftmove.style.transitionTimingFunction = "ease-in-out";
      }, 1000);
      setTimeout(() => {
        liftmove.style.transitionTimingFunction = "linear";
        liftmove.style.top = (floorval - l[i] - 1) * 100 + "px";
      }, 2000);

      break;
    }
  }
  console.log(fnum, l, "up", id);
}

function movedown(e, id, l) {
  let fnum = floorval - 1 - parseInt(id[1]);
  for (let i = 0; i < l.length; i++) {
    if (l[i] > fnum) {
      let liftmove = main.lastChild.children[1].children[0].children[i];
      l[i] = fnum;
      liftmove.style.top = (floorval - l[i] - 1) * 100 + "px";
      break;
    }
  }

  console.log(fnum, l, "down", id);
}
