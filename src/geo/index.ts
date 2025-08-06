// Nigerian Geography Utilities
// Comprehensive data for states, LGAs, cities, and geopolitical zones

export interface State {
  name: string;
  capital: string;
  geoZone: string;
  lgas: string[];
  majorCities: string[];
}

export interface GeoZone {
  name: string;
  states: string[];
  description: string;
}

export interface City {
  name: string;
  state: string;
  type: "capital" | "major" | "minor";
}

// Nigerian States Data
const NIGERIAN_STATES: Record<string, State> = {
  Abia: {
    name: "Abia",
    capital: "Umuahia",
    geoZone: "South East",
    lgas: [
      "Aba North",
      "Aba South",
      "Arochukwu",
      "Bende",
      "Ikwuano",
      "Isiala Ngwa North",
      "Isiala Ngwa South",
      "Isuikwuato",
      "Obi Ngwa",
      "Ohafia",
      "Osisioma Ngwa",
      "Ugwunagbo",
      "Ukwa East",
      "Ukwa West",
      "Umuahia North",
      "Umuahia South",
      "Umu Nneochi",
    ],
    majorCities: ["Aba", "Umuahia", "Ohafia", "Arochukwu", "Bende"],
  },
  Adamawa: {
    name: "Adamawa",
    capital: "Yola",
    geoZone: "North East",
    lgas: [
      "Demsa",
      "Fufure",
      "Ganye",
      "Gayuk",
      "Gombi",
      "Grie",
      "Hong",
      "Jada",
      "Lamurde",
      "Madagali",
      "Maiha",
      "Mayo Belwa",
      "Michika",
      "Mubi North",
      "Mubi South",
      "Numan",
      "Shelleng",
      "Song",
      "Toungo",
      "Yola North",
      "Yola South",
    ],
    majorCities: ["Yola", "Mubi", "Jimeta", "Numan", "Ganye"],
  },
  "Akwa Ibom": {
    name: "Akwa Ibom",
    capital: "Uyo",
    geoZone: "South South",
    lgas: [
      "Abak",
      "Eastern Obolo",
      "Eket",
      "Esit Eket",
      "Essien Udim",
      "Etim Ekpo",
      "Etinan",
      "Ibeno",
      "Ibesikpo Asutan",
      "Ibiono-Ibom",
      "Ika",
      "Ikono",
      "Ikot Abasi",
      "Ikot Ekpene",
      "Ini",
      "Itu",
      "Mbo",
      "Mkpat-Enin",
      "Nsit-Atai",
      "Nsit-Ibom",
      "Nsit-Ubium",
      "Obot Akara",
      "Okobo",
      "Onna",
      "Oron",
      "Oruk Anam",
      "Udung-Uko",
      "Ukanafun",
      "Uruan",
      "Urue-Offong/Oruko",
      "Uyo",
    ],
    majorCities: ["Uyo", "Eket", "Ikot Ekpene", "Oron", "Abak"],
  },
  Anambra: {
    name: "Anambra",
    capital: "Awka",
    geoZone: "South East",
    lgas: [
      "Aguata",
      "Anambra East",
      "Anambra West",
      "Anaocha",
      "Awka North",
      "Awka South",
      "Ayamelum",
      "Dunukofia",
      "Ekwusigo",
      "Idemili North",
      "Idemili South",
      "Ihiala",
      "Njikoka",
      "Nnewi North",
      "Nnewi South",
      "Ogbaru",
      "Onitsha North",
      "Onitsha South",
      "Orumba North",
      "Orumba South",
      "Oyi",
    ],
    majorCities: ["Awka", "Onitsha", "Nnewi", "Aguata", "Ihiala"],
  },
  Bauchi: {
    name: "Bauchi",
    capital: "Bauchi",
    geoZone: "North East",
    lgas: [
      "Alkaleri",
      "Bauchi",
      "Bogoro",
      "Damban",
      "Darazo",
      "Dass",
      "Gamawa",
      "Ganjuwa",
      "Giade",
      "Itas/Gadau",
      "Jama'are",
      "Katagum",
      "Kirfi",
      "Misau",
      "Ningi",
      "Shira",
      "Tafawa Balewa",
      "Toro",
      "Warji",
      "Zaki",
    ],
    majorCities: ["Bauchi", "Azare", "Misau", "Jama'are", "Dass"],
  },
  Bayelsa: {
    name: "Bayelsa",
    capital: "Yenagoa",
    geoZone: "South South",
    lgas: ["Brass", "Ekeremor", "Kolokuma/Opokuma", "Nembe", "Ogbia", "Sagbama", "Southern Ijaw", "Yenagoa"],
    majorCities: ["Yenagoa", "Brass", "Nembe", "Sagbama", "Ogbia"],
  },
  Benue: {
    name: "Benue",
    capital: "Makurdi",
    geoZone: "North Central",
    lgas: [
      "Ado",
      "Agatu",
      "Apa",
      "Buruku",
      "Gboko",
      "Guma",
      "Gwer East",
      "Gwer West",
      "Katsina-Ala",
      "Konshisha",
      "Kwande",
      "Logo",
      "Makurdi",
      "Obi",
      "Ogbadibo",
      "Ohimini",
      "Oju",
      "Okpokwu",
      "Oturkpo",
      "Tarka",
      "Ukum",
      "Ushongo",
      "Vandeikya",
    ],
    majorCities: ["Makurdi", "Gboko", "Oturkpo", "Adikpo", "Katsina-Ala"],
  },
  Borno: {
    name: "Borno",
    capital: "Maiduguri",
    geoZone: "North East",
    lgas: [
      "Abadam",
      "Askira/Uba",
      "Bama",
      "Bayo",
      "Biu",
      "Chibok",
      "Damboa",
      "Dikwa",
      "Gubio",
      "Guzamala",
      "Gwoza",
      "Hawul",
      "Jere",
      "Kaga",
      "Kala/Balge",
      "Konduga",
      "Kukawa",
      "Kwaya Kusar",
      "Mafa",
      "Magumeri",
      "Maiduguri",
      "Marte",
      "Mobbar",
      "Monguno",
      "Ngala",
      "Nganzai",
      "Shani",
    ],
    majorCities: ["Maiduguri", "Biu", "Damboa", "Gwoza", "Bama"],
  },
  "Cross River": {
    name: "Cross River",
    capital: "Calabar",
    geoZone: "South South",
    lgas: [
      "Abi",
      "Akamkpa",
      "Akpabuyo",
      "Bakassi",
      "Bekwarra",
      "Biase",
      "Boki",
      "Calabar Municipal",
      "Calabar South",
      "Etung",
      "Ikom",
      "Obanliku",
      "Obubra",
      "Obudu",
      "Odukpani",
      "Ogoja",
      "Yakuur",
      "Yala",
    ],
    majorCities: ["Calabar", "Ogoja", "Ikom", "Obudu", "Boki"],
  },
  Delta: {
    name: "Delta",
    capital: "Asaba",
    geoZone: "South South",
    lgas: [
      "Aniocha North",
      "Aniocha South",
      "Bomadi",
      "Burutu",
      "Ethiope East",
      "Ethiope West",
      "Ika North East",
      "Ika South",
      "Isoko North",
      "Isoko South",
      "Ndokwa East",
      "Ndokwa West",
      "Okpe",
      "Oshimili North",
      "Oshimili South",
      "Patani",
      "Sapele",
      "Udu",
      "Ughelli North",
      "Ughelli South",
      "Ukwuani",
      "Uvwie",
      "Warri North",
      "Warri South",
      "Warri South West",
    ],
    majorCities: ["Asaba", "Warri", "Sapele", "Ughelli", "Agbor"],
  },
  Ebonyi: {
    name: "Ebonyi",
    capital: "Abakaliki",
    geoZone: "South East",
    lgas: [
      "Abakaliki",
      "Afikpo North",
      "Afikpo South",
      "Ebonyi",
      "Ezza North",
      "Ezza South",
      "Ikwo",
      "Ishielu",
      "Ivo",
      "Izzi",
      "Ohaozara",
      "Ohaukwu",
      "Onicha",
    ],
    majorCities: ["Abakaliki", "Afikpo", "Onueke", "Ezza", "Ikwo"],
  },
  Edo: {
    name: "Edo",
    capital: "Benin City",
    geoZone: "South South",
    lgas: [
      "Akoko-Edo",
      "Egor",
      "Esan Central",
      "Esan North-East",
      "Esan South-East",
      "Esan West",
      "Etsako Central",
      "Etsako East",
      "Etsako West",
      "Igueben",
      "Ikpoba Okha",
      "Oredo",
      "Orhionmwon",
      "Ovia North-East",
      "Ovia South-West",
      "Owan East",
      "Owan West",
      "Uhunmwonde",
    ],
    majorCities: ["Benin City", "Auchi", "Ekpoma", "Uromi", "Igueben"],
  },
  Ekiti: {
    name: "Ekiti",
    capital: "Ado Ekiti",
    geoZone: "South West",
    lgas: [
      "Ado Ekiti",
      "Efon",
      "Ekiti East",
      "Ekiti South-West",
      "Ekiti West",
      "Emure",
      "Gbonyin",
      "Ido Osi",
      "Ijero",
      "Ikere",
      "Ikole",
      "Ilejemeje",
      "Irepodun/Ifelodun",
      "Ise/Orun",
      "Moba",
      "Oye",
    ],
    majorCities: ["Ado Ekiti", "Ikere", "Ikole", "Ise", "Oye"],
  },
  Enugu: {
    name: "Enugu",
    capital: "Enugu",
    geoZone: "South East",
    lgas: [
      "Aninri",
      "Awgu",
      "Enugu East",
      "Enugu North",
      "Enugu South",
      "Ezeagu",
      "Igbo Etiti",
      "Igbo Eze North",
      "Igbo Eze South",
      "Isi Uzo",
      "Nkanu East",
      "Nkanu West",
      "Nsukka",
      "Oji River",
      "Udenu",
      "Udi",
      "Uzo-Uwani",
    ],
    majorCities: ["Enugu", "Nsukka", "Awgu", "Udi", "Nkanu"],
  },
  FCT: {
    name: "FCT",
    capital: "Abuja",
    geoZone: "North Central",
    lgas: ["Abaji", "Abuja Municipal", "Gwagwalada", "Kuje", "Kwali", "Kwali"],
    majorCities: ["Abuja", "Gwagwalada", "Kuje", "Abaji", "Kwali"],
  },
  Gombe: {
    name: "Gombe",
    capital: "Gombe",
    geoZone: "North East",
    lgas: [
      "Akko",
      "Balanga",
      "Billiri",
      "Dukku",
      "Funakaye",
      "Gombe",
      "Kaltungo",
      "Kwami",
      "Nafada",
      "Shongom",
      "Yamaltu/Deba",
    ],
    majorCities: ["Gombe", "Dukku", "Billiri", "Kaltungo", "Balanga"],
  },
  Imo: {
    name: "Imo",
    capital: "Owerri",
    geoZone: "South East",
    lgas: [
      "Aboh Mbaise",
      "Ahiazu Mbaise",
      "Ehime Mbano",
      "Ezinihitte",
      "Ideato North",
      "Ideato South",
      "Ihitte/Uboma",
      "Ikeduru",
      "Isiala Mbano",
      "Isu",
      "Mbaitoli",
      "Ngor Okpala",
      "Njaba",
      "Nkwerre",
      "Nwangele",
      "Obowo",
      "Oguta",
      "Ohaji/Egbema",
      "Okigwe",
      "Orlu",
      "Orsu",
      "Oru East",
      "Oru West",
      "Owerri Municipal",
      "Owerri North",
      "Owerri West",
      "Unuimo",
    ],
    majorCities: ["Owerri", "Orlu", "Okigwe", "Mbaise", "Oguta"],
  },
  Jigawa: {
    name: "Jigawa",
    capital: "Dutse",
    geoZone: "North West",
    lgas: [
      "Auyo",
      "Babura",
      "Biriniwa",
      "Birnin Kudu",
      "Buji",
      "Dutse",
      "Gagarawa",
      "Garki",
      "Gumel",
      "Guri",
      "Gwaram",
      "Gwiwa",
      "Hadejia",
      "Jahun",
      "Kafin Hausa",
      "Kaugama",
      "Kazaure",
      "Kiri Kasama",
      "Kiyawa",
      "Maigatari",
      "Malam Madori",
      "Miga",
      "Ringim",
      "Roni",
      "Sule Tankarkar",
      "Taura",
      "Yankwashi",
    ],
    majorCities: ["Dutse", "Hadejia", "Kazaure", "Gumel", "Birnin Kudu"],
  },
  Kaduna: {
    name: "Kaduna",
    capital: "Kaduna",
    geoZone: "North West",
    lgas: [
      "Birnin Gwari",
      "Chikun",
      "Giwa",
      "Igabi",
      "Ikara",
      "Jaba",
      "Jema'a",
      "Kachia",
      "Kaduna North",
      "Kaduna South",
      "Kagarko",
      "Kajuru",
      "Kaura",
      "Kauru",
      "Kubau",
      "Kudan",
      "Lere",
      "Makarfi",
      "Sabon Gari",
      "Sanga",
      "Soba",
      "Zangon Kataf",
      "Zaria",
    ],
    majorCities: ["Kaduna", "Zaria", "Kafanchan", "Kachia", "Birnin Gwari"],
  },
  Kano: {
    name: "Kano",
    capital: "Kano",
    geoZone: "North West",
    lgas: [
      "Ajingi",
      "Albasu",
      "Bagwai",
      "Bebeji",
      "Bichi",
      "Bunkure",
      "Dala",
      "Dambatta",
      "Dawakin Kudu",
      "Dawakin Tofa",
      "Doguwa",
      "Fagge",
      "Gabasawa",
      "Garko",
      "Garun Mallam",
      "Gaya",
      "Gezawa",
      "Gwale",
      "Gwarzo",
      "Kabo",
      "Kano Municipal",
      "Karaye",
      "Kibiya",
      "Kiru",
      "Kumbotso",
      "Kunchi",
      "Kura",
      "Madobi",
      "Makoda",
      "Minjibir",
      "Nasarawa",
      "Rano",
      "Rimin Gado",
      "Rogo",
      "Shanono",
      "Sumaila",
      "Takai",
      "Tarauni",
      "Tofa",
      "Tsanyawa",
      "Tudun Wada",
      "Ungogo",
      "Warawa",
      "Wudil",
    ],
    majorCities: ["Kano", "Fagge", "Ungogo", "Dala", "Municipal"],
  },
  Katsina: {
    name: "Katsina",
    capital: "Katsina",
    geoZone: "North West",
    lgas: [
      "Bakori",
      "Batagarawa",
      "Batsari",
      "Baure",
      "Bindawa",
      "Charanchi",
      "Dandume",
      "Danja",
      "Dan Musa",
      "Daura",
      "Dutsi",
      "Dutsin Ma",
      "Faskari",
      "Funtua",
      "Ingawa",
      "Jibia",
      "Kafur",
      "Kaita",
      "Kankara",
      "Kankia",
      "Katsina",
      "Kurfi",
      "Kusada",
      "Mai'Adua",
      "Malumfashi",
      "Mani",
      "Mashi",
      "Matazu",
      "Musawa",
      "Rimi",
      "Sabuwa",
      "Safana",
      "Sandamu",
      "Zango",
    ],
    majorCities: ["Katsina", "Funtua", "Daura", "Malumfashi", "Mani"],
  },
  Kebbi: {
    name: "Kebbi",
    capital: "Birnin Kebbi",
    geoZone: "North West",
    lgas: [
      "Aleiro",
      "Arewa Dandi",
      "Argungu",
      "Augie",
      "Bagudo",
      "Birnin Kebbi",
      "Bunza",
      "Dandi",
      "Fakai",
      "Gwandu",
      "Jega",
      "Kalgo",
      "Koko/Besse",
      "Maiyama",
      "Ngaski",
      "Sakaba",
      "Shanga",
      "Suru",
      "Wasagu/Danko",
      "Yauri",
      "Zuru",
    ],
    majorCities: ["Birnin Kebbi", "Argungu", "Jega", "Yauri", "Zuru"],
  },
  Kogi: {
    name: "Kogi",
    capital: "Lokoja",
    geoZone: "North Central",
    lgas: [
      "Adavi",
      "Ajaokuta",
      "Ankpa",
      "Bassa",
      "Dekina",
      "Ibaji",
      "Idah",
      "Igalamela-Odolu",
      "Ijumu",
      "Kabba/Bunu",
      "Kogi",
      "Lokoja",
      "Mopa-Muro",
      "Ofu",
      "Ogori/Magongo",
      "Okehi",
      "Okene",
      "Olamaboro",
      "Omala",
      "Yagba East",
      "Yagba West",
    ],
    majorCities: ["Lokoja", "Okene", "Idah", "Kabba", "Ankpa"],
  },
  Kwara: {
    name: "Kwara",
    capital: "Ilorin",
    geoZone: "North Central",
    lgas: [
      "Asa",
      "Baruten",
      "Edu",
      "Ekiti",
      "Ifelodun",
      "Ilorin East",
      "Ilorin South",
      "Ilorin West",
      "Irepodun",
      "Isin",
      "Kaiama",
      "Moro",
      "Offa",
      "Oke Ero",
      "Oyun",
      "Pategi",
    ],
    majorCities: ["Ilorin", "Offa", "Omu-Aran", "Jebba", "Lafiagi"],
  },
  Lagos: {
    name: "Lagos",
    capital: "Ikeja",
    geoZone: "South West",
    lgas: [
      "Agege",
      "Ajeromi-Ifelodun",
      "Alimosho",
      "Amuwo-Odofin",
      "Apapa",
      "Badagry",
      "Epe",
      "Eti Osa",
      "Ibeju-Lekki",
      "Ifako-Ijaiye",
      "Ikeja",
      "Ikorodu",
      "Kosofe",
      "Lagos Island",
      "Lagos Mainland",
      "Mushin",
      "Ojo",
      "Oshodi-Isolo",
      "Shomolu",
      "Surulere",
    ],
    majorCities: ["Lagos", "Ikeja", "Victoria Island", "Ikorodu", "Epe"],
  },
  Nasarawa: {
    name: "Nasarawa",
    capital: "Lafia",
    geoZone: "North Central",
    lgas: [
      "Akwanga",
      "Awe",
      "Doma",
      "Karu",
      "Keana",
      "Keffi",
      "Kokona",
      "Lafia",
      "Nasarawa",
      "Nasarawa Egon",
      "Obi",
      "Toto",
      "Wamba",
    ],
    majorCities: ["Lafia", "Keffi", "Akwanga", "Nasarawa", "Karu"],
  },
  Niger: {
    name: "Niger",
    capital: "Minna",
    geoZone: "North Central",
    lgas: [
      "Agaie",
      "Agwara",
      "Bida",
      "Borgu",
      "Bosso",
      "Chanchaga",
      "Edati",
      "Gbako",
      "Gurara",
      "Katcha",
      "Kontagora",
      "Lapai",
      "Lavun",
      "Magama",
      "Mariga",
      "Mashegu",
      "Mokwa",
      "Moya",
      "Paikoro",
      "Rafi",
      "Rijau",
      "Shiroro",
      "Suleja",
      "Tafa",
      "Wushishi",
    ],
    majorCities: ["Minna", "Bida", "Suleja", "Kontagora", "Lapai"],
  },
  Ogun: {
    name: "Ogun",
    capital: "Abeokuta",
    geoZone: "South West",
    lgas: [
      "Abeokuta North",
      "Abeokuta South",
      "Ado-Odo/Ota",
      "Egbado North",
      "Egbado South",
      "Ewekoro",
      "Ifo",
      "Ijebu East",
      "Ijebu North",
      "Ijebu North East",
      "Ijebu Ode",
      "Ikenne",
      "Imeko Afon",
      "Ipokia",
      "Obafemi Owode",
      "Odeda",
      "Odogbolu",
      "Ogun Waterside",
      "Remo North",
      "Sagamu",
    ],
    majorCities: ["Abeokuta", "Sagamu", "Ijebu Ode", "Ota", "Ikenne"],
  },
  Ondo: {
    name: "Ondo",
    capital: "Akure",
    geoZone: "South West",
    lgas: [
      "Akoko North-East",
      "Akoko North-West",
      "Akoko South-East",
      "Akoko South-West",
      "Akure North",
      "Akure South",
      "Ese Odo",
      "Idanre",
      "Ifedore",
      "Ilaje",
      "Ile Oluji/Okeigbo",
      "Irele",
      "Odigbo",
      "Okitipupa",
      "Ondo East",
      "Ondo West",
      "Ose",
      "Owo",
    ],
    majorCities: ["Akure", "Ondo", "Owo", "Okitipupa", "Ile-Oluji"],
  },
  Osun: {
    name: "Osun",
    capital: "Oshogbo",
    geoZone: "South West",
    lgas: [
      "Aiyedade",
      "Aiyedire",
      "Atakunmosa East",
      "Atakunmosa West",
      "Boluwaduro",
      "Boripe",
      "Ede North",
      "Ede South",
      "Egbedore",
      "Ejigbo",
      "Ife Central",
      "Ife East",
      "Ife North",
      "Ife South",
      "Ifedayo",
      "Ifelodun",
      "Ila",
      "Ilesa East",
      "Ilesa West",
      "Irepodun",
      "Irewole",
      "Isokan",
      "Iwo",
      "Obokun",
      "Odo Otin",
      "Ola Oluwa",
      "Olorunda",
      "Oriade",
      "Orolu",
      "Osogbo",
    ],
    majorCities: ["Oshogbo", "Ile-Ife", "Ilesa", "Iwo", "Ede"],
  },
  Oyo: {
    name: "Oyo",
    capital: "Ibadan",
    geoZone: "South West",
    lgas: [
      "Afijio",
      "Akinyele",
      "Atiba",
      "Atisbo",
      "Egbeda",
      "Ibadan North",
      "Ibadan North-East",
      "Ibadan North-West",
      "Ibadan South-East",
      "Ibadan South-West",
      "Ibarapa Central",
      "Ibarapa East",
      "Ibarapa North",
      "Ido",
      "Irepo",
      "Iseyin",
      "Itesiwaju",
      "Iwajowa",
      "Kajola",
      "Lagelu",
      "Ogbomosho North",
      "Ogbomosho South",
      "Ogo Oluwa",
      "Olorunsogo",
      "Oluyole",
      "Ona Ara",
      "Orelope",
      "Ori Ire",
      "Oyo East",
      "Oyo West",
      "Saki East",
      "Saki West",
      "Surulere",
    ],
    majorCities: ["Ibadan", "Ogbomosho", "Oyo", "Saki", "Iseyin"],
  },
  Plateau: {
    name: "Plateau",
    capital: "Jos",
    geoZone: "North Central",
    lgas: [
      "Barkin Ladi",
      "Bassa",
      "Bokkos",
      "Jos East",
      "Jos North",
      "Jos South",
      "Kanam",
      "Kanke",
      "Langtang North",
      "Langtang South",
      "Mangu",
      "Mikang",
      "Pankshin",
      "Qua'an Pan",
      "Riyom",
      "Shendam",
      "Wase",
    ],
    majorCities: ["Jos", "Pankshin", "Shendam", "Langtang", "Mangu"],
  },
  Rivers: {
    name: "Rivers",
    capital: "Port Harcourt",
    geoZone: "South South",
    lgas: [
      "Abua/Odual",
      "Ahoada East",
      "Ahoada West",
      "Akuku-Toru",
      "Andoni",
      "Asari-Toru",
      "Bonny",
      "Degema",
      "Eleme",
      "Emohua",
      "Etche",
      "Gokana",
      "Ikwerre",
      "Khana",
      "Obio/Akpor",
      "Ogba/Egbema/Ndoni",
      "Ogu/Bolo",
      "Okrika",
      "Omuma",
      "Opobo/Nkoro",
      "Oyigbo",
      "Port Harcourt",
      "Tai",
    ],
    majorCities: ["Port Harcourt", "Okrika", "Bonny", "Ahoada", "Omoku"],
  },
  Sokoto: {
    name: "Sokoto",
    capital: "Sokoto",
    geoZone: "North West",
    lgas: [
      "Binji",
      "Bodinga",
      "Dange Shuni",
      "Gada",
      "Goronyo",
      "Gudu",
      "Gwadabawa",
      "Illela",
      "Isa",
      "Kebbe",
      "Kware",
      "Rabah",
      "Sabon Birni",
      "Shagari",
      "Silame",
      "Sokoto North",
      "Sokoto South",
      "Tambuwal",
      "Tangaza",
      "Tureta",
      "Wamako",
      "Wurno",
      "Yabo",
    ],
    majorCities: ["Sokoto", "Tambuwal", "Gusau", "Kebbe", "Goronyo"],
  },
  Taraba: {
    name: "Taraba",
    capital: "Jalingo",
    geoZone: "North East",
    lgas: [
      "Ardo Kola",
      "Bali",
      "Donga",
      "Gashaka",
      "Gassol",
      "Ibi",
      "Jalingo",
      "Karim Lamido",
      "Kurmi",
      "Lau",
      "Sardauna",
      "Takum",
      "Ussa",
      "Wukari",
      "Yorro",
      "Zing",
    ],
    majorCities: ["Jalingo", "Wukari", "Takum", "Bali", "Gassol"],
  },
  Yobe: {
    name: "Yobe",
    capital: "Damaturu",
    geoZone: "North East",
    lgas: [
      "Bade",
      "Bursari",
      "Damaturu",
      "Fika",
      "Fune",
      "Geidam",
      "Gujba",
      "Gulani",
      "Jakusko",
      "Karasuwa",
      "Machina",
      "Nangere",
      "Nguru",
      "Potiskum",
      "Tarmuwa",
      "Yunusari",
      "Yusufari",
    ],
    majorCities: ["Damaturu", "Potiskum", "Gashua", "Nguru", "Geidam"],
  },
  Zamfara: {
    name: "Zamfara",
    capital: "Gusau",
    geoZone: "North West",
    lgas: [
      "Anka",
      "Bakura",
      "Birnin Magaji/Kiyaw",
      "Bukkuyum",
      "Bungudu",
      "Gummi",
      "Gusau",
      "Kaura Namoda",
      "Maradun",
      "Maru",
      "Shinkafi",
      "Talata Mafara",
      "Chafe",
      "Zurmi",
    ],
    majorCities: ["Gusau", "Kaura Namoda", "Talata Mafara", "Anka", "Bungudu"],
  },
};

