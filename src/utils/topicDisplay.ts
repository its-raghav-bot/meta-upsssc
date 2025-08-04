import { Topic } from "@/types/notes";

// Hindi translations for topic names - only used for display in subjects tab
export const getTopicDisplayName = (topic: Topic, context: 'display' | 'search' | 'admin' = 'display'): string => {
  // For search and admin, always use English name
  if (context === 'search' || context === 'admin') {
    return topic.name;
  }
  
  // For display in subjects tab, use Hindi if available
  return topic.hindiName || topic.name;
};

// Hindi topic name mappings
export const hindiTopicNames: { [key: string]: string } = {
  // Indian History
  "Indus valley civilization": "सिंधु घाटी सभ्यता",
  "Vedic civilization": "वैदिक सभ्यता", 
  "Buddhism": "बौद्ध धर्म",
  "Jainism": "जैन धर्म",
  "Mauryan empire": "मौर्य साम्राज्य",
  "Gupta empire": "गुप्त साम्राज्य",
  "Harshavardhan": "हर्षवर्धन",
  "Rajput era": "राजपूत युग",
  "Sultanate era": "सल्तनत काल",
  "Mughal empire": "मुगल साम्राज्य",
  "Maratha empire": "मराठा साम्राज्य",
  "British Rule and 1st war of independence": "ब्रिटिश शासन और प्रथम स्वतंत्रता संग्राम",
  "Social and economic impact of British rule": "ब्रिटिश शासन का सामाजिक और आर्थिक प्रभाव",
  
  // National Movement
  "Initial stage of freedom movement": "स्वतंत्रता आंदोलन का प्रारंभिक चरण",
  "Swadeshi and civil disobedience movement - Mahatma Gandhi and other leaders' role": "स्वदेशी और सविनय अवज्ञा आंदोलन - महात्मा गांधी और अन्य नेताओं की भूमिका",
  "Revolutionary movement and rise of militant nationalism": "क्रांतिकारी आंदोलन और उग्र राष्ट्रवाद का उदय",
  "Farewell Amendment and British India Act 1935": "फेयरवेल संशोधन और भारत शासन अधिनियम 1935",
  "Quit India movement, Azad Hind Fauj and Netaji Subhash Chandra Bose": "भारत छोड़ो आंदोलन, आज़ाद हिंद फौज और नेताजी सुभाष चंद्र बोस",
  
  // Geography
  "Physical features of India": "भारत की भौतिक विशेषताएं",
  "Drainage system": "अपवाह तंत्र",
  "Climate": "जलवायु",
  "Natural vegetation": "प्राकृतिक वनस्पति",
  "Soil": "मिट्टी",
  "Natural resources": "प्राकृतिक संसाधन",
  "Agriculture": "कृषि",
  "Population": "जनसंख्या",
  "Human settlements": "मानव बस्तियां",
  "Transport and communication": "परिवहन और संचार",
  "International trade": "अंतर्राष्ट्रीय व्यापार",
  "Tourism": "पर्यटन",
  
  // Indian Economy
  "Introduction to microeconomics": "सूक्ष्म अर्थशास्त्र का परिचय",
  "Theory of demand and supply": "मांग और आपूर्ति का सिद्धांत",
  "Theory of production and cost": "उत्पादन और लागत का सिद्धांत",
  "Forms of market and price determination": "बाजार के रूप और मूल्य निर्धारण",
  "Introduction to macroeconomics": "वृहद् अर्थशास्त्र का परिचय",
  "National income accounting": "राष्ट्रीय आय लेखांकन",
  "Money and banking": "मुद्रा और बैंकिंग",
  "Government budget and economy": "सरकारी बजट और अर्थव्यवस्था",
  "Balance of payments": "भुगतान संतुलन",
  "Monetary and fiscal policy": "मौद्रिक और राजकोषीय नीति",
  "Planning and economic development": "योजना और आर्थिक विकास",
  "Employment": "रोजगार",
  
  // Constitution
  "Historical underpinnings": "ऐतिहासिक आधार",
  "Making of the constitution": "संविधान निर्माण",
  "Salient features of the constitution": "संविधान की मुख्य विशेषताएं",
  "Preamble": "प्रस्तावना",
  "Fundamental rights": "मौलिक अधिकार",
  "Directive principles of state policy": "राज्य नीति के निदेशक सिद्धांत",
  "Fundamental duties": "मौलिक कर्तव्य",
  "Amendment of the constitution": "संविधान संशोधन",
  "Significant provisions": "महत्वपूर्ण प्रावधान",
  "Basic structure of constitution": "संविधान की आधारभूत संरचना",
  "Parliament and state legislatures": "संसद और राज्य विधानमंडल",
  "Executive and judiciary": "कार्यपालिका और न्यायपालिका",
  "Center-state relations": "केंद्र-राज्य संबंध",
  
  // General Science
  "Matter in our surroundings": "हमारे आसपास के पदार्थ",
  "Structure of atom": "परमाणु की संरचना",
  "Classification of elements": "तत्वों का वर्गीकरण",
  "Chemical reactions and equations": "रासायनिक अभिक्रियाएं और समीकरण",
  "Acids, bases and salts": "अम्ल, क्षार और लवण",
  "Metals and non-metals": "धातु और अधातु",
  "Light - reflection and refraction": "प्रकाश - परावर्तन और अपवर्तन",
  "Human eye and colorful world": "मानव नेत्र और रंगबिरंगा संसार",
  "Electricity": "विद्युत",
  "Magnetic effects of electric current": "विद्युत धारा के चुंबकीय प्रभाव",
  "Life processes": "जैविक प्रक्रियाएं",
  "Control and coordination": "नियंत्रण और समन्वय",
  "Our environment": "हमारा पर्यावरण",
  
  // Additional topics that might be present...
};