export const categories = ['starters', 'salads', 'grill', 'fish', 'cooked', 'desserts', 'drinks'] as const
export const diets = ['vegetarian', 'fasting', 'glutenFree'] as const
export type Diet = typeof diets[number]
type Category = typeof categories[number]
type Copy = readonly [name: string, description: string]

interface Dish {
  id: string
  category: Category
  price: number
  el: Copy
  en: Copy
  diets: readonly Diet[]
}

const veg = ['vegetarian'] as const
const vg = ['vegetarian', 'glutenFree'] as const
const vf = ['vegetarian', 'fasting'] as const
const all = ['vegetarian', 'fasting', 'glutenFree'] as const
const gf = ['glutenFree'] as const

export const menu: readonly Dish[] = [
  { id: 'tzatziki', category: 'starters', price: 4.5, el: ['Τζατζίκι', 'Στραγγιστό γιαούρτι, αγγούρι και άνηθος'], en: ['Tzatziki', 'Strained yoghurt, cucumber and dill'], diets: vg },
  { id: 'fava', category: 'starters', price: 6, el: ['Φάβα με κάπαρη', 'Λεμόνι, κάπαρη και κρεμμύδι'], en: ['Split pea purée', 'Lemon, capers and onion'], diets: all },
  { id: 'saganaki', category: 'starters', price: 7.5, el: ['Σαγανάκι', 'Τηγανητή γραβιέρα με λεμόνι'], en: ['Saganaki', 'Pan-fried graviera cheese with lemon'], diets: veg },
  { id: 'dolmades', category: 'starters', price: 6.5, el: ['Ντολμαδάκια γιαλαντζί', 'Αμπελόφυλλα με ρύζι και μυρωδικά'], en: ['Stuffed vine leaves', 'Vine leaves with rice and herbs'], diets: all },
  { id: 'courgettes', category: 'starters', price: 6, el: ['Κολοκυθάκια τηγανητά', 'Λεπτές φέτες με δυόσμο'], en: ['Fried courgettes', 'Thin slices with mint'], diets: vf },
  { id: 'village', category: 'salads', price: 8.5, el: ['Χωριάτικη', 'Ντομάτα, αγγούρι, ελιές Θάσου και φέτα'], en: ['Greek salad', 'Tomatoes, cucumber, Thasos olives and feta'], diets: vg },
  { id: 'greens', category: 'salads', price: 6, el: ['Χόρτα εποχής', 'Βραστά χόρτα με ελαιόλαδο και λεμόνι'], en: ['Seasonal greens', 'Boiled greens with olive oil and lemon'], diets: all },
  { id: 'dakos', category: 'salads', price: 8, el: ['Ντάκος', 'Κρίθινο παξιμάδι, ντομάτα και ξινομυζήθρα'], en: ['Dakos', 'Barley rusk, tomato and tangy mizithra'], diets: veg },
  { id: 'pork', category: 'grill', price: 12.5, el: ['Χοιρινό σουβλάκι', 'Στα κάρβουνα με πατάτες και ρίγανη'], en: ['Pork souvlaki', 'Charcoal-grilled with potatoes and oregano'], diets: gf },
  { id: 'chicken', category: 'grill', price: 13, el: ['Κοτόπουλο σχάρας', 'Μαρινάδα με λεμόνι και θυμάρι'], en: ['Grilled chicken', 'Lemon and thyme marinade'], diets: gf },
  { id: 'lamb', category: 'grill', price: 17, el: ['Παϊδάκια', 'Αρνί στα κάρβουνα με χοντρό αλάτι'], en: ['Lamb chops', 'Charcoal-grilled with sea salt'], diets: gf },
  { id: 'octopus', category: 'fish', price: 16, el: ['Χταπόδι στα κάρβουνα', 'Με ξίδι, ελαιόλαδο και θρούμπι'], en: ['Charcoal-grilled octopus', 'With vinegar, olive oil and savory'], diets: ['fasting', 'glutenFree'] },
  { id: 'sardines', category: 'fish', price: 12, el: ['Σαρδέλες σχάρας', 'Με λεμόνι και μαϊντανό'], en: ['Grilled sardines', 'With lemon and parsley'], diets: gf },
  { id: 'sea-bream', category: 'fish', price: 18, el: ['Τσιπούρα σχάρας', 'Ολόκληρη με λαδολέμονο'], en: ['Grilled sea bream', 'Whole, with olive oil and lemon'], diets: gf },
  { id: 'calamari', category: 'fish', price: 14, el: ['Καλαμαράκια τηγανητά', 'Με λεμόνι στο πλάι'], en: ['Fried calamari', 'With lemon on the side'], diets: ['fasting'] },
  { id: 'moussaka', category: 'cooked', price: 13.5, el: ['Σπιτικός μουσακάς', 'Μελιτζάνα, κιμάς και βελούδινη μπεσαμέλ'], en: ['House moussaka', 'Aubergine, minced beef and creamy béchamel'], diets: [] },
  { id: 'giouvetsi', category: 'cooked', price: 14, el: ['Μοσχάρι γιουβέτσι', 'Σιγομαγειρεμένο με κριθαράκι'], en: ['Beef giouvetsi', 'Slow-cooked beef with orzo'], diets: [] },
  { id: 'beans', category: 'cooked', price: 8, el: ['Γίγαντες φούρνου', 'Με ντομάτα, σέλινο και άνηθο'], en: ['Oven-baked giant beans', 'With tomato, celery and dill'], diets: all },
  { id: 'portokalopita', category: 'desserts', price: 6, el: ['Πορτοκαλόπιτα', 'Σιροπιαστή με ξύσμα πορτοκαλιού'], en: ['Orange syrup cake', 'With orange zest and syrup'], diets: veg },
  { id: 'yoghurt', category: 'desserts', price: 5, el: ['Γιαούρτι με μέλι', 'Με θυμαρίσιο μέλι και καρύδια'], en: ['Yoghurt with honey', 'With thyme honey and walnuts'], diets: vg },
  { id: 'halva', category: 'desserts', price: 5, el: ['Χαλβάς σιμιγδαλένιος', 'Με κανέλα και σταφίδες'], en: ['Semolina halva', 'With cinnamon and raisins'], diets: vf },
  { id: 'wine', category: 'drinks', price: 5.5, el: ['Τοπικό λευκό κρασί', 'Ποτήρι, ξηρό λευκό από την Καβάλα'], en: ['Local white wine', 'A glass of dry white from Kavala'], diets: gf },
  { id: 'tsipouro', category: 'drinks', price: 5, el: ['Τσίπουρο', 'Καραφάκι 50 ml, με ή χωρίς γλυκάνισο'], en: ['Tsipouro', '50 ml carafe, with or without anise'], diets: gf },
  { id: 'lemonade', category: 'drinks', price: 4, el: ['Σπιτική λεμονάδα', 'Φρέσκο λεμόνι και δυόσμος'], en: ['House lemonade', 'Fresh lemon and mint'], diets: all },
]

export const signature = ['octopus', 'moussaka', 'fava'].map(id => menu.find(dish => dish.id === id)!)
