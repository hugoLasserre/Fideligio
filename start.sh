#!/bin/sh

# Attendre que la base de données soit prête
echo "Attente de la base de données..."
while ! pg_isready -h db -p 5432 -U fideligio-user; do
    sleep 2
done

# Exécuter la migration
echo "Exécution de la migration..."
npm run migration:run

# Démarrer l'application
echo "Démarrage de l'application..."
npm start
