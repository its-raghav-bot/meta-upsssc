import { Subject } from "@/types/notes";

export const subjects: Subject[] = [
  {
    id: "indian-history",
    name: "Indian History",
    icon: "🏛️",
    color: "hsl(35, 70%, 55%)",
    chapters: [{
      id: "history-topics",
      name: "Historical Topics",
      subjectId: "indian-history",
      topics: [
        { id: "indus-valley", name: "Indus valley civilization", chapterId: "history-topics", content: "Content for Indus valley civilization", type: "text", isCompleted: false },
        { id: "vedic-civilization", name: "Vedic civilization", chapterId: "history-topics", content: "Content for Vedic civilization", type: "text", isCompleted: false },
        { id: "buddhism", name: "Buddhism", chapterId: "history-topics", content: "Content for Buddhism", type: "text", isCompleted: false },
        { id: "jainism", name: "Jainism", chapterId: "history-topics", content: "Content for Jainism", type: "text", isCompleted: false },
        { id: "mauryan-empire", name: "Mauryan empire", chapterId: "history-topics", content: "Content for Mauryan empire", type: "text", isCompleted: false },
        { id: "gupta-empire", name: "Gupta empire", chapterId: "history-topics", content: "Content for Gupta empire", type: "text", isCompleted: false },
        { id: "harshavardhan", name: "Harshavardhan", chapterId: "history-topics", content: "Content for Harshavardhan", type: "text", isCompleted: false },
        { id: "rajput-era", name: "Rajput era", chapterId: "history-topics", content: "Content for Rajput era", type: "text", isCompleted: false },
        { id: "sultanate-era", name: "Sultanate era", chapterId: "history-topics", content: "Content for Sultanate era", type: "text", isCompleted: false },
        { id: "mughal-empire", name: "Mughal empire", chapterId: "history-topics", content: "Content for Mughal empire", type: "text", isCompleted: false },
        { id: "maratha-empire", name: "Maratha empire", chapterId: "history-topics", content: "Content for Maratha empire", type: "text", isCompleted: false },
        { id: "british-rule", name: "British Rule and 1st war of independence", chapterId: "history-topics", content: "Content for British Rule and 1st war of independence", type: "text", isCompleted: false },
        { id: "social-economic-impact", name: "Social and economic impact of British rule", chapterId: "history-topics", content: "Content for Social and economic impact of British rule", type: "text", isCompleted: false }
      ]
    }]
  },
  {
    id: "national-movement",
    name: "Indian National Movement",
    icon: "🇮🇳",
    color: "hsl(15, 85%, 60%)",
    chapters: [{
      id: "movement-topics",
      name: "Movement Topics",
      subjectId: "national-movement",
      topics: [
        { id: "initial-stage", name: "Initial stage of freedom movement", chapterId: "movement-topics", content: "Content for Initial stage of freedom movement", type: "text", isCompleted: false },
        { id: "swadeshi-civil-disobedience", name: "Swadeshi and civil disobedience movement - Mahatma Gandhi and other leaders' role", chapterId: "movement-topics", content: "Content for Swadeshi and civil disobedience movement", type: "text", isCompleted: false },
        { id: "revolutionary-movement", name: "Revolutionary movement and rise of militant nationalism", chapterId: "movement-topics", content: "Content for Revolutionary movement and rise of militant nationalism", type: "text", isCompleted: false },
        { id: "farewell-amendment", name: "Farewell Amendment and British India Act 1935", chapterId: "movement-topics", content: "Content for Farewell Amendment and British India Act 1935", type: "text", isCompleted: false },
        { id: "quit-india", name: "Quit India movement, Azad Hind Fauj and Netaji Subhash Chandra Bose", chapterId: "movement-topics", content: "Content for Quit India movement, Azad Hind Fauj and Netaji Subhash Chandra Bose", type: "text", isCompleted: false }
      ]
    }]
  },
  {
    id: "geography",
    name: "Geography (Indian & World)",
    icon: "🌍",
    color: "hsl(120, 60%, 50%)",
    chapters: [{
      id: "geography-topics",
      name: "Geography Topics",
      subjectId: "geography",
      topics: [
        { id: "rivers", name: "Rivers", chapterId: "geography-topics", content: "Content for Rivers", type: "text", isCompleted: false },
        { id: "water-resources", name: "Water resources", chapterId: "geography-topics", content: "Content for Water resources", type: "text", isCompleted: false },
        { id: "mountains-glaciers", name: "Mountains & glaciers", chapterId: "geography-topics", content: "Content for Mountains & glaciers", type: "text", isCompleted: false },
        { id: "desert-dry-areas", name: "Desert & dry areas", chapterId: "geography-topics", content: "Content for Desert & dry areas", type: "text", isCompleted: false },
        { id: "forest", name: "Forest", chapterId: "geography-topics", content: "Content for Forest", type: "text", isCompleted: false },
        { id: "mineral-resources", name: "Mineral resources", chapterId: "geography-topics", content: "Content for Mineral resources", type: "text", isCompleted: false },
        { id: "political-geography", name: "Political Geography of India & World", chapterId: "geography-topics", content: "Content for Political Geography of India & World", type: "text", isCompleted: false },
        { id: "climate", name: "Climate", chapterId: "geography-topics", content: "Content for Climate", type: "text", isCompleted: false },
        { id: "time-zone", name: "Time zone", chapterId: "geography-topics", content: "Content for Time zone", type: "text", isCompleted: false },
        { id: "demographics-migrations", name: "Demographics & migrations", chapterId: "geography-topics", content: "Content for Demographics & migrations", type: "text", isCompleted: false }
      ]
    }]
  },
  {
    id: "indian-economy",
    name: "Indian Economy (1947 to 1991)",
    icon: "💰",
    color: "hsl(45, 90%, 55%)",
    chapters: [{
      id: "economy-topics",
      name: "Economy Topics",
      subjectId: "indian-economy",
      topics: [
        { id: "planning-commission", name: "Planning commission and 5-year plans", chapterId: "economy-topics", content: "Content for Planning commission and 5-year plans", type: "text", isCompleted: false },
        { id: "mixed-economy", name: "Development of mixed economy: Private & Public", chapterId: "economy-topics", content: "Content for Development of mixed economy", type: "text", isCompleted: false },
        { id: "green-revolution", name: "Green revolution", chapterId: "economy-topics", content: "Content for Green revolution", type: "text", isCompleted: false },
        { id: "white-revolution", name: "White revolution & operation flood", chapterId: "economy-topics", content: "Content for White revolution & operation flood", type: "text", isCompleted: false },
        { id: "banking-nationalization", name: "Banking nationalization", chapterId: "economy-topics", content: "Content for Banking nationalization", type: "text", isCompleted: false },
        { id: "lpg-reforms", name: "LPG reforms of 1991", chapterId: "economy-topics", content: "Content for LPG reforms of 1991", type: "text", isCompleted: false },
        { id: "economic-reforms-2014", name: "Economic reforms post-2014", chapterId: "economy-topics", content: "Content for Economic reforms post-2014", type: "text", isCompleted: false },
        { id: "farm-reforms", name: "Farm reforms", chapterId: "economy-topics", content: "Content for Farm reforms", type: "text", isCompleted: false },
        { id: "structural-reforms", name: "Structural reforms", chapterId: "economy-topics", content: "Content for Structural reforms", type: "text", isCompleted: false },
        { id: "labour-reforms", name: "Labour reforms", chapterId: "economy-topics", content: "Content for Labour reforms", type: "text", isCompleted: false },
        { id: "economic-reforms", name: "Economic reforms", chapterId: "economy-topics", content: "Content for Economic reforms", type: "text", isCompleted: false },
        { id: "gst", name: "GST", chapterId: "economy-topics", content: "Content for GST", type: "text", isCompleted: false }
      ]
    }]
  },
  {
    id: "constitution-administration",
    name: "Indian Constitution & Public Administration",
    icon: "⚖️",
    color: "hsl(240, 70%, 60%)",
    chapters: [{
      id: "constitution-topics",
      name: "Constitution Topics",
      subjectId: "constitution-administration",
      topics: [
        { id: "salient-features", name: "Salient Features", chapterId: "constitution-topics", content: "Content for Salient Features", type: "text", isCompleted: false },
        { id: "directive-principles", name: "Directive principles", chapterId: "constitution-topics", content: "Content for Directive principles", type: "text", isCompleted: false },
        { id: "fundamental-rights-duties", name: "Fundamental rights & duties", chapterId: "constitution-topics", content: "Content for Fundamental rights & duties", type: "text", isCompleted: false },
        { id: "parliamentary-system", name: "Parliamentary system", chapterId: "constitution-topics", content: "Content for Parliamentary system", type: "text", isCompleted: false },
        { id: "federal-system", name: "Federal system, Union Govt & UR, Union Govt & States", chapterId: "constitution-topics", content: "Content for Federal system", type: "text", isCompleted: false },
        { id: "judicial-framework", name: "Judicial Framework", chapterId: "constitution-topics", content: "Content for Judicial Framework", type: "text", isCompleted: false },
        { id: "district-administration", name: "District Administration", chapterId: "constitution-topics", content: "Content for District Administration", type: "text", isCompleted: false },
        { id: "local-bodies", name: "Local bodies and Panchayat Raj", chapterId: "constitution-topics", content: "Content for Local bodies and Panchayat Raj", type: "text", isCompleted: false }
      ]
    }]
  },
  {
    id: "general-science",
    name: "General Science",
    icon: "🔬",
    color: "hsl(180, 70%, 50%)",
    chapters: [{
      id: "science-topics",
      name: "Science Topics",
      subjectId: "general-science",
      topics: [
        { id: "basic-physics", name: "Basic Physics", chapterId: "science-topics", content: "Content for Basic Physics", type: "text", isCompleted: false },
        { id: "basic-chemistry", name: "Basic Chemistry", chapterId: "science-topics", content: "Content for Basic Chemistry", type: "text", isCompleted: false },
        { id: "basic-biology", name: "Basic Biology", chapterId: "science-topics", content: "Content for Basic Biology", type: "text", isCompleted: false }
      ]
    }]
  },
  {
    id: "elementary-arithmetic",
    name: "Elementary Arithmetic",
    icon: "🔢",
    color: "hsl(300, 70%, 55%)",
    chapters: [{
      id: "arithmetic-topics",
      name: "Arithmetic Topics",
      subjectId: "elementary-arithmetic",
      topics: [
        { id: "whole-numbers", name: "Whole numbers, fractions and decimals", chapterId: "arithmetic-topics", content: "Content for Whole numbers, fractions and decimals", type: "text", isCompleted: false },
        { id: "percentage", name: "Percentage", chapterId: "arithmetic-topics", content: "Content for Percentage", type: "text", isCompleted: false },
        { id: "arithmetic-equations", name: "Simple arithmetic equations", chapterId: "arithmetic-topics", content: "Content for Simple arithmetic equations", type: "text", isCompleted: false },
        { id: "square-roots", name: "Square & square roots", chapterId: "arithmetic-topics", content: "Content for Square & square roots", type: "text", isCompleted: false },
        { id: "exponent-powers", name: "Exponent and powers", chapterId: "arithmetic-topics", content: "Content for Exponent and powers", type: "text", isCompleted: false },
        { id: "average", name: "Average", chapterId: "arithmetic-topics", content: "Content for Average", type: "text", isCompleted: false }
      ]
    }]
  },
  {
    id: "general-hindi",
    name: "General Hindi",
    icon: "📚",
    color: "hsl(0, 70%, 55%)",
    chapters: [{
      id: "hindi-topics",
      name: "Hindi Topics",
      subjectId: "general-hindi",
      topics: [
        { id: "sandhi", name: "संधि", chapterId: "hindi-topics", content: "Content for संधि", type: "text", isCompleted: false },
        { id: "vilom-shabd", name: "विलोम शब्द", chapterId: "hindi-topics", content: "Content for विलोम शब्द", type: "text", isCompleted: false },
        { id: "paryayvachi", name: "पर्यायवाची वाक्यांशों के लिए एक शब्द", chapterId: "hindi-topics", content: "Content for पर्यायवाची वाक्यांशों के लिए एक शब्द", type: "text", isCompleted: false },
        { id: "ling", name: "लिंग", chapterId: "hindi-topics", content: "Content for लिंग", type: "text", isCompleted: false },
        { id: "samashrut", name: "समश्रुतभिन्नार्थक शब्द", chapterId: "hindi-topics", content: "Content for समश्रुतभिन्नार्थक शब्द", type: "text", isCompleted: false },
        { id: "muhavare", name: "मुहावरे-लोकोक्तियां", chapterId: "hindi-topics", content: "Content for मुहावरे-लोकोक्तियां", type: "text", isCompleted: false },
        { id: "ashuddhiyan", name: "सामान्य अशुद्धियां", chapterId: "hindi-topics", content: "Content for सामान्य अशुद्धियां", type: "text", isCompleted: false },
        { id: "lekhak-rachnaye", name: "लेखक और रचनाएं", chapterId: "hindi-topics", content: "Content for लेखक और रचनाएं", type: "text", isCompleted: false }
      ]
    }]
  },
  {
    id: "general-english",
    name: "General English",
    icon: "🔤",
    color: "hsl(210, 70%, 55%)",
    chapters: [{
      id: "english-topics",
      name: "English Topics",
      subjectId: "general-english",
      topics: [
        { id: "grammar", name: "English Grammar", chapterId: "english-topics", content: "Content for English Grammar", type: "text", isCompleted: false },
        { id: "passages", name: "Questions on passages", chapterId: "english-topics", content: "Content for Questions on passages", type: "text", isCompleted: false }
      ]
    }]
  },
  {
    id: "logic-reasoning",
    name: "Logic & Reasoning",
    icon: "🧠",
    color: "hsl(270, 70%, 55%)",
    chapters: [{
      id: "reasoning-topics",
      name: "Reasoning Topics",
      subjectId: "logic-reasoning",
      topics: [
        { id: "order-ranking", name: "Order & ranking", chapterId: "reasoning-topics", content: "Content for Order & ranking", type: "text", isCompleted: false },
        { id: "blood-relations", name: "Blood relations", chapterId: "reasoning-topics", content: "Content for Blood relations", type: "text", isCompleted: false },
        { id: "calendar-watch", name: "Calendar & watch", chapterId: "reasoning-topics", content: "Content for Calendar & watch", type: "text", isCompleted: false },
        { id: "cause-effect", name: "Cause & effect", chapterId: "reasoning-topics", content: "Content for Cause & effect", type: "text", isCompleted: false },
        { id: "coding-decoding", name: "Coding decoding", chapterId: "reasoning-topics", content: "Content for Coding decoding", type: "text", isCompleted: false },
        { id: "conclusive-reasoning", name: "Conclusive reasoning, etc.", chapterId: "reasoning-topics", content: "Content for Conclusive reasoning", type: "text", isCompleted: false }
      ]
    }]
  },
  {
    id: "current-affairs",
    name: "Current Affairs",
    icon: "📰",
    color: "hsl(25, 80%, 55%)",
    chapters: [{
      id: "affairs-topics",
      name: "Current Affairs Topics",
      subjectId: "current-affairs",
      topics: [
        { id: "national-affairs", name: "National current affairs", chapterId: "affairs-topics", content: "Content for National current affairs", type: "text", isCompleted: false },
        { id: "international-affairs", name: "International current affairs", chapterId: "affairs-topics", content: "Content for International current affairs", type: "text", isCompleted: false }
      ]
    }]
  },
  {
    id: "general-awareness",
    name: "General Awareness",
    icon: "🌟",
    color: "hsl(60, 80%, 55%)",
    chapters: [{
      id: "awareness-topics",
      name: "General Awareness Topics",
      subjectId: "general-awareness",
      topics: [
        { id: "neighbours", name: "India's Neighbours", chapterId: "awareness-topics", content: "Content for India's Neighbours", type: "text", isCompleted: false },
        { id: "countries-capitals", name: "Countries, Capitals & Currencies", chapterId: "awareness-topics", content: "Content for Countries, Capitals & Currencies", type: "text", isCompleted: false },
        { id: "states-uts", name: "Indian States & UTs", chapterId: "awareness-topics", content: "Content for Indian States & UTs", type: "text", isCompleted: false },
        { id: "parliament", name: "Indian Parliament", chapterId: "awareness-topics", content: "Content for Indian Parliament", type: "text", isCompleted: false },
        { id: "important-days", name: "Days of National & International Importance", chapterId: "awareness-topics", content: "Content for Days of National & International Importance", type: "text", isCompleted: false },
        { id: "world-organizations", name: "World organizations & HQs", chapterId: "awareness-topics", content: "Content for World organizations & HQs", type: "text", isCompleted: false },
        { id: "tourism", name: "Indian tourism destinations", chapterId: "awareness-topics", content: "Content for Indian tourism destinations", type: "text", isCompleted: false },
        { id: "art-culture", name: "Indian art & culture", chapterId: "awareness-topics", content: "Content for Indian art & culture", type: "text", isCompleted: false },
        { id: "sports", name: "Indian & International Sports", chapterId: "awareness-topics", content: "Content for Indian & International Sports", type: "text", isCompleted: false },
        { id: "research-institutes", name: "Indian research institutes", chapterId: "awareness-topics", content: "Content for Indian research institutes", type: "text", isCompleted: false },
        { id: "books-authors", name: "Books & Authors", chapterId: "awareness-topics", content: "Content for Books & Authors", type: "text", isCompleted: false },
        { id: "awards-honours", name: "Awards & Honours", chapterId: "awareness-topics", content: "Content for Awards & Honours", type: "text", isCompleted: false },
        { id: "climate-environment", name: "Climate change & environment", chapterId: "awareness-topics", content: "Content for Climate change & environment", type: "text", isCompleted: false }
      ]
    }]
  }
];