export const languages = [
  { code: 'en', label: 'English' },
  { code: 'te', label: 'Telugu' },
  { code: 'kn', label: 'Kannada' },
  { code: 'en-te', label: 'English + Telugu' },
  { code: 'en-kn', label: 'English + Kannada' },
  { code: 'te-kn', label: 'Telugu + Kannada' },
]

const strings = {
  en: {
    omLine: 'ॐ Sri Ganeshaya Namaha',
    blessing: 'Sri Lakshmi Venkateshwara Swamy Prasanna',
    cordiallyInvites: 'Cordially invites you to',
    cordiallyInvite: 'Cordially invite you to',
    celebrationOfLove: 'A celebration of love',
    tapToOpen: 'Tap anywhere to open',
    withBlessingsOf: 'With the blessings of',
    togetherFamilies: 'Together with our families',
    theBride: 'The bride',
    theGroom: 'The groom',
    sonOf: 'Son of',
    daughterOf: 'Daughter of',
    gettingMarried: 'are getting married',
    shubhaVivaham: 'Shubha Vivaham',
    scrollToExplore: 'Scroll to explore',
    dear: 'Dear',
  },
  te: {
    omLine: 'ॐ శ్రీ గణేశాయ నమః',
    blessing: 'శ్రీ లక్ష్మీ వెంకటేశ్వర స్వామి ప్రసన్న',
    cordiallyInvites: 'వారి వివాహానికి ఆహ్వానిస్తున్నారు',
    cordiallyInvite: 'వారి వివాహానికి ఆహ్వానిస్తున్నారు',
    celebrationOfLove: 'ప్రేమ వేడుక',
    tapToOpen: 'తెరవడానికి ఎక్కడైనా నొక్కండి',
    withBlessingsOf: 'వీరి ఆశీర్వాదాలతో',
    togetherFamilies: 'మా కుటుంబాల ఆశీస్సులతో',
    theBride: 'వధువు',
    theGroom: 'వరుడు',
    sonOf: 'తండ్రి',
    daughterOf: 'తండ్రి',
    gettingMarried: 'వివాహం జరుపుకుంటున్నారు',
    shubhaVivaham: 'శుభ వివాహం',
    scrollToExplore: 'స్క్రోల్ చేయండి',
    dear: 'ప్రియమైన',
  },
  kn: {
    omLine: 'ॐ ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ',
    blessing: 'ಶ್ರೀ ಲಕ್ಷ್ಮೀ ವೆಂಕಟೇಶ್ವರ ಸ್ವಾಮಿ ಪ್ರಸನ್ನ',
    cordiallyInvites: 'ಅವರ ವಿವಾಹಕ್ಕೆ ಆಹ್ವಾನಿಸುತ್ತಿದ್ದಾರೆ',
    cordiallyInvite: 'ಅವರ ವಿವಾಹಕ್ಕೆ ಆಹ್ವಾನಿಸುತ್ತಿದ್ದಾರೆ',
    celebrationOfLove: 'ಪ್ರೀತಿಯ ಆಚರಣೆ',
    tapToOpen: 'ತೆರೆಯಲು ಎಲ್ಲಿಯಾದರೂ ಟ್ಯಾಪ್ ಮಾಡಿ',
    withBlessingsOf: 'ಇವರ ಆಶೀರ್ವಾದದೊಂದಿಗೆ',
    togetherFamilies: 'ನಮ್ಮ ಕುಟುಂಬಗಳ ಆಶೀರ್ವಾದದೊಂದಿಗೆ',
    theBride: 'ವಧು',
    theGroom: 'ವರ',
    sonOf: 'ತಂದೆ',
    daughterOf: 'ತಂದೆ',
    gettingMarried: 'ವಿವಾಹವಾಗುತ್ತಿದ್ದಾರೆ',
    shubhaVivaham: 'ಶುಭ ವಿವಾಹ',
    scrollToExplore: 'ಸ್ಕ್ರಾಲ್ ಮಾಡಿ',
    dear: 'ಪ್ರಿಯ',
  },
}

export function getT(langCode) {
  if (!langCode || langCode === 'en') return (key) => strings.en[key] || key
  const parts = langCode.split('-')
  if (parts.length === 2) {
    const [a, b] = parts
    return (key) => {
      const va = strings[a]?.[key] || key
      const vb = strings[b]?.[key] || key
      if (va === vb) return va
      return `${va}\n${vb}`
    }
  }
  return (key) => strings[langCode]?.[key] || strings.en[key] || key
}
