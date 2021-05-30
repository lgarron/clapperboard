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
      this.take = localStorage["clapperboard-take"].toString();
    } catch (e) {
      this.take = 0;
    }
    this.incrementTake();
  }

  connectedCallback() {
    document.body.addEventListener("click", () => this.incrementTake());
  }

  incrementTake() {
    this.take++;
    this.textContent = this.take.toString();
    localStorage["clapperboard-take"] = this.take;

    window.speechSynthesis.speak(
      new SpeechSynthesisUtterance(`Take ${this.take}`)
    );

    document.body.animate([{ opacity: "0", offset: 0 }], {
      duration: 200,
    });
  }
}

customElements.define("scene-take", SceneTake);
