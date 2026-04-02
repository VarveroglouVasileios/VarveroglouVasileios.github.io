# Σχέδιο Μεγάλης Αναβάθμισης OrbitFolio (v2.0)

## Στόχος
Μετατροπή του portfolio από μια στατική σελίδα σε ένα διαδραστικό "Cyber-Experience" που αναδεικνύει την τεχνική υπεροχή του Βασίλειου Βαρβέρογλου.

## 1. Visual & Animation Upgrades
- **Custom Smart Cursor:** Ένα custom SVG cursor που ακολουθεί το ποντίκι και αντιδρά (scale up) σε links/buttons.
- **Decoding Text Component:** Δημιουργία ενός reusable component (`DecodedText.vue`) που θα κάνει scramble/unscramble τους τίτλους των ενοτήτων.
- **Dynamic 3D Colors:** Ενημέρωση του `Background3D.vue` ώστε να δέχεται χρώματα από το `App.vue` και χρήση `ScrollTrigger` για την ομαλή μετάβαση χρωμάτων ανά ενότητα.

## 2. Content & Branding
- **Technical Breakdowns:** Προσθήκη πεδίου `breakdown` στα projects και δημιουργία ενός modal που θα εμφανίζεται με το πάτημα του "Technical Breakdown".
- **GitHub Widget:** Ένα κομψό panel στην ενότητα των projects που θα δείχνει πραγματικά δεδομένα από το προφίλ σας (π.χ. γλώσσες, commits).
- **Security Insights:** Μια νέα ενότητα (`InsightsSection.vue`) με κάρτες που περιέχουν σύντομα security tips.

## 3. Technical & UX Enhancements
- **Security Terminal:** Ένα κρυφό overlay terminal που θα ενεργοποιείται με `Ctrl+Alt+S`, επιτρέποντας στον χρήστη να "τρέξει" εντολές (π.χ. `whoami`, `stack`, `logs`).
- **Skeleton Loaders:** Υλοποίηση shimmer effect για τις εικόνες των projects για καλύτερο perceived performance.

## Βήματα Υλοποίησης
1. **Infrastructure:** Ενημέρωση των Types και του Portfolio Data.
2. **Global Components:** Custom Cursor και Terminal.
3. **UI Enhancements:** Decoding Text και Skeleton Loaders.
4. **Sections Update:** Insights Section και GitHub Widget.
5. **3D Integration:** Συγχρονισμός χρωμάτων με το scroll.

## Επαλήθευση
- [ ] Έλεγχος ότι το terminal ενεργοποιείται σωστά.
- [ ] Επιβεβαίωση της ομαλής μετάβασης χρωμάτων στο 3D.
- [ ] Test του "Technical Breakdown" modal σε mobile και desktop.
- [ ] Έλεγχος ότι το decoding effect δεν επηρεάζει το performance.
