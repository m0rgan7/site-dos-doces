document.addEventListener("DOMContentLoaded", () => {
  // Emojis interativos
  const emojiGroups = document.querySelectorAll(".emoji-group");

  emojiGroups.forEach(group => {
    const buttons = group.querySelectorAll(".emoji-btn");

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        // Remover seleção anterior
        buttons.forEach(btn => btn.classList.remove("selected"));
        // Adicionar seleção atual
        button.classList.add("selected");
      });
    });
  });

  // Formulário
  const form = document.getElementById("feedbackForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const melhorias = document.getElementById("melhorias").value;
    const elogios = document.getElementById("elogios").value;

    const respostas = {
      sabor: getEmojiValue("sabor"),
      variedade: getEmojiValue("variedade"),
      atendimento: getEmojiValue("atendimento"),
      melhorias,
      elogios
    };

    console.log("Feedback enviado:", respostas);

    alert("Obrigado pelo seu feedback! 💜");

    form.reset();
    document.querySelectorAll(".emoji-btn.selected").forEach(btn => btn.classList.remove("selected"));
  });

  function getEmojiValue(question) {
    const group = document.querySelector(`.emoji-group[data-question="${question}"]`);
    const selected = group.querySelector(".emoji-btn.selected");
    return selected ? selected.getAttribute("data-value") : null;
  }
});
