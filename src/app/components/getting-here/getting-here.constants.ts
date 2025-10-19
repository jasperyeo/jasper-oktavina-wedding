export const GETTING_HERE_CONTENT: any = {
  HEADING: 'getting here',
  CAR: {
    TITLE: 'By car',
    ICON: 'pi-car',
    INSTRUCTION: 'Hotel carpark',
    GMAP_URL: 'https://maps.app.goo.gl/cmwG5NiRn7ZvWWBH7',
    GMAP_ADDRESS: '1 Farrer Park Station Rd, Singapore 217562'
  },
  TRAIN: {
    TITLE: 'By train',
    ICON: null,
    INSTRUCTION: '- Travel to Farrer Park MRT Station (NE8) on the NE Line\n- Exit via Exit A\n- Estimated 3 mins walk',
    GMAP_URL: 'https://maps.app.goo.gl/duLWesta2knALxms9',
    GMAP_ADDRESS: '250 Race Course Rd, B1-02, Singapore 218703'
  },
  BUS: {
    TITLE: 'By bus',
    ICON: 'pi-truck',
    STATIONS: [
      {
        NUMBERS: ['131', '141'],
        NAME: 'Farrer Pk Stn Exit A',
        INSTRUCTION: '2 mins'
      },
      {
        NUMBERS: ['141'],
        NAME: 'Opp Farrer Pk Stn',
        INSTRUCTION: '2 mins'
      },
      {
        NUMBERS: ['21', '23', '64', '65', '67', '125', '130', '139', '141', '147', '857'],
        NAME: 'Aft Farrer Pk Stn Exit G',
        INSTRUCTION: '5 mins'
      }
    ]
  }
};