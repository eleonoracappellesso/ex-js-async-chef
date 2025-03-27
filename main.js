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
*/


async function getChefBirthday(id) {
    try {
        const response = await fetch(`https://dummyjson.com/recipes/${id}`);
        const recipe = await response.json();

        const userResponse = await fetch(`https://dummyjson.com/users/${recipe.userId}`);
        const user = await userResponse.json();

        return user.birthDate;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

(async () => {
    try {
        const birthday = await getChefBirthday(1);
        console.log("Il compleanno dello chef è:", birthday);
    } catch (error) {
        console.error(error.message);
    }
})();