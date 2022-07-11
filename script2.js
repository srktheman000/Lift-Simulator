const main = document.querySelector(".main");

function generator() {
  main.innerHTML = "";
  const liftnum = document.querySelector(".lift-num-input");
  const floornum = document.querySelector(".floor-num-input");
  let liftval = parseInt(liftnum.value);
  let floorval = parseInt(floornum.value);
  let l = [];
  var floorarray = [];
  for (let i = floorval; i > 0; i--) {
    floorarray[i] = i;
    createfloor(i, l);
  }
  for (let i = 0; i < liftval; i++) {
    let obj = {
      liftnum: i + 1,
      current: 0,
      busy: false,
    };
    l.push(obj);
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
    moveup(this.id, l);
  });
  upbutton.classList.add("btn");
  buttondiv.appendChild(upbutton);

  let downbutton = document.createElement("button");
  downbutton.classList.add("down-button");
  downbutton.innerHTML = "Down";
  downbutton?.setAttribute("id", `d${i}`);
  downbutton.addEventListener("click", function (e) {
    movedown(this.id, l);
  });
  downbutton.classList.add("btn");
  buttondiv.appendChild(downbutton);
}

function createlift(i) {
  var liftdiv = document.createElement("div");
  liftdiv.classList.add("lift");
  liftdiv.style.left = `${i * 100 + 100}px`;

  const liftrightdoor = document.createElement("div");
  const liftleftdoor = document.createElement("div");

  liftrightdoor.classList.add("lift-right-door");
  liftleftdoor.classList.add("lift-left-door");

  liftdiv.appendChild(liftrightdoor);
  liftdiv.appendChild(liftleftdoor);
  main.lastChild.children[1].children[0].appendChild(liftdiv);
}

function liftfunction(liftmove, l) {
  let liftleftdoor = liftmove.children[1];
  let liftrightdoor = liftmove.children[0];
  liftleftdoor.style.width = 0 + "px";
  liftrightdoor.style.width = 0 + "px";
  liftrightdoor.style.left = "100%";
  liftrightdoor.style.transform = "translateX(-100%)";
  setTimeout(() => {
    liftleftdoor.style.width = 25 + "px";
    liftrightdoor.style.width = 25 + "px";
    console.log(l.busy);
    l.busy = false;
  }, 2000);
}

function moveup(id, l) {
  let fnum = Math.abs(parseInt(id[1]));
  for (let i = 0; i < l.length; i++) {
    let liftmove = main.lastChild.children[1].children[0].children[i];
    if (l[i].current == fnum && l[i].busy == false) {
      l[i].busy = true;
      setTimeout(() => {
        liftfunction(liftmove, l[i]);
      }, 2000);
      break;
    }
    if (l[i].current < fnum && l[i].busy == false) {
      l[i].current = fnum;
      l[i].busy = true;
      liftmove.style.transitionDuration = `${l[i].current}s`;
      liftmove.style.bottom = (l[i].current - 1) * 100 + "px";
      setTimeout(() => {
        liftfunction(liftmove, l[i]);
      }, 2000 * (l[i].current - 1));
      console.log(l);
      break;
    }
  }
}

function movedown(id, l) {
  let fnum = parseInt(id[1]);
  for (let i = 0; i < l.length; i++) {
    let liftmove = main.lastChild.children[1].children[0].children[i];
    if (l[i].current == fnum && l[i].busy == false) {
      l[i].busy = true;
      setTimeout(() => {
        liftfunction(liftmove, l[i]);
      }, 2000);
      break;
    }
    if (l[i].current > fnum && l[i].busy == false) {
      l[i].current = fnum;
      l[i].busy = true;
      liftmove.style.transitionDuration = `${l[i].current}s`;
      liftmove.style.bottom = Math.abs(l[i].current - 1) * 100 + "px";
      setTimeout(() => {
        liftfunction(liftmove, l[i]);
      }, 2000 * l[i].current);
      break;
    }
  }
}