// Geopolitical Zones
const GEO_ZONES: Record<string, GeoZone> = {
  "North Central": {
    name: "North Central",
    states: ["Benue", "FCT", "Kogi", "Kwara", "Nasarawa", "Niger", "Plateau"],
    description:
      "Also known as the Middle Belt, this zone is known for its agricultural activities and diverse ethnic groups.",
  },
  "North East": {
    name: "North East",
    states: ["Adamawa", "Bauchi", "Borno", "Gombe", "Taraba", "Yobe"],
    description: "This zone is known for its rich cultural heritage and agricultural production.",
  },
  "North West": {
    name: "North West",
    states: ["Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Sokoto", "Zamfara"],
    description: "The largest geopolitical zone, known for commerce, agriculture, and Islamic culture.",
  },
  "South East": {
    name: "South East",
    states: ["Abia", "Anambra", "Ebonyi", "Enugu", "Imo"],
    description: "Known for commerce, industry, and entrepreneurial spirit.",
  },
  "South South": {
    name: "South South",
    states: ["Akwa Ibom", "Bayelsa", "Cross River", "Delta", "Edo", "Rivers"],
    description: "The oil-producing region of Nigeria, rich in natural resources.",
  },
  "South West": {
    name: "South West",
    states: ["Ekiti", "Lagos", "Ogun", "Ondo", "Osun", "Oyo"],
    description: "Known for commerce, education, and cultural heritage.",
  },
};

