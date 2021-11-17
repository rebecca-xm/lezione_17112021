import { render, API } from "./utils.js";

const list = (data) => {                                           // list riceverà un array di dati
    const elements = data
        .map(item => `<li>
        <a href="#view-${item.id}">${item.title}</a> - ${item.year}
        <a class="edit" href="#edit-${item.id}"">✏️</a></li>
        <button class="delete" id="${item.id}">x</button></li>`)
        .join('');

    const container = document.querySelector("#container");
    render(
        container,
        `
        <p>Elenco schede film</p>
        <ul>${elements}</ul>
        <a href="#add" id="add">Aggiungi una nuova scheda</a>
    `
    );

    const btns = [...document.querySelectorAll(".delete")];     
    btns.forEach((btn) => {                                        
        btn.addEventListener("click", (event) => {
            const id = parseInt(event.target.id);
            const filtered = data.filter(movie => movie.id !== id);
            list(filtered);

            fetch(`${API}/${id}`, {method: "DELETE"});
        },
            { once: true }
        );
    });
};

export { list };