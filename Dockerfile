# Étape 1: Utiliser une image de base Node
FROM node:16-alpine

# Étape 2: Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Étape 3: Copier les fichiers de définition de dépendances
COPY package*.json ./

# Étape 4: Installer les dépendances
RUN npm install

# Étape 5: Copier tous les fichiers sources dans le conteneur
COPY . .

# Étape 6: Compiler le code TypeScript en JavaScript
RUN npm run build

# Étape 7: Exposer le port sur lequel l'application va tourner
EXPOSE 3000

# Étape 8: Définir la commande pour démarrer l'application
CMD ["node", "dist/src/main"]

# Étape 9: Copier le script de démarrage dans le conteneur
#COPY start.sh /usr/src/app/start.sh

# Étape 10: Rendre le script exécutable et l'utiliser comme point d'entrée
#RUN chmod +x /usr/src/app/start.sh
#ENTRYPOINT ["/usr/src/app/start.sh"]