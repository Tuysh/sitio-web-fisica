function setshowFl(e) {
  showFl = e.srcElement.checked;
}
function setConstant(k) {
  if (modeA == 0) {
    G = k;
  } else {
    K = k;
  }
}
function setParAtt(inp, val) {
  let att = inp.classList[0];
  let p = inp.parentNode.parentParticle;
  if (typeof p[att] == 'number' || typeof p[att] == 'string') {
    p[att] = val;
    let inputs = inp.parentNode.getElementsByClassName(att);
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = val;
    }
  } else if (typeof p[att] == 'boolean') {
    if (val) {
      let spdIn = inp.parentNode.getElementsByClassName('spd');
      console.log(inp.parentNode.parentNode);
      for (let i = 0; i < spdIn.length; i++) {
        spdIn[i].style.display = 'none';
      }
    } else {
      let spdIn = inp.parentNode.getElementsByClassName('spd');
      for (let i = 0; i < spdIn.length; i++) {
        spdIn[i].style.display = 'block';
      }
    }
    p[att] = val;
  } else if (typeof p[att] == 'object') {
    p[att][inp.classList[1]] = parseInt(val);
  }

}

function addPar(e) {
  let nP = new Particle(e.clientX, e.clientY, 10000000, 1, false, particles.length);
  nP.infoDiv = document.createElement('div');
  nP.infoDiv.parentParticle = nP;
  particles.push(nP);
  document.getElementById('stats').appendChild(nP.infoDiv);
  setInfoDiv(pause);
}

function particleData(particleNum, particleAcc) {
  this.particleNum = particleNum;
  this.particleAcc = particleAcc;
}

function keyPressed(e) {
  console.log(e.keyCode)
  if (e.keyCode == 101) {
    showFl = !showFl;
    document.getElementById("campo").checked = showFl
  }
  if (e.keyCode == 13) {
    var sideNav = document.getElementById("sideNav");
    //sideNav.appendChild(div);
    if (sideNav.classList.contains('open')) {
      sideNav.classList.remove('open');
      sideNav.classList.add('closed');
    } else {
      sideNav.classList.remove('closed');
      sideNav.classList.add('open');
      btn - square.classList.add('clos');
    }
  } else if (e.keyCode == 32) {
    pause = !pause;
    setInfoDiv(pause);
  }
}
function updateData() {
  if (!pause) {
    document.getElementById('stats').childNodes.forEach((n, index) => {
      let p = n.parentParticle;
      n.innerHTML = `
            <div class="particulas">Partícula no. ${p.id + 1}</div><br>
            Se mueve: <b>${p.isStatic ? "no" : "sí"} </b><br>
            Carga: <b>${p.q}</b> <br>
            ${!p.isStatic ? `<div class="particulas">Velocidad:</div><br> X: ${p.spd.x.toFixed(3)} <br> Y: ${p.spd.y.toFixed(3)} <br>` : ``}
        `;

    });
  }
}

function setInfoDiv(pau) {
  if (pau) {
    particles.forEach((p) => {
      p.infoDiv.innerHTML = `
                <div class="particulas">Partícula no. ${p.id + 1}</div><br>
                Se mueve: <input type='checkbox' class='isStatic' onchange='setParAtt(this,this.checked)' /><br>
                <div class="particulas">Carga:</div><br>
                <input type='range' class='q' step='0.01' min='-3' max='3' value='${p.q}' oninput='setParAtt(this,this.value)' />
                <input type='text' class='q' value='${p.q}' onkeyup='setParAtt(this,this.value)' /><br><br>
                Posición en X:<br>
                <input type='number' class='pos x' value='${p.pos.x.toFixed(3)}' onkeyup='setParAtt(this,this.value)' /><br>
                Posición en Y:<br>
                <input type='number' class='pos y' value='${p.pos.y.toFixed(3)}' onkeyup='setParAtt(this,this.value)' /><br>
                <p class='spd'>Velocidad en X:</p>
                <input type='number' class='spd x' value='${p.spd.x.toFixed(3)}' onkeyup='setParAtt(this,this.value)' /><br>
                <p class='spd'>Velocidad en Y:</p>
                <input type='number' class='spd y' value='${p.spd.y.toFixed(3)}' onkeyup='setParAtt(this,this.value)' /><br>
                <br>
                    <input type='button' class='isDead borrar' value='Borrar' onclick='setParAtt(this, true)'>
				<br>
            `;
    });
  }
}
let intervalId; // Variable para almacenar el ID del setInterval
let fps = 30;

function initializeSimulation() {
  intervalId = setInterval(draw, 1000 / fps); // Establece el intervalo por defecto
}

// Función para cambiar el FPS
function changeFPS(val) {
  fps = parseInt(val); // Convertir el valor del input range a un número
  document.getElementById('fpsValue').innerText = fps; // Actualizar el texto del FPS actual

  clearInterval(intervalId); // Limpiar el intervalo anterior
  intervalId = setInterval(draw, 1000 / fps); // Establecer el nuevo intervalo
}
