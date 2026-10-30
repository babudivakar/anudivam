// Edit this file to personalise the invitation. Empty/placeholder fields are
// intentionally visible on the site until the couple's final details are known.
export const wedding = {
  title: 'AnuDivam',
  bride: 'Anusha Reddy',
  groom: 'Divakar Reddy',
  weddingDate: 'DATE TO BE ANNOUNCED',
  // Use an ISO date-time with timezone, e.g. 2027-11-21T10:30:00+05:30
  countdownDate: '',
  muhurtham: 'MUHURTHAM TIME TO BE ANNOUNCED',
  message: 'With the blessings of our families, we invite you to share in the beginning of our forever. Your presence will make our celebration complete.',
  family: {
    bride: 'Bride’s family names to be added',
    groom: 'Groom’s family names to be added',
  },
  photos: {
    bride: '',
    groom: '',
  },
  // Add a licensed local audio file path here to make the opt-in music control active.
  musicTrack: '',
  venue: {
    name: 'Wedding venue to be announced',
    address: 'Venue address to be added',
    mapQuery: '',
  },
  receptionVenue: {
    name: 'Reception venue to be announced',
    address: 'Venue address to be added',
    mapQuery: '',
  },
  // Only entries in this array appear in the celebration timeline.
  // Add Haldi, Mehendi, Sangeet or Pelli Kuthuru when those details are final.
  ceremonies: [
    {
      id: 'wedding',
      name: 'The Wedding',
      telugu: 'శుభ వివాహం',
      date: 'DATE TO BE ANNOUNCED',
      time: 'MUHURTHAM TIME TO BE ANNOUNCED',
      venue: 'Wedding venue to be announced',
      detail: 'Join us beneath the mandap as two families and two hearts become one.',
      style: 'wedding',
    },
    {
      id: 'reception',
      name: 'The Reception',
      telugu: 'ఆత్మీయ విందు',
      date: 'DATE TO BE ANNOUNCED',
      time: 'TIME TO BE ANNOUNCED',
      venue: 'Reception venue to be announced',
      detail: 'An evening of warm welcomes, shared stories and a joyful celebration together.',
      style: 'reception',
    },
  ],
}
