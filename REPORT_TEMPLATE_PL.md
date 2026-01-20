# Sprawozdanie — NotebookLM + AI Studio + Antigravity (4.12)

**Autor:** [Twoje imię i nazwisko]  
**Grupa:** [—]  
**Data:** [—]  

## 1. Cel zadania
Celem było:
1) zapoznanie się z NotebookLM i wykonanie własnego researchu (wyszukiwanie, podsumowania, prezentacja),
2) przygotowanie aplikacji wygenerowanej w Google AI Studio oraz opublikowanie jej w GitHub,
3) kontynuacja developmentu w Google Antigravity (nowa funkcjonalność/refaktor), wykonanie commita z zachowaniem zasad bezpieczeństwa (bez ekspozycji kluczy API),
4) dostarczenie linku do repozytorium oraz screenów z Antigravity.

## 2. NotebookLM — research
### 2.1. Temat
**Bezpieczne tworzenie aplikacji z LLM + workflow: NotebookLM → AI Studio → Antigravity**

### 2.2. Źródła (przykład)
W NotebookLM dodałam źródła dot. (1) generowania prezentacji w NotebookLM oraz (2) narzędzi deweloperskich AI Studio i Antigravity.

> W pracy końcowej wklej tutaj listę tytułów/źródeł z NotebookLM (np. 6–10 pozycji).

### 2.3. Przykładowe zapytania / wyszukiwanie
W NotebookLM wykonałam zapytania, m.in.:
- Jak NotebookLM generuje Slide Deck z notatek i źródeł?
- Jakie są typowe ryzyka bezpieczeństwa przy aplikacjach z LLM (klucze API, prompt injection)?
- Jakie praktyki minimalizują ryzyko wycieku sekretów w repozytorium?
- Jak usprawnić proces: research → prototyp aplikacji → development z agentem?

### 2.4. Wyniki (podsumowanie)
- NotebookLM pozwala szybko zamienić materiały źródłowe w spójne podsumowania oraz prezentację (Slide Deck) w panelu Studio.
- W aplikacjach LLM klucze API powinny pozostać po stronie backendu; na froncie używamy wyłącznie endpointów własnego serwera.
- Narzędzia typu agent-first IDE (Antigravity) przyspieszają implementację, ale wymagają ostrożnych ustawień polityk wykonywania komend oraz przeglądu zmian przed commitem.

### 2.5. Prezentacja
W Studio wygenerowałam **Slide Deck** na podstawie zgromadzonych źródeł.

> Wklej link do wyeksportowanej prezentacji lub dodaj screeny.

## 3. Google AI Studio — aplikacja
### 3.1. Opis aplikacji
Zbudowałam aplikację **„Summarizer & Action Items”**:
- użytkownik wkleja tekst,
- aplikacja zwraca streszczenie, listę działań i słowa kluczowe,
- backend wywołuje model Gemini (klucz API w `.env`),
- frontend komunikuje się z backendem przez endpoint `/api/summarize`.

### 3.2. Repozytorium GitHub
Link: **[WSTAW LINK DO REPO]**

## 4. Google Antigravity — development + commit
### 4.1. Import projektu
Projekt został otwarty w Antigravity i przeanalizowany przez agenta (plan + diff).

### 4.2. Zmiany funkcjonalne / refaktor
W Antigravity dodałam:
- **History**: zapis ostatnich wyników (localStorage),
- **Copy summary**: szybkie kopiowanie streszczenia,
- **Export Markdown**: eksport wyniku do pliku `.md`,
- drobny refaktor kodu (wydzielenie helperów, lepsza obsługa błędów).

### 4.3. Bezpieczeństwo
- Klucz API nie został umieszczony w kodzie ani w repozytorium.
- Dodano `.env` do `.gitignore`.
- W repozytorium jest wyłącznie `.env.example`.
- Przed commitem wykonano kontrolę zmian (`git status`, `git diff`).

### 4.4. Commit
Przykładowy commit:
- `feat: add history and markdown export`

## 5. Załączniki
- Screeny z Antigravity: `screens/` (np. 1) plan/artefakt, 2) diff, 3) commit)
- Screeny z NotebookLM: (źródła + slide deck)

