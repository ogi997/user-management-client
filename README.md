# User management 

## Kljucne funkcionalnosti:
<ol>
  <li><em>Autentifikacija i autorizacija:</em></li>
  <ul>
    <li>Korisnici se mogu prijaviti i odjaviti. <p>- Prilikom prijave korisnika za sistem izdaju se dva JWT tokena (access i refresh).</p></li>
    <li>Podrska za razlicite uloge koje odredjuju pristup funkcionalnostima unutar aplikacije.</li>
  </ul>
  <p> </p>
  <li><em>Upravljanje korisnicima</em></li>
  <ul>
    <li>Dodavanje i brisanje korisnika</li>
  </ul>
  <p> </p>
  <li><em>Upravljanje ulogama (samo korisnik sa ADMIN ulogom)</em></li>
    <ul>  
      <li>Dodavanje i brisanje uloga.</li>
      <li>Dodjela postojece uloge korisniku.</li>
  </ul>
</ol>
<p>Implementirane su mogucnosti promjene lozinke korisnika: korisnik moze samovoljno da promjeni lozinku (change password), promjena lozinke ukoliko je korisnik zaboravio lozinku (forgot password), te mogucnost reseta lozinke (reset password)</p>

## Tehnicka implementacija
<ol>
  <li>Frontend (Angular 17)</li>
  <ul>
    <li>Komponente: Modularna struktura koja koristi Angular komponente (standalone)</li>
    <li>Servisi: Angular servisi za upravljanje HTTP zahtjevima</li>
    <li>Routing: Angular Router za navigaciju izmedju razlicitih dijelova aplikacije kao sto su stranice za prijavu, registraciju, listu svih korisnika itd.</li>
    <li>...</li>
  </ul>
  <li>Backend (Custom server aplikacija)</li>
  <ul><li>https://github.com/ogi997/user-management-serverapp</li></ul>
</ol>

## Integracija
<p>Angular frontend aplikacija komunicira sa backend serverom preko REST APIja. Svi zahtjevi se obavljaju putem HTTP zahtjeva.</p>