/**
 * Get all Nigerian states
 *
 * @public
 * @returns Array of all Nigerian state names
 *
 * @example
 * ```typescript
 * getStates(); // ['Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', ...]
 * ```
 */
export function getStates(): string[] {
  return Object.keys(NIGERIAN_STATES);
}

/**
 * Get LGAs for a specific state
 *
 * @public
 * @param state - State name
 * @returns Array of LGA names for the state
 *
 * @example
 * ```typescript
 * getLGAs('Lagos'); // ['Agege', 'Ajeromi-Ifelodun', 'Alimosho', ...]
 * ```
 */
export function getLGAs(state: string): string[] {
  const stateData = NIGERIAN_STATES[state];
  return stateData ? stateData.lgas : [];
}

/**
 * Get major cities for a specific state
 *
 * @public
 * @param state - State name
 * @returns Array of major city names for the state
 *
 * @example
 * ```typescript
 * getCities('Lagos'); // ['Lagos', 'Ikeja', 'Victoria Island', ...]
 * ```
 */
export function getCities(state: string): string[] {
  const stateData = NIGERIAN_STATES[state];
  return stateData ? stateData.majorCities : [];
}

/**
 * Get the capital city of a state
 *
 * @public
 * @param state - State name
 * @returns Capital city name
 *
 * @example
 * ```typescript
 * getCapital('Lagos'); // 'Ikeja'
 * ```
 */
