Feature: Page d'accueil
    En tant que profil autorisé, je souhaite pouvoir afficher la page d'accueil

    @RG1
    Scenario: Affichage de la page d'accueil
        Given Je suis un utilisateur connu et connecté avec le profil "Admin"
        When J'accède à la page accueil
        Then un titre "Bienvenue sur la démo du starter Slash Design System" est visible
