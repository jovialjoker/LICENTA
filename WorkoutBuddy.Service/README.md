# Workout buddy

Proiect realizat pentru disciplina "Metode de dezvoltare software" din cadrul Facultății de Matematică și Informatică, Universitatea București.

Cerințele din barem sunt descrise aici [link](https://app.box.com/notes/46831554845?s=6ly7x02gnt1i3yyjb5hec4no4narasnu).

## Membrii echipei:

1. [Alexia Aldea](https://github.com/allee15)
2. [George Florea](https://github.com/jovialjoker)
3. [Sergiu Stanciu](https://github.com/Sergiu44)
4. [Dragos Teleaga](https://github.com/dragosteleaga)

## Descrierea proiectului (rezumatul tehnic al aplicației - limbajele de programare, librăriile, framework-urile folosite)

Aplicația "Workout Buddy Service" este scrisă în C#, un limbaj de programare puternic, orientat pe obiect, dezvoltat și susținut de Microsoft. C# este frecvent utilizat pentru dezvoltarea aplicațiilor web, serviciilor backend, aplicațiilor desktop și multe altele, având o sintaxă similară cu alte limbaje de programare populare, precum Java și C++.Aplicația "Workout Buddy Service" utilizează și platforma ASP.NET, care este un framework dezvoltat de Microsoft și este frecvent utilizat pentru dezvoltarea aplicațiilor web în limbajul C#.

ASP.NET permite construirea rapidă și scalabilă a aplicațiilor web prin intermediul modelului de programare bazat pe componente. Acesta oferă funcționalități puternice pentru gestionarea rutei, gestionarea cererilor și generarea dinamică a paginilor web.

----
"Workout Buddy UI" este o aplicație web revoluționară ce utilizează tehnologiile Next.js și Material UI pentru a oferi o experiență de antrenament deosebită.

Next.js este un cadru de dezvoltare React ce permite construirea aplicațiilor web rapide și scalabile. Această tehnologie aduce îmbunătățiri semnificative în performanță și încărcarea rapidă a paginilor, oferind o experiență fluidă utilizatorilor. De asemenea, Next.js facilitează construirea unei arhitecturi robuste și ușor de menținut pentru aplicații complexe.

Material UI este o bibliotecă de componente React ce pune la dispoziție un set vast de elemente de interfață predefinite, inspirate de designul vizual al Google Material Design. Această bibliotecă ajută la crearea unei interfețe moderne și atrăgătoare, cu o estetică curată și coerentă. Material UI oferă componente vizuale bine definite și personalizabile, precum butoane, bare de navigare, căsuțe de dialog și multe altele, ușurând munca dezvoltatorilor și asigurând un aspect vizual plăcut utilizatorilor.

----
## Descrierea proiectului (rezumatul non-tehnic al aplicației - user stories, crearea backlog-ului, lista de feature-uri)

### 1. User stories

1. As a developer, I have created the add/insert page for Exercise so that everyone will have the ability to propose exercise that can be added in our application;
2. As a developer, I have created a reusable Exercise card which will wrap all the information about the pending-exercises that have been recommended by the users of the application;
3. As a developer, I have created the pending-exercises page so that the admin will be available to accept/reject possible exercises recommended by other users;
4. As a developer, I have created a basic layout that will be rendered in all admin pages so that the admins of our application will be aware of all the possible features that are available to them;
5. As a developer, I have created a pop up/notification component which will be displayed, showing an error/success message whenever there is the case;
6. As a developer I have created a Loader component which will be displayed when the app is loading and waiting for data to be retrieved/sent;
7. As a developer, I have created the login page and I have added 1 form: login, which will be responsible for authenticating the user into our application;
8. As a developer, I have created 3 buttons which will be responsible for navigation between authentication pages: login and register pages;
9. As a developer, I have created the landing page for admin dashboard in which all the information/details about the admin will be rendered/displayed;
10. As a developer, I have created the view page for a single Exercise so that I can see a detailed page for the exercise I am really interested in;

### 2. Crearea Backlog-ului
Pentru a monitoriza activitatea echipei Workout Buddy și status-ul întregului backlog, am folosit Jira. Link-ul cu toate ticketele/task-urile create se afla aici: [Jira](https://broofs.atlassian.net/jira/core/projects/WOR/issues/?filter=allissues)

![image](https://github.com/WorkoutBuddyMDS/workout-buddy.service/assets/75164603/87ef386c-6d77-4973-b201-38fa19fee3de)
![image](https://github.com/WorkoutBuddyMDS/workout-buddy.service/assets/75164603/c3e3b87d-f714-42cd-91c4-6b9603220381)

### Structura proiectului
Proiectul este împărțit în mai multe module, care includ:

- Backend.BusinessLogic: Acest modul conține logica de afaceri a aplicației. Aici sunt implementate funcționalitățile pentru gestionarea rutinelor de antrenament și a exercițiilor, inclusiv operații de creare, vizualizare, actualizare și ștergere.

- Backend.Common: Acest modul conține infrastructura comună necesară pentru funcționarea aplicației. Include funcții, clase și alte componente reutilizabile care sunt utilizate în diferite părți ale proiectului.

- Backend.DataAccess: Acest modul este responsabil de gestionarea accesului la date. Aici sunt implementate funcționalitățile de interacțiune cu baza de date pentru a stoca și recupera informațiile despre utilizatori, rutinele de antrenament și exercițiile.

- Backend.Entities: Acest modul definește entitățile și structurile de date utilizate în cadrul aplicației. Aici sunt definite modelele de date pentru utilizatori, rutinele de antrenament, exercițiile și alte obiecte relevante.

- Backend.WebApp: Acest modul reprezintă aplicația web propriu-zisă. Aici sunt implementate endpoint-urile și rutele API-ului, gestionarea cererilor HTTP și integrarea cu celelalte module pentru a furniza funcționalitățile aplicației Workout Buddy.

Funcționalități
- Autentificare și gestionare conturi de utilizator: Aplicația oferă funcționalități pentru înregistrarea și autentificarea utilizatorilor. Aceasta permite utilizatorilor să creeze conturi, să se autentifice în sistem și să gestioneze informațiile de profil, inclusiv schimbarea parolei.

- Gestionarea rutinelor de antrenament: Utilizatorii pot crea, vizualiza, actualiza și șterge rutine de antrenament personalizate. Aceasta include adăugarea exercițiilor la rutine, stabilirea numărului de repetări și seturi, precum și planificarea zilelor de antrenament.

- Gestionarea exercițiilor: Utilizatorii pot adăuga, vizualiza, actualiza și șterge exerciții. Pentru fiecare exercițiu, pot fi specificate detalii precum numele, descrierea, grupa musculară țintă și echipamentul necesar.

- Jurnalizarea activităților utilizatorului: Aplicația înregistrează activitățile utilizatorilor, cum ar fi adăugarea sau modificarea rutinelor de antrenament, adăugarea exercițiilor sau antrenamentele finalizate. Aceasta poate ajuta utilizatorii să monitorizeze progresul și să-și urmărească activitățile anterioare.

- Securitate și autorizare: Aplicația oferă endpoint-uri securizate, care necesită autentificare și autorizare pentru a accesa resursele protejate. Aceasta asigură confidențialitatea și securitatea datelor utilizatorilor și restricționează accesul la anumite funcționalități doar pentru utilizatorii autorizați.

- Integrare cu o bază de date: Aplicația utilizează un sistem de gestionare a bazelor de date pentru a stoca și recupera datele utilizatorilor, rutinelor de antrenament și exercițiilor. Aceasta asigură persistența datelor și accesul rapid la informațiile necesare.

## Teste unitare

Testele unitare în Jest sunt utilizate pentru a verifica funcționalitatea componentelor sau unităților de cod. Snapshot tests sunt un tip de test în Jest ce verifică dacă o componentă se renderizează corect și rămâne neschimbată în timp. În cadrul aplicatiei noastre, se folosește Jest și React Testing Library pentru a crea testele unitare. In cazul de fata avem doua teste pentru componenta "ForwardRefWrapper": primul testeaza starea componentei si verifica daca si-a schimbat structura, iar cel de-al doilea a fost adaugat cu scopul verificarii unei posibile modificari in cadrul textului afla in structura componentei. Acesta este codul:

![image](https://github.com/WorkoutBuddyMDS/workout-buddy.service/assets/75164603/5b012acd-c3c4-44a0-8d1b-17d7a4d52251)

![image](https://github.com/WorkoutBuddyMDS/workout-buddy.service/assets/75164603/15e6d053-5234-42d3-a88b-e2d7bc95a8b8)

## Diagrama UML :

![WhatsApp Image 2023-06-03 at 17 26 37](https://github.com/WorkoutBuddyMDS/workout-buddy.service/assets/91975287/5202c378-db2e-477b-ba09-60add1976250)

## DEMO: 
[Link catre demo](https://www.youtube.com/watch?v=31iZq0v-0VA&ab_channel=JovialJoker)