export function getCapital(state: string): string {
  const stateData = NIGERIAN_STATES[state];
  return stateData ? stateData.capital : "";
}

/**
 * Get the geopolitical zone of a state
 *
 * @public
 * @param state - State name
 * @returns Geopolitical zone name
 *
 * @example
 * ```typescript
 * getGeoZone('Lagos'); // 'South West'
 * ```
 */
export function getGeoZone(state: string): string {
  const stateData = NIGERIAN_STATES[state];
  return stateData ? stateData.geoZone : "";
}

/**
 * Get all states in a geopolitical zone
 *
 * @public
 * @param geoZone - Geopolitical zone name
 * @returns Array of state names in the zone
 *
 * @example
 * ```typescript
 * getStatesByZone('South West'); // ['Ekiti', 'Lagos', 'Ogun', ...]
 * ```
 */
export function getStatesByZone(geoZone: string): string[] {
  const zoneData = GEO_ZONES[geoZone];
  return zoneData ? zoneData.states : [];
}

/**
 * Get all geopolitical zones
 *
 * @public
 * @returns Array of geopolitical zone names
 *
 * @example
 * ```typescript
 * getGeoZones(); // ['North Central', 'North East', 'North West', ...]
 * ```
 */
export function getGeoZones(): string[] {
  return Object.keys(GEO_ZONES);
}

