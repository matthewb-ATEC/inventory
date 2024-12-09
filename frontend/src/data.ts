export const catalog = [
  {
    id: 0,
    name: 'Walkable Ceiling',
    vendor: 'Plascore',
    size: '58 x 120',
    units: 'inches',
    tag: 'CP1',
  },
  {
    id: 1,
    name: 'Walkable Ceiling',
    vendor: 'Plascore',
    size: '58 x 120',
    units: 'inches',
    tag: 'CP1-E',
  },
]

export const projects = [
  { number: 22010, name: 'CRB - Merck Freedom V Construction' },
  { number: 23012, name: 'Gilbane Pfizer MAP' },
  { number: 23013, name: 'KBI - Hamlin CNC' },
  { number: 23016, name: 'Jacobs FDBU DSM-1 Construction' },
  { number: 23022, name: 'Jacobs FDBU DSM-2 Construction' },
  { number: 23028, name: 'Whiting Turner-Enzyvant' },
  { number: 23032, name: 'Jacobs - FDBU DPFG Const.' },
  { number: 23033, name: 'DSM Packaging Suite' },
  { number: 23034, name: 'Pfizer Fill Line Plascore Inst' },
  { number: 23035, name: 'Nycom / VIMS Project' },
  { number: 23037, name: 'Jacobs-Merck Elkton B5C; Weigh' },
  { number: 24010, name: 'CRB-Kindeva Project Phoenix' },
  { number: 24011, name: 'JE Dunn - Fuji Warehouse' },
  { number: 24013, name: 'Donaldson - IsolereBio Lab Fit-UP' },
  { number: 24015, name: 'Messer Lilly LP2' },
  { number: 24022, name: 'NIST Multitool Install' },
  { number: 24023, name: 'KBI - CC2 Skin Walls' },
  { number: 24024, name: 'UPSi - Cleanroom Pen' },
  { number: 24027, name: 'EMD - Clean Hood & Storage' },
  { number: 25010, name: 'CRB AstraZeneca 9950 MCD' },
  { number: 25011, name: 'Novo Service 2024' },
  { number: 25012, name: 'Fluor LP1 Design' },
  { number: 25013, name: 'Ecolab Window Replacement' },
  { number: 25014, name: 'CRB-BioBloom Design' },
  { number: 25015, name: 'Indivior Raleigh PFS Project' },
  { number: 25016, name: 'KBI-Wall Cladding' },
  { number: 25017, name: 'CRB Gracell Design' },
  { number: 25018, name: 'UPSi Galaxy Repair' },
  { number: 25019, name: 'Jacobs FDB Aura' },
  { number: 25020, name: 'Silfex Air Balance' },
  { number: 25021, name: 'GWU Clean-up' },
  { number: 25099, name: 'WHSE Fab Improvement' },
]

export const inventory = [
  {
    id: 0,
    material: catalog[0],
    project: projects[0],
    quantity: 200,
    sqft: 0,
  },
  {
    id: 1,
    material: catalog[0],
    project: projects[1],
    quantity: 100,
    sqft: 0,
  },
  {
    id: 2,
    material: catalog[1],
    project: projects[1],
    quantity: 50,
    sqft: 0,
  },
]

export const vendors = ['Plascore']
