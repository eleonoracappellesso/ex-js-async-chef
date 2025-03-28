/*
In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id). Questa funzione accetta un id di una ricetta e deve:
- Recuperare la ricetta da https://dummyjson.com/recipes/{id}
- Estrarre la proprietà userId dalla ricetta
- Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
- Restituire la data di nascita dello chef

Note del docente:
Scrivi la funzione getChefBirthday(id), che deve:
- Essere asincrona (async).
- Utilizzare await per chiamare le API.
- Restituire una Promise con la data di nascita dello chef.
- Gestire gli errori con try/catch

🎯 Bonus 1
Attualmente, se la prima richiesta non trova una ricetta, la seconda richiesta potrebbe comunque essere eseguita causando errori a cascata.
Modifica getChefBirthday(id) per intercettare eventuali errori prima di fare la seconda richiesta.

🎯 Bonus 2
Utilizza la libreria dayjs per formattare la data di nascita nel formato giorno/mese/anno.
*/


async function getChefBirthday(id) {
    let recipe;
    try {
        const response = await fetch(`https://dummyjson.com/recipes/${id}`);
        recipe = await response.json();
    } catch (error) {
        console.error(error);
        throw new Error(`impossibile trovare la ricetta con id ${id}`);
    }

    if (recipe.message) {
        throw new Error(`impossibile recuperare la ricetta con id ${id}`);
    }

    let user;
    try {
        const userResponse = await fetch(`https://dummyjson.com/users/${recipe.userId}`);
        user = await userResponse.json();
    } catch (error) {
        console.error(error);
        throw new Error(`impossibile trovare lo chef con id ${id}`);
    }

    if (user.message) {
        throw new Error(`impossibile trovare lo chef con id ${id}`)
    }

    return user.birthDate;
}

(async () => {
    try {
        const birthday = await getChefBirthday(1);
        console.log("Il compleanno dello chef è:", birthday);
    } catch (error) {
        console.error(error.message);
    }
})();