document.addEventListener("DOMContentLoaded", () => {
    const characterBar = document.getElementById("character-bar");
    const detailedInfo = document.getElementById("detailed-info");
    const nameElement = document.getElementById("name");
    const imageElement = document.getElementById("image");
    const voteCountElement = document.getElementById("vote-count");
    const voteForm = document.getElementById("votes-form");
    const voteInput = document.getElementById("votes");
    const resetButton = document.getElementById("reset-btn");
    
    let currentCharacter = null;
    
    fetch("http://localhost:3000/characters")
        .then(response => response.json())
        .then(characters => {
            characters.forEach(character => {
                const span = document.createElement("span");
                span.textContent = character.name;
                span.style.cursor = "pointer";
                span.addEventListener("click", () => displayCharacter(character));
                characterBar.appendChild(span);
            });
        });
    
    function displayCharacter(character) {
        currentCharacter = character;
        nameElement.textContent = character.name;
        imageElement.src = character.image;
        imageElement.alt = character.name;
        voteCountElement.textContent = character.votes;
    }
    
    voteForm.addEventListener("submit", event => {
        event.preventDefault();
        if (!currentCharacter) return;
        
        const newVotes = parseInt(voteInput.value) || 0;
        currentCharacter.votes += newVotes;
        voteCountElement.textContent = currentCharacter.votes;
        voteInput.value = "";
    });
    
    
    resetButton.addEventListener("click", () => {
        if (!currentCharacter) return;
        
        currentCharacter.votes = 0;
        voteCountElement.textContent = 0;
    });
});
