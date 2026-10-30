// Wedding details from the printed invitation; side events use the links supplied by each family.
export const wedding = {
  title: 'AnuDivam',
  bride: 'Anusha Reddy',
  groom: 'Divakar Reddy',
  welcomeFamilies: [
    'Kullakunta Addamma Gari family',
    'Vankayilu Ram Reddy family',
  ],
  weddingDate: 'Sunday, 22 November 2026',
  countdownDate: '2026-11-22T09:00:00+05:30',
  muhurtham: '9:00 a.m. to 10:00 a.m. IST',
  message: 'With the blessings of our families, we invite you to celebrate our wedding.',
  family: {
    bride: 'Smt. Shivamma & Sri Shiva Reddy',
    groom: 'Smt. Sunitha & Sri Babu Reddy',
  },
  photos: { bride: '', groom: '' },
  musicTrack: '',
  venue: {
    name: 'D.C. Anjaneyulu Convention Center',
    address: 'Appala Kunta Main Road, Kirikera, Hindupura, Sri Sathya Sai District, Andhra Pradesh',
    mapQuery: 'D.C. Anjaneyulu Convention Center, Appala Kunta Main Road, Kirikera, Hindupura, Andhra Pradesh',
  },
  receptionVenue: {
    name: 'D.C. Anjaneyulu Convention Center',
    address: 'Appala Kunta Main Road, Kirikera, Hindupura, Sri Sathya Sai District, Andhra Pradesh',
    mapQuery: 'D.C. Anjaneyulu Convention Center, Appala Kunta Main Road, Kirikera, Hindupura, Andhra Pradesh',
  },
  sides: {
    anusha: {
      label: 'Anusha’s family',
      invitedBy: 'Smt. Shivamma & Sri Shiva Reddy',
      otherFamily: 'Smt. Sunitha & Sri Babu Reddy',
      message: 'With the blessings of Smt. Shivamma and Sri Shiva Reddy, we invite you to celebrate Anusha’s wedding with Divakar.',
      shareMessage: 'Anusha’s family invites you to celebrate Anusha and Divakar’s wedding — AnuDivam.',
      venue: {
        name: 'Anusha’s family celebration venue',
        address: 'Tap below for the location of Haldi and Mehendi',
        mapQuery: 'https://maps.app.goo.gl/hQ7qwg4BFNdvSJB77',
      },
      ceremonies: [
        { id: 'bride-haldi', name: 'Haldi', telugu: 'పసుపు వేడుక', date: 'Friday, 20 November 2026', time: '12:00 p.m. to 3:00 p.m.', venue: 'Anusha’s family venue', detail: 'Join Anusha’s family for the Haldi celebration. Directions are in the venue section.', style: 'haldi' },
        { id: 'bride-mehendi', name: 'Mehendi', telugu: 'మెహందీ', date: 'Friday, 20 November 2026', time: '4:00 p.m. to 9:00 p.m.', venue: 'Anusha’s family venue', detail: 'Celebrate Mehendi with Anusha’s family. Directions are in the venue section.', style: 'mehendi' },
      ],
    },
    divakar: {
      label: 'Divakar’s family',
      invitedBy: 'Smt. Sunitha & Sri Babu Reddy',
      otherFamily: 'Smt. Shivamma & Sri Shiva Reddy',
      message: 'With the blessings of Smt. Sunitha and Sri Babu Reddy, we invite you to celebrate Divakar’s wedding with Anusha.',
      shareMessage: 'Divakar’s family invites you to celebrate Divakar and Anusha’s wedding — AnuDivam.',
      venue: {
        name: 'Divakar’s family celebration venue',
        address: 'Tap below for the location of Haldi and Mehendi',
        mapQuery: 'https://maps.app.goo.gl/aCPSEE3nKBmcxi5o8',
      },
      ceremonies: [
        { id: 'groom-haldi', name: 'Haldi', telugu: 'పసుపు వేడుక', date: 'Friday, 20 November 2026', time: '4:00 p.m. to 6:00 p.m.', venue: 'Divakar’s family venue', detail: 'Join Divakar’s family for the Haldi celebration. Directions are in the venue section.', style: 'haldi' },
        { id: 'groom-mehendi', name: 'Mehendi', telugu: 'మెహందీ', date: 'Friday, 20 November 2026', time: '6:00 p.m. to 9:00 p.m.', venue: 'Divakar’s family venue', detail: 'Celebrate Mehendi with Divakar’s family. Directions are in the venue section.', style: 'mehendi' },
      ],
    },
  },
  ceremonies: [
    { id: 'reception', name: 'The Reception', telugu: 'ఆత్మీయ విందు', date: 'Saturday, 21 November 2026', time: '7:00 p.m. onwards', venue: 'D.C. Anjaneyulu Convention Center', detail: 'An evening of celebration and dinner in Hindupura.', style: 'reception' },
    { id: 'wedding', name: 'The Wedding', telugu: 'శుభ వివాహం', date: 'Sunday, 22 November 2026', time: 'Muhurtham: 9:00 a.m. to 10:00 a.m.', venue: 'D.C. Anjaneyulu Convention Center', detail: 'Celebrate the auspicious Muhurtham with us.', style: 'wedding' },
  ],
}
