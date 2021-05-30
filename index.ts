// @ts-ignore
import clapSrc from "url:./121.wav";

const GLOBAL_SPEAK_ENABLED =
  new URL(location.href).searchParams.get("speak") !== "false";

function pad2(n: number): string {
  return n.toString().padStart(2, "0");
}

class AutoDate extends HTMLElement {
  connectedCallback() {
    this.animFrame();
  }

  animFrame() {
    if (!this.isConnected) {
      return;
    }
    const date = new Date();
    this.textContent = `${date.getFullYear()}-${pad2(
      date.getMonth() + 1
    )}-${pad2(date.getDate())}`;
  }
}

customElements.define("auto-date", AutoDate);

class AutoTime extends HTMLElement {
  connectedCallback() {
    this.animFrame();
  }

  animFrame() {
    if (!this.isConnected) {
      return;
    }
    const date = new Date();
    this.textContent = `${pad2(date.getHours())}:${pad2(
      date.getMinutes()
    )}:${pad2(date.getSeconds())}.${pad2(
      Math.floor(date.getMilliseconds() / 10)
    )}`;
    requestAnimationFrame(() => this.animFrame());
  }
}

customElements.define("auto-time", AutoTime);

class SceneTake extends HTMLElement {
  take: number;

  constructor() {
    super();
    try {
      this.take = parseInt(localStorage["clapperboard-take"]);
      if (isNaN(this.take)) {
        this.take = 1;
      }
    } catch (e) {
      this.take = 1;
    }
  }

  connectedCallback() {
    this.textContent = (this.take + 1).toString() + " 🔜 ";
    document.body.addEventListener("click", () => this.incrementTake(true));
  }

  incrementTake(speak: boolean = true) {
    this.take++;
    this.textContent = this.take.toString();
    localStorage["clapperboard-take"] = this.take;

    if (GLOBAL_SPEAK_ENABLED && speak) {
      console.log(speak);
      window.speechSynthesis.speak(
        new SpeechSynthesisUtterance(`Take ${this.take}`)
      );
    }

    document.body.animate([{ opacity: "0", offset: 0 }], {
      duration: 200,
    });

    // clap();
  }
}

customElements.define("scene-take", SceneTake);

let clapElem: HTMLAudioElement;
function newClapElem() {
  clapElem = document.createElement("audio");
  clapElem.src = clapSrc;
  clapElem.preload = "true";
}
newClapElem();
function clap() {
  clapElem.play();
  newClapElem();
}
