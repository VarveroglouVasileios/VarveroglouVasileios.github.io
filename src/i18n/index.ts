import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    nav: {
      home: 'HOME',
      work: 'WORK',
      experience: 'EXPERIENCE',
      contact: 'CONTACT',
      downloadCv: 'DOWNLOAD CV'
    },
    hero: {
      title: 'Vue & Node.js Engineer',
      headline: 'Shipping secure, scalable web platforms with Vue & Node.',
      description: 'Full Stack Developer (FactSet) with a background in Computer Science and an MSc in Cybersecurity in progress—combining Vue.js, Node.js, and secure-by-design thinking to build reliable products.',
      viewProjects: 'VIEW PROJECTS',
      hireMe: 'HIRE ME',
      downloadCv: 'DOWNLOAD CV'
    },
    about: {
      tag: 'ABOUT ME',
      title: 'Full Stack Developer & Security-focused Engineer',
      p1: 'I am a Full Stack Developer with 3 years of experience building and maintaining scalable web applications in an enterprise environment, currently working at FactSet and pursuing an MSc in Cybersecurity.',
      p2: 'I work across the full stack with Vue.js, Node.js, TypeScript, PHP (Symfony), SQL, and Pinia, focusing on clean architecture, performance, and reliability—while applying secure-by-design principles from my cybersecurity studies.',
      techStack: 'TECH STACK'
    },
    projects: {
      tag: 'PORTFOLIO',
      title: 'Selected Projects',
      github: 'GitHub',
      live: 'Live Demo',
      items: {
        vibebites: {
          title: 'VibeBites',
          description: 'Greek-first social cooking platform: recipe discovery, shopping lists, meal planning, AI fridge assistant (ingredients to recipes with macros), cooking mode, and PWA install — built for sharing across social.'
        },
        shadowai: {
          title: 'Shadow AI — Admin Dashboard',
          description: 'Marketing and admin experience for Shadow AI: a security layer between teams and AI tools — zero-knowledge inspection, DLP-style policies, secret redaction, and live session visibility without storing prompts.'
        },
        benefitpulse: {
          title: 'BenefitPulse',
          description: 'Platform that helps citizens quickly discover relevant Greek government benefits and allowances through a guided, user-friendly experience.'
        }
      }
    },
    experience: {
      tag: 'RESUME',
      title: 'Career Timeline',
      items: {
        bsc: {
          title: 'BSc in Computer Science and Engineering',
          org: 'University of Thessaly',
          desc: 'Undergraduate studies in computer science and engineering, covering algorithms, software engineering, networks, and distributed systems.'
        },
        junior: {
          title: 'Junior Front-end Developer',
          org: 'Epsilon Informatics',
          desc: 'Implemented front-end features and interfaces for web projects, collaborating closely with designers and backend teams to deliver maintainable and user-focused solutions.'
        },
        fullstack: {
          title: 'Full Stack Developer',
          org: 'FactSet',
          desc: 'Building and maintaining enterprise-scale web applications in a global environment using Vue.js, Node.js, TypeScript, PHP (Symfony), SQL, and Pinia with a strong focus on clean architecture, performance, and reliability.'
        },
        structwise: {
          title: 'Front-end Developer',
          org: 'StructWise',
          desc: 'Delivered front-end features and UI for web products in a fully remote engagement, working with AngularJS and Tailwind CSS alongside designers and backend engineers.'
        },
        msc: {
          title: 'MSc in Cybersecurity',
          org: 'International Hellenic University',
          desc: 'Postgraduate studies focused on cybersecurity, secure software development, and application security, with an emphasis on secure-by-design systems.'
        }
      }
    },
    contact: {
      tag: 'GET IN TOUCH',
      title: 'Let’s talk about your next project',
      description: 'Have a product idea, a scaling challenge, or a frontend overhaul in mind? Share a few details and I will get back with a focused plan.',
      fullName: 'Full Name',
      email: 'Email Address',
      details: 'Project Details',
      send: 'SEND MESSAGE'
    },
    footer: {
      rights: '© 2026 Vasileios Varveroglou',
      backToTop: 'TOP'
    }
  },
  el: {
    nav: {
      home: 'ΑΡΧΙΚΗ',
      work: 'PROJECTS',
      experience: 'ΕΜΠΕΙΡΙΑ',
      contact: 'ΕΠΙΚΟΙΝΩΝΙΑ',
      downloadCv: 'DOWNLOAD CV'
    },
    hero: {
      title: 'Full Stack & Security Engineer',
      headline: 'Σχεδιασμός ασφαλών και κλιμακούμενων web εφαρμογών.',
      description: 'Full Stack Developer στη FactSet με ακαδημαϊκό υπόβαθρο στην Πληροφορική και MSc στην Κυβερνοασφάλεια. Συνδυάζω Vue.js, Node.js και secure-by-design αρχιτεκτονική για την ανάπτυξη αξιόπιστων ψηφιακών προϊόντων.',
      viewProjects: 'PROJECTS',
      hireMe: 'CONTACT',
      downloadCv: 'DOWNLOAD CV'
    },
    about: {
      tag: 'ABOUT',
      title: 'Full Stack Developer με εξειδίκευση στο AppSec',
      p1: 'Διαθέτω τριετή εμπειρία στην ανάπτυξη enterprise-level εφαρμογών, εργαζόμενος στη FactSet και ολοκληρώνοντας παράλληλα μεταπτυχιακές σπουδές (MSc) στον τομέα του Cybersecurity.',
      p2: 'Εξειδικεύομαι σε Vue.js, Node.js, TypeScript και PHP (Symfony), εστιάζοντας στην καθαρή δομή κώδικα και το performance, εφαρμόζοντας στην πράξη αρχές ασφαλούς ανάπτυξης λογισμικού.',
      techStack: 'TECH STACK'
    },
    projects: {
      tag: 'PORTFOLIO',
      title: 'Επιλεγμένα Projects',
      github: 'GitHub',
      live: 'Live Demo',
      items: {
        vibebites: {
          title: 'VibeBites',
          description: 'Social cooking πλατφόρμα με AI fridge assistant, meal planning και PWA υποστήριξη. Σχεδιασμένη για την ελληνική αγορά με έμφαση στο social sharing.'
        },
        shadowai: {
          title: 'Shadow AI — Admin Dashboard',
          description: 'Security layer για enterprise περιβάλλοντα. Διαθέτει zero-knowledge inspection, DLP policies και secret redaction για την ασφαλή χρήση εργαλείων AI.'
        },
        benefitpulse: {
          title: 'BenefitPulse',
          description: 'Πλατφόρμα εύρεσης κρατικών επιδομάτων και παροχών. Παρέχει μια απλουστευμένη και φιλική εμπειρία αναζήτησης για τον πολίτη.'
        }
      }
    },
    experience: {
      tag: 'RESUME',
      title: 'Career Timeline',
      items: {
        bsc: {
          title: 'BSc in Computer Science and Engineering',
          org: 'Πανεπιστήμιο Θεσσαλίας',
          desc: 'Προπτυχιακές σπουδές με έμφαση σε αλγορίθμους, software engineering, δίκτυα και κατανεμημένα συστήματα.'
        },
        junior: {
          title: 'Junior Front-end Developer',
          org: 'Epsilon Informatics',
          desc: 'Ανάπτυξη user-focused διεπαφών και συνεργασία με design teams για τη δημιουργία maintainable web λύσεων.'
        },
        fullstack: {
          title: 'Full Stack Developer',
          org: 'FactSet',
          desc: 'Ανάπτυξη enterprise web εφαρμογών σε παγκόσμια κλίμακα. Χρήση Vue.js, Node.js και PHP (Symfony) με έμφαση σε clean architecture και αξιοπιστία.'
        },
        structwise: {
          title: 'Front-end Developer',
          org: 'StructWise',
          desc: 'Ανάπτυξη UI/UX και front-end χαρακτηριστικών με χρήση AngularJS και Tailwind CSS σε fully remote περιβάλλον.'
        },
        msc: {
          title: 'MSc in Cybersecurity',
          org: 'Διεθνές Πανεπιστήμιο της Ελλάδος',
          desc: 'Μεταπτυχιακές σπουδές πάνω στην ασφάλεια εφαρμογών και την ανάπτυξη secure-by-design συστημάτων.'
        }
      }
    },
    contact: {
      tag: 'GET IN TOUCH',
      title: 'Ας μιλήσουμε για το επόμενο project σας',
      description: 'Αναζητάτε λύσεις σε θέματα scaling, frontend ανασχεδιασμό ή έχετε μια νέα ιδέα; Συμπληρώστε τη φόρμα και θα επικοινωνήσω άμεσα μαζί σας.',
      fullName: 'Ονοματεπώνυμο',
      email: 'Email',
      details: 'Λεπτομέρειες Project',
      send: 'ΑΠΟΣΤΟΛΗ'
    },
    footer: {
      rights: '© 2026 Βασίλειος Βαρβέρογλου',
      backToTop: 'TOP'
    }
  }
}

const isProd = import.meta.env.PROD

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
  missingWarn: !isProd,
  fallbackWarn: !isProd,
})
