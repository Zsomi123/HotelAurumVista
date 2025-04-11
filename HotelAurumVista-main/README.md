Projekt Áttekintés

Az Aurum Vista Hotel projekt egy teljes körű szállodai rendszer, amely lehetővé teszi a szobafoglalást, éttermi asztalfoglalást, felhasználói fiók kezelést, valamint adminisztrációs funkciókat. A rendszer modern webes technológiákat használ a felhasználói élmény és a hatékony üzemeltetés érdekében.

Felhasznált Technológiák:
  
  * Node.js - Szerver oldali JavaScript futtatókörnyezet
  * Express.js - Backend API keretrendszer
  * React - Frontend könyvtár a felhasználói felület kialakításához
  * MySQL - Adatbázis kezelő rendszer
  * Bootstrap - Reszponzív design keretrendszer
  * Selenium - Automatizált teszteléshez

Első Lépések
Előfeltételek
A projekt futtatásához szükséged lesz a következőkre:

* Node.js (v14.x vagy újabb)
* npm (v6.x vagy újabb)
* MySQL (v8.x vagy újabb)

Telepítés:

1. Klónozd le a repository-t:

       git clone https://github.com/Zsomi123/HotelAurumVista.git

2. Telepítsd a szerver oldali függőségeket:

       cd api
       npm install

3. Telepítsd a kliens oldali függőségeket:

        cd client
        npm install

4. Állítsd be az adatbázist:

* Hozz létre egy MySQL adatbázist
* Importáld az adatbázis sémát a mellékelt SQL fájlból
* Állítsd be a kapcsolódási adatokat a api/models/db.js fájlban

5. Indítsd el a szervert:

       cd api
       npm start

6. ndítsd el a kliens alkalmazást:

        cd client
        npm start
A böngészőben nyisd meg a http://localhost:3001 címet


Funkciók
Felhasználói Funkciók
* Regisztráció és bejelentkezés: Felhasználók regisztrálhatnak és bejelentkezhetnek a rendszerbe
* Szobafoglalás: Felhasználók szobákat foglalhatnak különböző időpontokra
* Éttermi asztalfoglalás: Felhasználók asztalt foglalhatnak a szálloda éttermében
* Wellness szolgáltatások: Információk a wellness részlegről és szolgáltatásokról
* Felhasználói profil: Felhasználók megtekinthetik és kezelhetik foglalásaikat
* Pontrendszer és kuponok: Hűségpontok gyűjtése és beváltása kuponokra
  
Admin Funkciók

* Dashboard: Statisztikák és áttekintés a szálloda működéséről
* Szobakezelés: Szobák hozzáadása, módosítása és törlése
* Foglalások kezelése: Foglalások áttekintése és kezelése
* Felhasználók kezelése: Felhasználói fiókok kezelése

Készítette: Péter Kristóf Levente, Jakab Zsombor - 2025.04.10
