<script>
  import { onMount } from "svelte";
  import {
    createGrid,
    createPiece,
    draw,
    movePieceLeft,
    rotatePiece,
    movePieceRight,
    movePieceDown,
    dropPiece
  } from "./function";
  Array.prototype.current = 0;

  Array.prototype.next = function () {
    return this[++this.current % this.length];
  };
  document.body.style.overflow = "hidden";
  const words = ["svelte", "react", "vue", "angular"];
  const colors = [
    "lightblue",
    "purple",
    "orange",
    "yellow",
    "green",
    "red",
    "mediumvioletred"
  ];

  let animatedWord = words.next();
  setInterval(() => {
    animatedWord = words.next();
    document.getElementById("glicthed").style.color = colors.next();
  }, 1000);
  let canvas;
  let context;

  let grid;
  let piece;
  let time = { start: 0, elapsed: 0, level: 1000 };
  function update(timer = 0) {
    time.elapsed = timer - time.start;
    if (time.elapsed > time.level) {
      time.start = timer;
      piece = movePieceDown(grid, piece);
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    draw(context, grid, piece);
    requestAnimationFrame(update);
  }

  function test() {
    canvas = document.getElementById("tetris");
    context = canvas.getContext("2d");
    context.scale(20, 20);
    grid = createGrid();
    piece = createPiece();
    time.start = performance.now();
    requestAnimationFrame(update);
  }

  function keydown(event) {
    switch (event.keyCode) {
      case 37:
        movePieceLeft(grid, piece);
        break;
      case 38:
        rotatePiece(grid, piece);
        break;
      case 39:
        movePieceRight(grid, piece);
        break;
      case 40:
        movePieceDown(grid, piece);
        break;
      case 32:
        dropPiece(grid, piece);
        break;
    }
  }
  document.addEventListener("keydown", keydown);
  onMount(test);
</script>

<main>
  <div id="overlay">
    <canvas id="tetris" height="960" width="540" />
    <h1>
      hi i'm <span title={animatedWord} id="glicthed" class="glicthed"
        >{animatedWord}</span
      >
    </h1>
  </div>
</main>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Fira+Mono&display=swap");
  main {
    text-align: center;
    display: flex;
    width: 100vw;
    height: 100vh;
    color: #fff;
    font-size: 50px;
    font-family: "Fira Mono", monospace;
    letter-spacing: -7px;
  }

  #overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  #tetris {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  h1 {
    font-size: clamp(40px, 10vw, 100px);
    line-height: 1;
    display: inline-block;
    color: #fff;
    z-index: 2;
    letter-spacing: 10px;
    filter: drop-shadow(0 1px 3px);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  canvas {
    background: #000;
    z-index: -1;
    position: absolute;
  }

  .glicthed {
    font-family: "Press Start 2P", cursive;
    font-size: clamp(40px, 10vw, 100px);
    line-height: 1;
    display: inline-block;
    color: #fff;
    z-index: 2;
    letter-spacing: 10px;
    filter: drop-shadow(0 1px 3px);
  }
  @keyframes glitch {
    2%,
    64% {
      transform: translate(2px, 0) skew(0deg);
    }
    4%,
    60% {
      transform: translate(-2px, 0) skew(0deg);
    }
    62% {
      transform: translate(0, 0) skew(5deg);
    }
  }

  .glicthed {
    animation: glitch 1s linear infinite;
  }

  @keyframes glitch {
    2%,
    64% {
      transform: translate(2px, 0) skew(0deg);
    }
    4%,
    60% {
      transform: translate(-2px, 0) skew(0deg);
    }
    62% {
      transform: translate(0, 0) skew(5deg);
    }
  }

  .glicthed:before,
  .glicthed:after {
    content: attr(title);
    position: absolute;
    left: 0;
  }

  .glicthed:before {
    animation: glitchTop 1s linear infinite;
    clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
  }

  @keyframes glitchTop {
    2%,
    64% {
      transform: translate(2px, -2px);
    }
    4%,
    60% {
      transform: translate(-2px, 2px);
    }
    62% {
      transform: translate(13px, -1px) skew(-13deg);
    }
  }

  .glicthed:after {
    animation: glitchBotom 1.5s linear infinite;
    clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
    -webkit-clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
  }

  @keyframes glitchBotom {
    2%,
    64% {
      transform: translate(-2px, 0);
    }
    4%,
    60% {
      transform: translate(-2px, 0);
    }
    62% {
      transform: translate(-22px, 5px) skew(21deg);
    }
  }
</style>
