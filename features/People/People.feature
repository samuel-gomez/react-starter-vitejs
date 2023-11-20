Feature: Page People
    En tant que profil autorisé, je souhaite pouvoir afficher la page People

    @RG1
    Scenario: Affichage de la page People
        Given Je suis un utilisateur connu et connecté avec le profil "Admin"
        And la page reçoit les données suivantes
            | _id | firstname | lastname | birthDate           | photo                                        | entity    | manager | managerId |
            | 1   | Samuel    | Gomez    | 1983-10-20T00:00:00 | https://randomuser.me/portraits/men/34.jpg   | BIOSPAN   | Sophie  | 4         |
            | 2   | John      | Doe      | 1978-10-20T00:00:00 | https://randomuser.me/portraits/men/34.jpg   | PEARLESSA | Sophie  | 4         |
            | 3   | Guillaume | Chervet  | 1985-10-20T00:00:00 | https://randomuser.me/portraits/men/34.jpg   | CIRCUM    | Sophie  | 4         |
            | 4   | Sophie    | Danneels | 1992-10-20T00:00:00 | https://randomuser.me/portraits/women/85.jpg | TRIPSCH   |         |           |
        When J'accède à la page People
        Then un titre "Tableau des gens" est visible
        And la page contient un tableau répertoriant la liste des gens
        And le tableau présente des entêtes de colonnes dans l’ordre suivant : "Prénom", "Nom", "Date de naissance", "Entité"
        And le tableau contient 4 lignes avec 4 colonnes dans l'ordre suivant :
            | firstname | lastname | birthdate  | entity    |
            | Samuel    | Gomez    | 20/10/1983 | BIOSPAN   |
            | John      | Doe      | 20/10/1978 | PEARLESSA |
            | Guillaume | Chervet  | 20/10/1985 | CIRCUM    |
            | Sophie    | Danneels | 20/10/1992 | TRIPSCH   |
