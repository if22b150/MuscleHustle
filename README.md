# MuscleHustle
ITP Retake Project

## Backend
### Setup
#### Datenbank
XAMPP MySQL starten \
Über Console/Shell eine neue DB anlegen:
```
mysql -u root -p
CREATE DATABASE musclehustle;
```
#### Laravel Environment
Im "backend"-Ordner:
- .env.example kopieren und zu .env umbenennen, falls noch nicht vorhanden
- Bei APP_URL "http://localhost:8000" eintragen
- Bei DB_DATABASE "musclehustle" eintragen (oder wie die DB oben eben genannt wurde)
- Evtl. die Credentials für MySQL bei DB_USERNAME (default "root") und DB_PASSWORD (normalerweise nichts) eintragen
#### Laravel aufsetzen
Im "backend"-Ordner eine Console/Terminal öffnen:

```
composer install
php artisan key:generate
php artisan migrate:fresh --seed
```
#### Laravel-Backend starten
`php artisan serve`

Die Backend-Anwendung sollte nun [hier](http://127.0.0.1:8000/) aufrufbar sein.


## Frontend
### Setup
```
cd frontend
npm install
Falls vulnerabilities auftreten: npm update und npm auit fix
ng serve
```
