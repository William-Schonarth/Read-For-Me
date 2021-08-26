//Comentario para testar VS Code no Git
function speech() {
  return {
    isSpeaking: false,
    currentSpeed: 1.5,
    synth: speechSynthesis,
    utterance: null,
    text: null,
    setText(event) {
      this.text = event.currentTarget.value;
    },

    deleteText() {
      this.stop();
      document.getElementsByClassName('border border-purple-500 m-4 text-black')[0].value = '';
      this.text = null;
    },

    init() {
      this.utterance = new SpeechSynthesisUtterance();
      this.utterance.lang = "pt-BR";
      this.utterance.rate = this.currentSpeed;
      this.utterance.text = this.text;
      this.utterance.onend = this.finishedSpeak.bind(this);
    },

    speak() {
      this.isSpeaking = true;
      this.init();
      this.synth.speak(this.utterance);
    },

    stop() {
      this.isSpeaking = false;
      this.synth.cancel();
    },

    toggleSpeak() {
      if (this.text) {
        this.isSpeaking = !!this.isSpeaking;
        console.log("toggleSpeak", this.isSpeaking);
        //this.isSpeaking ? this.synth.pause() : this.synth.resume();
        this.isSpeaking ? this.stop() : this.speak();
      }
      else {
        console.log('Type a text!');
      };
    },

    speed(e) {
      if (e.key == "d") {
        this.increaseSpeed();
      }
      if (e.key == "s") {
        this.decreaseSpeed();
      }
    },

    increaseSpeed() {
      this.currentSpeed = +(this.currentSpeed + 0.1).toFixed(1);
    },

    decreaseSpeed() {
      this.currentSpeed = +(this.currentSpeed - 0.1).toFixed(1);
    },

    finishedSpeak() {
      this.isSpeaking = false;
    },
  };
}