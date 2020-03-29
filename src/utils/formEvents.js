export function formEvents(){

  var inputWrap = document.getElementsByClassName("input-wrap");
  if (inputWrap.length > 0) {
    for (var i = 0; i < inputWrap.length; i++) {
      inputWrap[i].addEventListener("focus", focus, true);
      inputWrap[i].addEventListener("blur", blur, true);
    }

    function focus() {
      this.classList.add("is-focused");
    }

    function blur() {
      var input = this.querySelector("input");
      if (input !== null && input.value === "") {
        this.classList.remove("is-focused");
      }
    }
  }

}