/**
 * Get detailed information about a state
 *
 * @public
 * @param state - State name
 * @returns State object with complete information or null if not found
 *
 * @example
 * ```typescript
 * getStateInfo('Lagos');
 * // {
 * //   name: 'Lagos',
 * //   capital: 'Ikeja',
 * //   geoZone: 'South West',
 * //   lgas: ['Agege', 'Ajeromi-Ifelodun', ...],
 * //   majorCities: ['Lagos', 'Ikeja', 'Victoria Island', ...]
 * // }
 * ```
 */
export function getStateInfo(state: string): State | null {
  return NIGERIAN_STATES[state] || null;
}

/**
 * Get detailed information about a geopolitical zone
 *
 * @public
 * @param geoZone - Geopolitical zone name
 * @returns GeoZone object with complete information
 *
 * @example
 * ```typescript
 * getZoneInfo('South West');
 * // {
 * //   name: 'South West',
 * //   states: ['Ekiti', 'Lagos', 'Ogun', ...],
 * //   description: 'Known for commerce, education, and cultural heritage.'
 * // }
 * ```
 */
export function getZoneInfo(geoZone: string): GeoZone | null {
  return GEO_ZONES[geoZone] || null;
}

/**
 * Search for states by name (case-insensitive)
 *
 * @public
 * @param query - Search query
 * @returns Array of matching state names
 *
 * @example
 * ```typescript
 * searchStates('lag'); // ['Lagos']
 * searchStates('kan'); // ['Kano', 'Katsina', 'Kebbi']
 * ```
 */
