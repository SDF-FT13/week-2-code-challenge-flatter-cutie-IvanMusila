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
            const updatedVotes = currentCharacter.votes + newVotes;
            

            fetch(`http://localhost:3000/characters/${currentCharacter.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ votes: updatedVotes })
            })
            .then(response => response.json())
            .then(updatedCharacter => {
                currentCharacter.votes = updatedCharacter.votes;
                voteCountElement.textContent = updatedCharacter.votes;
                voteInput.value = "";
            })
            // .catch(error => console.error("Error resetting votes:", error));
    });
    

    
    resetButton.addEventListener("click", () => {
            if (!currentCharacter) return;
            
            fetch(`http://localhost:3000/characters/${currentCharacter.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ votes: 0 })
            })
            .then(response => response.json())
            .then(updatedCharacter => {
                currentCharacter.votes = updatedCharacter.votes;
                voteCountElement.textContent = updatedCharacter.votes;
            })
            // .catch(error => console.error("Error resetting votes:", error));
        });

});
