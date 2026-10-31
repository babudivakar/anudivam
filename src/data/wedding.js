// Wedding details from the printed invitation; side events use the links supplied by each family.
export const wedding = {
  title: 'AnuDivam',
  bride: 'Anusha Reddy',
  groom: 'Divakar Reddy',
  welcomeFamilies: [
    'Kollakunta Addamma Gari family',
    'Vankayilu Ram Reddy family',
  ],
  weddingDate: 'Sunday, 22 November 2026',
  countdownDate: '2026-11-22T09:00:00+05:30',
  muhurtham: '9:00 a.m. to 10:00 a.m. IST',
  message: 'With the blessings of our families, we invite you to celebrate our wedding.',
  family: {
    bride: 'Smt. Shivamma & Sri Shivareddy',
    groom: 'Smt. Sunitha & Sri Babu Reddy',
    brideGrandparents: 'Late Smt. Adilakshmamma & Sri Narasimhareddy',
    groomGrandparents: 'Smt. Parvathamma & Late Sri Vankayilu Rama Reddy',
  },
  photos: { bride: '', groom: '' },
  gallery: [],
  musicTrack: '/music/wedding-song.mp3',
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
      familyName: 'Kollakunta Addamma Gari family',
      invitedBy: 'Smt. Shivamma & Sri Shivareddy',
      blessingsOf: 'Late Smt. Adilakshmamma & Sri Narasimhareddy',
      otherFamily: 'Smt. Sunitha & Sri Babu Reddy',
      otherBlessings: 'Smt. Parvathamma & Late Sri Vankayilu Rama Reddy',
            inviters: [
        { value: 'keerthi', label: 'Keerthi' },
        { value: 'ruchitha', label: 'Ruchitha' },
        { value: 'harshitha', label: 'Harshitha' },
      ],
      message: 'With the blessings of Smt. Shivamma and Sri Shiva Reddy, we invite you to celebrate Anusha’s wedding with Divakar.',
      shareMessage: 'Anusha’s family invites you to celebrate Anusha and Divakar’s wedding — AnuDivam.',
      venue: {
        name: 'Anusha’s family celebration venue',
        address: 'Tap below for the location of Haldi and Mehendi',
        mapQuery: 'https://maps.app.goo.gl/hQ7qwg4BFNdvSJB77',
      },
      ceremonies: [
        { id: 'bride-haldi', name: 'Haldi', telugu: 'పసుపు వేడుక', date: 'Friday, 20 November 2026', time: '12:00 p.m. to 3:00 p.m.', venue: 'Anusha’s family venue', detail: 'Join Anusha’s family for the Haldi celebration.', style: 'haldi', mapQuery: 'https://maps.app.goo.gl/hQ7qwg4BFNdvSJB77' },
        { id: 'bride-mehendi', name: 'Mehendi', telugu: 'మెహందీ', date: 'Friday, 20 November 2026', time: '4:00 p.m. to 9:00 p.m.', venue: 'Anusha’s family venue', detail: 'Celebrate Mehendi with Anusha’s family.', style: 'mehendi', mapQuery: 'https://maps.app.goo.gl/hQ7qwg4BFNdvSJB77' },
      ],
    },
    divakar: {
      label: 'Divakar’s family',
      familyName: 'Vankayilu Ram Reddy family',
      invitedBy: 'Smt. Sunitha & Sri Babu Reddy',
      blessingsOf: 'Smt. Parvathamma & Late Sri Vankayilu Rama Reddy',
      otherFamily: 'Smt. Shivamma & Sri Shivareddy',
      otherBlessings: 'Late Smt. Adilakshmamma & Sri Narasimhareddy',
            inviters: [
        { value: 'manohar', label: 'Manohar' },
      ],
      message: 'With the blessings of Smt. Sunitha and Sri Babu Reddy, we invite you to celebrate Divakar’s wedding with Anusha.',
      shareMessage: 'Divakar’s family invites you to celebrate Divakar and Anusha’s wedding — AnuDivam.',
      venue: {
        name: 'Divakar’s family celebration venue',
        address: 'Tap below for the location of Haldi and Mehendi',
        mapQuery: 'https://maps.app.goo.gl/aCPSEE3nKBmcxi5o8',
      },
      ceremonies: [
        { id: 'groom-haldi', name: 'Haldi', telugu: 'పసుపు వేడుక', date: 'Friday, 20 November 2026', time: '4:00 p.m. to 6:00 p.m.', venue: 'Divakar’s family venue', detail: 'Join Divakar’s family for the Haldi celebration.', style: 'haldi', mapQuery: 'https://maps.app.goo.gl/aCPSEE3nKBmcxi5o8' },
        { id: 'groom-mehendi', name: 'Mehendi', telugu: 'మెహందీ', date: 'Friday, 20 November 2026', time: '6:00 p.m. to 9:00 p.m.', venue: 'Divakar’s family venue', detail: 'Celebrate Mehendi with Divakar’s family.', style: 'mehendi', mapQuery: 'https://maps.app.goo.gl/aCPSEE3nKBmcxi5o8' },
      ],
    },
  },
  ceremonies: [
    { id: 'reception', name: 'The Reception', telugu: 'ఆత్మీయ విందు', date: 'Saturday, 21 November 2026', time: '7:00 p.m. onwards', venue: 'D.C. Anjaneyulu Convention Center', detail: 'An evening of celebration and dinner in Hindupura.', style: 'reception', mapQuery: 'D.C. Anjaneyulu Convention Center, Appala Kunta Main Road, Kirikera, Hindupura, Andhra Pradesh' },
    { id: 'wedding', name: 'The Wedding', telugu: 'శుభ వివాహం', date: 'Sunday, 22 November 2026', time: 'Muhurtham: 9:00 a.m. to 10:00 a.m.', venue: 'D.C. Anjaneyulu Convention Center', detail: 'Celebrate the auspicious Muhurtham with us.', style: 'wedding', mapQuery: 'D.C. Anjaneyulu Convention Center, Appala Kunta Main Road, Kirikera, Hindupura, Andhra Pradesh' },
  ],
}