export function searchStates(query: string): string[] {
  if (!query) return getStates();
  const searchTerm = query.toLowerCase();
  return getStates().filter((state) => state.toLowerCase().includes(searchTerm));
}

/**
 * Search for cities by name (case-insensitive)
 *
 * @public
 * @param query - Search query
 * @returns Array of matching city names with their states
 *
 * @example
 * ```typescript
 * searchCities('lag'); // [{name: 'Lagos', state: 'Lagos'}, ...]
 * ```
 */
export function searchCities(query: string): City[] {
  if (!query) return [];
  const searchTerm = query.toLowerCase();
  const results: City[] = [];

  getStates().forEach((state) => {
    const cities = getCities(state);
    cities.forEach((city) => {
      if (city.toLowerCase().includes(searchTerm)) {
        results.push({
          name: city,
          state,
          type: city === getCapital(state) ? "capital" : "major",
        });
      }
    });
  });

  return results;
}

/**
 * Get all cities in Nigeria
 *
 * @public
 * @returns Array of all cities with their states
 *
 * @example
 * ```typescript
 * getAllCities(); // [{name: 'Lagos', state: 'Lagos'}, ...]
 * ```
 */
export function getAllCities(): City[] {
  const cities: City[] = [];

  getStates().forEach((state) => {
    const stateCities = getCities(state);
    stateCities.forEach((city) => {
      cities.push({
        name: city,
        state,
        type: city === getCapital(state) ? "capital" : "major",
      });
    });
  });

  return cities;
}

/**
 * Validate if a state name is valid
 *
 * @public
 * @param state - State name to validate
 * @returns True if state exists
 *
 * @example
 * ```typescript
 * isValidState('Lagos'); // true
 * isValidState('Invalid'); // false
 * ```
 */
export function isValidState(state: string): boolean {
  return state in NIGERIAN_STATES;
}

/**
 * Validate if a geopolitical zone name is valid
 *
 * @public
 * @param geoZone - Geopolitical zone name to validate
 * @returns True if zone exists
 *
 * @example
 * ```typescript
 * isValidGeoZone('South West'); // true
 * isValidGeoZone('Invalid'); // false
 * ```
 */
export function isValidGeoZone(geoZone: string): boolean {
  return geoZone in GEO_ZONES;
}
