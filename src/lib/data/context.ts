// Ported from ListingHub_Django/App/context_processors.py.
// Each Django global_<name>(request) function becomes an exported `const <name>`.
// Image paths have the Django static prefix stripped (Astro serves public/ at /).
// Plan 2 page ports import from here. A later plan replaces these with live Supabase reads.

// brands data
export const brands = [
  {
    img: '/assets/img/brand/logo-1.png',
  },
  {
    img: '/assets/img/brand/logo-2.png',
  },
  {
    img: '/assets/img/brand/logo-3.png',
  },
  {
    img: '/assets/img/brand/logo-4.png',
  },
  {
    img: '/assets/img/brand/logo-5.png',
  },
  {
    img: '/assets/img/brand/logo-6.png',
  },
] as const;

// categories data
export const categories = [
  {
    icon: 'bi bi-backpack',
    title: 'Showroom',
    lists: '103 Lists',
  },
  {
    icon: 'bi bi-basket2',
    title: 'Fashion & Beauty',
    lists: '110 Lists',
  },
  {
    icon: 'bi bi-house-check',
    title: 'Real Estate',
    lists: '35 Lists',
  },
  {
    icon: 'fa-solid fa-dumbbell',
    title: 'Health & Fitness',
    lists: '120 Lists',
  },
  {
    icon: 'bi bi-shop',
    title: 'Business Shp',
    lists: '69 Lists',
  },
  {
    icon: 'bi bi-cup-hot',
    title: 'Coffe Shop',
    lists: '78 Lists',
  },
  {
    icon: 'bi bi-cup-straw',
    title: 'Restaurants',
    lists: '69 Lists',
  },
  {
    icon: 'bi bi-lungs',
    title: 'Hospital & Med',
    lists: '75 Lists',
  },
  {
    icon: 'bi bi-lamp',
    title: 'Wedding & Events',
    lists: '16 Lists',
  },
  {
    icon: 'bi bi-mortarboard',
    title: 'Education',
    lists: '62 Lists',
  },
] as const;

// listings data
export const listings = [
  {
    id: 1,
    img: '/assets/img/list-1.jpg',
    img1: '/assets/img/team-1.jpg',
    title: 'The Big Bumbble Gym',
    desc: 'Cicero famously orated against his political.',
    number: '+42 515 635 4758',
    miles: '2.4 miles',
    name: 'Fitness',
    icon: 'fa-solid fa-dumbbell',
    span: 'catIcon cats-1',
    plus: '+2',
    rating: '4.5',
    avarage: 'good',
    reviews: '46 Reviews',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$',
    btn1: 'Featured',
    tag: 'true',
  },
  {
    id: 2,
    img: '/assets/img/list-2.jpg',
    img1: '/assets/img/team-2.jpg',
    title: 'Greenvally Real Estate',
    desc: 'Cicero famously orated against his political.',
    number: '+42 515 635 6150',
    miles: '3.7 miles',
    name: 'Real Estate',
    icon: 'bi bi-house-check',
    span: 'catIcon cats-2',
    plus: '+2',
    rating: '4.3',
    avarage: 'midium',
    reviews: '35 Reviews',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$$',
    btn1: '',
    tag: 'false',
  },
  {
    id: 3,
    img: '/assets/img/list-3.jpg',
    img1: '/assets/img/team-3.jpg',
    title: 'Shree Wedding Planner',
    desc: 'Cicero famously orated against his political.',
    number: '+42 515 635 4785',
    miles: '2.7 miles',
    name: 'Weddings',
    icon: 'bi bi-lamp',
    span: 'catIcon cats-3',
    plus: '+1',
    rating: '4.8',
    avarage: 'excellent py-1 px-2 fw-semibold',
    reviews: '12 Reviews',
    btn: 'Closed',
    color: 'listClose',
    dollar: '$$$',
    btn1: 'Featured',
    tag: 'true',
  },
  {
    id: 4,
    img: '/assets/img/list-4.jpg',
    img1: '/assets/img/team-4.jpg',
    title: 'The Blue Ley Light',
    desc: 'Cicero famously orated against his political.',
    number: '+42 515 635 6358',
    miles: '5.2 miles',
    name: 'Restaurant',
    icon: 'bi bi-cup-straw',
    span: 'catIcon cats-4',
    plus: '+1',
    rating: '4.6',
    avarage: 'good',
    reviews: '72 Reviews',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$$',
    btn1: '',
    tag: 'false',
  },
  {
    id: 5,
    img: '/assets/img/list-5.jpg',
    img1: '/assets/img/team-5.jpg',
    title: 'Shreya Study Center',
    desc: 'Cicero famously orated against his political.',
    number: '+42 515 635 0210',
    miles: '3.8 miles',
    name: 'Education',
    icon: 'bi bi-mortarboard',
    span: 'catIcon cats-5',
    plus: '+1',
    rating: '4.2',
    avarage: 'midium',
    reviews: '112 Reviews',
    btn: 'Closed',
    color: 'listClose',
    dollar: '$$$',
    btn1: 'Featured',
    tag: 'true',
  },
  {
    id: 6,
    img: '/assets/img/list-6.jpg',
    img1: '/assets/img/team-6.jpg',
    title: 'Mahroom Garage & Workshop',
    desc: 'Cicero famously orated against his political.',
    number: '+42 515 635 3251',
    miles: '2.4 miles',
    name: 'Showroom',
    icon: 'bi bi-backpack',
    span: 'catIcon cats-6',
    plus: '+1',
    rating: '4.9',
    avarage: 'excellent',
    reviews: '52 Reviews',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$$',
    btn1: '',
    tag: 'false',
  },
  {
    id: 7,
    img: '/assets/img/list-9.jpg',
    img1: '/assets/img/team-7.jpg',
    title: 'The Great Dream Palace',
    desc: 'Cicero famously orated against his political.',
    number: '+42 515 635 5426',
    miles: '4.2 miles',
    name: 'Eat & Drink',
    icon: 'bi bi-cup-hot',
    span: 'catIcon cats-7',
    plus: '+2',
    rating: '4.9',
    avarage: 'excellent',
    reviews: '42 Reviews',
    btn: 'Closed',
    color: 'listClose',
    dollar: '$$$',
    btn1: 'Featured',
    tag: 'true',
  },
  {
    id: 8,
    img: '/assets/img/list-8.jpg',
    img1: '/assets/img/team-8.jpg',
    title: 'Agroo Spa & Massage Center',
    desc: 'Cicero famously orated against his political.',
    number: '+42 515 635 2136',
    miles: '1.2 miles',
    name: 'Spa & Beauty',
    icon: 'bi bi-basket2',
    span: 'catIcon cats-8',
    plus: '+1',
    rating: '4.7',
    avarage: 'good',
    reviews: '76 Reviews',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$',
    btn1: 'Featured',
    tag: 'true',
  },
] as const;

// reviews data
export const reviews = [
  {
    img: '/assets/img/team-2.jpg',
    name: 'Aman Diwakar',
    name1: 'General Manager',
    title: 'One of the Superb Platform',
    desc: "Absolutely love Advertize! whenever I'm in need of finding a job, Advertize is my #1 go to! wouldn't look anywhere else.",
  },
  {
    img: '/assets/img/team-3.jpg',
    name: 'Ridhika K. Sweta',
    name1: 'CEO of Agreeo',
    title: 'One of the Superb Platform',
    desc: 'Overall, the Advertize application is a powerful tool for anyone in the job market. Its reliability, extensive job listings, and user-friendly..',
  },
  {
    img: '/assets/img/team-4.jpg',
    name: 'Shushil Kumar Yadav',
    name1: 'Brand Manager',
    title: 'One of the Superb Platform',
    desc: "I love this Advertize app. it's more legit than the other ones with advertisement. Once I uploaded my resume, then employers...",
  },
  {
    img: '/assets/img/team-5.jpg',
    name: 'Ritika K. Mishra',
    name1: 'HR Head at Google',
    title: 'One of the Superb Platform',
    desc: 'Advertize the best job finder app out there right now.. they also protect you from spammers so the only emails I get due to...',
  },
  {
    img: '/assets/img/team-6.jpg',
    name: 'Shree K. Patel',
    name1: 'Chief Executive',
    title: 'One of the Superb Platform',
    desc: 'Advertize the best job finder app out there right now.. they also protect you from spammers so the only emails I get due to...',
  },
  {
    img: '/assets/img/team-7.jpg',
    name: 'Sarwan Kumar Patel',
    name1: 'Chief Executive',
    title: 'One of the Superb Platform',
    desc: 'Advertize the best job finder app out there right now.. they also protect you from spammers so the only emails I get due to...',
  },
] as const;

// blogs data
export const blogs = [
  {
    id: 1,
    img: '/assets/img/blog-2.jpg',
    title: '10 Must-Have Bootstrap Templates for Modern Web Design',
    desc: "Think of a news blog that's filled with content political against opponent Lucius Sergius Catilina. Hourly on the day of going live.",
    date: '12 Feb 2025',
    views: '12k Views',
  },
  {
    id: 2,
    img: '/assets/img/blog-1.jpg',
    title: 'Top 5 Bootstrap Themes for E-commerce Websites.',
    desc: "Think of a news blog that's filled with content political against opponent Lucius Sergius Catilina. Hourly on the day of going live.",
    date: '10 Jan 2025',
    views: '33k Views',
  },
  {
    id: 3,
    img: '/assets/img/blog-3.jpg',
    title: 'The Ultimate Guide to Customizing Bootstrap Templates',
    desc: "Think of a news blog that's filled with content political against opponent Lucius Sergius Catilina. Hourly on the day of going live.",
    date: '07 March 2025',
    views: '15k Views',
  },
  {
    id: 4,
    img: '/assets/img/blog-4.jpg',
    title: 'Top 10 Free Bootstrap Templates for Your Next Project',
    desc: "Think of a news blog that's filled with content political against opponent Lucius Sergius Catilina. Hourly on the day of going live.",
    date: '12 Feb 2025',
    views: '12k Views',
  },
  {
    id: 5,
    img: '/assets/img/blog-5.jpg',
    title: 'Creating Stunning Landing Pages with Bootstrap: Best Practices',
    desc: "Think of a news blog that's filled with content political against opponent Lucius Sergius Catilina. Hourly on the day of going live.",
    date: '17 Jan 2025',
    views: '33k Views',
  },
  {
    id: 6,
    img: '/assets/img/blog-6.jpg',
    title: 'The Benefits of Using Bootstrap for Your Web Development Projects',
    desc: "Think of a news blog that's filled with content political against opponent Lucius Sergius Catilina. Hourly on the day of going live.",
    date: '07 March 2025',
    views: '15k Views',
  },
] as const;

// categories2 data
export const categories2 = [
  {
    img: '/assets/img/cats/catt-1.jpg',
    icon: 'bi bi-backpack',
    title: 'Showrooms',
    lists: '31 Lists',
  },
  {
    img: '/assets/img/cats/catt-2.jpg',
    icon: 'bi bi-basket2',
    title: 'Fashion & Beauty',
    lists: '75 Lists',
  },
  {
    img: '/assets/img/cats/catt-3.jpg',
    icon: 'bi bi-house-check',
    title: 'Real Estate',
    lists: '34 Lists',
  },
  {
    img: '/assets/img/cats/catt-4.jpg',
    icon: 'fa-solid fa-dumbbell',
    title: 'Health & Fitness',
    lists: '46 Lists',
  },
  {
    img: '/assets/img/cats/catt-5.jpg',
    icon: 'bi bi-shop',
    title: 'Business Shp',
    lists: '16 Lists',
  },
  {
    img: '/assets/img/cats/catt-6.jpg',
    icon: 'bi bi-cup-straw',
    title: 'Restaurants',
    lists: '48 Lists',
  },
  {
    img: '/assets/img/cats/catt-7.jpg',
    icon: 'bi bi-lungs',
    title: 'Hospital & Med',
    lists: '35 Lists',
  },
  {
    img: '/assets/img/cats/catt-8.jpg',
    icon: 'bi bi-lamp',
    title: 'Wedding & Events',
    lists: '42 Lists',
  },
  {
    img: '/assets/img/cats/catt-9.jpg',
    icon: 'bi bi-mortarboard',
    title: 'Education',
    lists: '69 Lists',
  },
  {
    img: '/assets/img/cats/catt-10.jpg',
    icon: 'bi bi-cup-hot',
    title: 'Coffe Shop',
    lists: '32 Lists',
  },
] as const;

// cities data
export const cities = [
  {
    img: '/assets/img/city/location-1.jpg',
    title: 'Jersey City',
    lists: '16 Listing',
    style: 'col-xl-6 col-lg-6 col-md-4 col-sm-6',
  },
  {
    img: '/assets/img/city/location-2.jpg',
    title: 'San Diego',
    lists: '24 Listing',
    style: 'col-xl-3 col-lg-3 col-md-4 col-sm-6',
  },
  {
    img: '/assets/img/city/location-3.jpg',
    title: 'New Orleans',
    lists: '30 Listing',
    style: 'col-xl-3 col-lg-3 col-md-4 col-sm-6',
  },
  {
    img: '/assets/img/city/location-4.jpg',
    title: 'San Antonio',
    lists: '10 Listing',
    style: 'col-xl-3 col-lg-3 col-md-4 col-sm-6',
  },
  {
    img: '/assets/img/city/location-5.jpg',
    title: 'Los Angeles',
    lists: '22 Listing',
    style: 'col-xl-3 col-lg-3 col-md-4 col-sm-6',
  },
  {
    img: '/assets/img/city/location-6.jpg',
    title: 'San Francisco',
    lists: '12 Listing',
    style: 'col-xl-6 col-lg-6 col-md-4 col-sm-6',
  },
] as const;

// events data
export const events = [
  {
    id: 1,
    img: '/assets/img/eve-1.jpg',
    title: 'Learn Cooc with Shree Patel',
    time: '10:30 AM To 14:40 PM',
    name: 'Cooking',
    color: 'badge badge-xs badge-danger',
    date: '25',
    month: 'Aug',
  },
  {
    id: 2,
    img: '/assets/img/eve-2.jpg',
    title: 'Enjoy with Adobe Ceremoney',
    time: '20:00 AM To 22:30 PM',
    name: 'Nightlife',
    color: 'badge badge-xs badge-success',
    date: '15',
    month: 'Sep',
  },
  {
    id: 3,
    img: '/assets/img/eve-3.jpg',
    title: 'Join AI Community Workshop',
    time: '8:30 AM To 12:20 PM',
    name: 'Workshop',
    color: 'badge badge-xs badge-warning',
    date: '10',
    month: 'Nov',
  },
] as const;

// listings2 data
export const listings2 = [
  {
    id: 1,
    img: '/assets/img/list-1.jpg',
    img1: '/assets/img/team-1.jpg',
    title: 'The Big Bumbble Gym',
    number: '+42 515 635 4758',
    location: 'Jakarta, USA',
    name: 'Health & Fitness',
    icon: 'fa-solid fa-dumbbell',
    span: 'catIcon cats-1',
    reviews: '42 Reviews',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$',
    btn1: 'Featured',
    tag: 'true',
  },
  {
    id: 2,
    img: '/assets/img/list-2.jpg',
    img1: '/assets/img/team-2.jpg',
    title: 'Greenvally Real Estate',
    number: '+42 515 635 6150',
    location: 'Jakarta, USA',
    name: 'Real Estate',
    icon: 'bi bi-house-check',
    span: 'catIcon cats-2',
    reviews: '39 Reviews',
    btn: 'Closed',
    color: 'listClose',
    dollar: '$$$$',
    btn1: '',
    tag: 'false',
  },
  {
    id: 3,
    img: '/assets/img/list-3.jpg',
    img1: '/assets/img/team-3.jpg',
    title: 'Shree Wedding Planner',
    number: '+42 515 635 4785',
    location: 'Jakarta, USA',
    name: 'Wedding & Evemts',
    icon: 'bi bi-lamp',
    span: 'catIcon cats-3',
    reviews: '65 Reviews',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$',
    btn1: 'Featured',
    tag: 'true',
  },
  {
    id: 4,
    img: '/assets/img/list-4.jpg',
    img1: '/assets/img/team-4.jpg',
    title: 'The Blue Ley Light',
    number: '+42 515 635 6358',
    location: 'Jakarta, USA',
    name: 'Restaurant',
    icon: 'bi bi-cup-straw',
    span: 'catIcon cats-4',
    reviews: '152 Reviews',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$$',
    btn1: '',
    tag: 'false',
  },
  {
    id: 5,
    img: '/assets/img/list-5.jpg',
    img1: '/assets/img/team-5.jpg',
    title: 'Shreya Study Center',
    number: '+42 515 635 0210',
    location: 'Jakarta, USA',
    name: 'Education',
    icon: 'bi bi-mortarboard',
    span: 'catIcon cats-5',
    reviews: '72 Reviews',
    btn: 'Closed',
    color: 'listClose',
    dollar: '$$$',
    btn1: 'Featured',
    tag: 'true',
  },
  {
    id: 6,
    img: '/assets/img/list-6.jpg',
    img1: '/assets/img/team-6.jpg',
    title: 'Mahroom Garage & Workshop',
    number: '+42 515 635 3251',
    location: 'Jakarta, USA',
    name: 'Showroom',
    icon: 'bi bi-backpack',
    span: 'catIcon cats-6',
    reviews: '42 Reviews',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$$',
    btn1: '',
    tag: 'false',
  },
  {
    id: 7,
    img: '/assets/img/list-9.jpg',
    img1: '/assets/img/team-7.jpg',
    title: 'The Great Dream Palace',
    number: '+42 515 635 5426',
    location: 'Jakarta, USA',
    name: 'Eat & Drink',
    icon: 'bi bi-cup-hot',
    span: 'catIcon cats-7',
    reviews: '625 Reviews',
    btn: 'Closed',
    color: 'listClose',
    dollar: '$$$',
    btn1: '',
    tag: 'false',
  },
  {
    id: 8,
    img: '/assets/img/list-8.jpg',
    img1: '/assets/img/team-8.jpg',
    title: 'Agroo Spa & Massage Center',
    number: '+42 515 635 2136',
    location: 'Jakarta, USA',
    name: 'Spa & Beauty',
    icon: 'bi bi-basket2',
    span: 'catIcon cats-8',
    reviews: '102 Reviews',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$$',
    btn1: 'Featured',
    tag: 'true',
  },
  {
    id: 9,
    img: '/assets/img/list-12.jpg',
    img1: '/assets/img/team-1.jpg',
    title: 'Creative Wedding Planner',
    number: '+42 515 635 4758',
    location: 'Jakarta, USA',
    name: 'Wedding',
    icon: 'fa-solid fa-dumbbell',
    span: 'catIcon cats-1',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$',
    btn1: 'Featured',
    tag: 'true',
  },
] as const;

// listings3 data
export const listings3 = [
  {
    id: 1,
    img: '/assets/img/list-1.jpg',
    img1: '/assets/img/team-1.jpg',
    title: 'The Big Bumbble Gym',
    desc: 'Cicero famously orated against his political.',
    number: '+42 515 635 4758',
    location: 'Jakarta, USA',
    name: 'Fitness',
    icon: 'fa-solid fa-dumbbell',
    span: 'catIcon cats-1',
    plus: '+2',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$',
    btn1: 'Featured',
    tag: 'true',
  },
  {
    id: 2,
    img: '/assets/img/list-2.jpg',
    img1: '/assets/img/team-2.jpg',
    title: 'Greenvally Real Estate',
    desc: 'Cicero famously orated against his political.',
    number: '+42 515 635 6150',
    location: 'Niwak, USA',
    name: 'Real Estate',
    icon: 'bi bi-house-check',
    span: 'catIcon cats-2',
    plus: '+2',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$$',
    btn1: '',
    tag: 'false',
  },
  {
    id: 3,
    img: '/assets/img/list-3.jpg',
    img1: '/assets/img/team-3.jpg',
    title: 'Shree Wedding Planner',
    desc: 'Cicero famously orated against his political.',
    number: '+42 515 635 4785',
    location: 'Jakarta, USA',
    name: 'Weddings',
    icon: 'bi bi-lamp',
    span: 'catIcon cats-3',
    plus: '+1',
    btn: 'Closed',
    color: 'listClose',
    dollar: '$$$',
    btn1: 'Featured',
    tag: 'true',
  },
  {
    id: 4,
    img: '/assets/img/list-4.jpg',
    img1: '/assets/img/team-4.jpg',
    title: 'The Blue Ley Light',
    desc: 'Cicero famously orated against his political.',
    number: '+42 515 635 6358',
    location: 'Chicago, USA',
    name: 'Restaurant',
    icon: 'bi bi-cup-straw',
    span: 'catIcon cats-4',
    plus: '+1',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$$',
    btn1: '',
    tag: 'false',
  },
  {
    id: 5,
    img: '/assets/img/list-5.jpg',
    img1: '/assets/img/team-5.jpg',
    title: 'Shreya Study Center',
    desc: 'Cicero famously orated against his political.',
    number: '+42 515 635 0210',
    location: 'Jakarta, USA',
    name: 'Education',
    icon: 'bi bi-mortarboard',
    span: 'catIcon cats-5',
    plus: '+1',
    btn: 'Closed',
    color: 'listClose',
    dollar: '$$$',
    btn1: 'Featured',
    tag: 'true',
  },
  {
    id: 6,
    img: '/assets/img/list-6.jpg',
    img1: '/assets/img/team-6.jpg',
    title: 'Mahroom Garage & Workshop',
    desc: 'Cicero famously orated against his political.',
    number: '+42 515 635 3251',
    location: 'New York, USA',
    name: 'Showroom',
    icon: 'bi bi-backpack',
    span: 'catIcon cats-6',
    plus: '+1',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$$',
    btn1: '',
    tag: 'false',
  },
] as const;

// process data
export const process = [
  {
    icon: 'bi bi-pin-map fs-2',
    title: 'Find Your Dream Place',
    desc: 'Cicero famously orated against his political opponent Lucius wow abutere Sergius Catilina. Occasionally the first Oration.',
  },
  {
    icon: 'bi bi-envelope-at fs-2',
    title: 'Contact Listing Owners',
    desc: 'Cicero famously orated against his political opponent Lucius wow abutere Sergius Catilina. Occasionally the first Oration.',
  },
  {
    icon: 'bi bi-patch-check fs-2',
    title: 'Make Your Reservation',
    desc: 'Cicero famously orated against his political opponent Lucius wow abutere Sergius Catilina. Occasionally the first Oration.',
  },
] as const;

// ratings data
export const ratings = [
  {
    img: '/assets/img/google.png',
    rate: '4.8',
    title: '422k Reviews',
  },
  {
    img: '/assets/img/trustpilot.png',
    rate: '4.8',
    title: '422k Reviews',
  },
  {
    img: '/assets/img/capterra.png',
    rate: '4.8',
    title: '422k Reviews',
  },
] as const;

// ratings2 data
export const ratings2 = [
  {
    icon: 'bi bi-backpack',
    title: 'Showroom',
  },
  {
    icon: 'bi bi-basket2',
    title: 'Fashion & Beauty',
  },
  {
    icon: 'bi bi-house-check',
    title: 'Real Estate',
  },
  {
    icon: 'fa-solid fa-dumbbell',
    title: 'Health & Fitness',
  },
  {
    icon: 'bi bi-shop',
    title: 'Business Shp',
  },
  {
    icon: 'bi bi-cup-straw',
    title: 'Restaurants',
  },
  {
    icon: 'bi bi-lungs',
    title: 'Hospital & Med',
  },
  {
    icon: 'bi bi-lamp',
    title: 'Wedding & Events',
  },
  {
    icon: 'bi bi-mortarboard',
    title: 'Education',
  },
  {
    icon: 'bi bi-cup-hot',
    title: 'Coffe Shop',
  },
  {
    icon: 'bi bi-layers',
    title: 'Account Finance',
  },
  {
    icon: 'bi bi-code-slash',
    title: 'Web Development',
  },
] as const;

// alls data
export const alls = [
  {
    id: 'all',
    title: 'All',
    check: 'checked',
  },
  {
    id: 'threeplus',
    title: '3.0+',
    check: '',
  },
  {
    id: 'fourplus',
    title: '4.0+',
    check: '',
  },
  {
    id: 'fiveplus',
    title: '5.0',
    check: '',
  },
] as const;

// categories3 data
export const categories3 = [
  {
    id: 'eatdrink1',
    title: 'Eat & Drink',
    check: '',
  },
  {
    id: 'Apartments',
    title: 'Apartments',
    check: '',
  },
  {
    id: 'classifieds1',
    title: 'Classified',
    check: '',
  },
  {
    id: 'services1',
    title: 'Services',
    check: 'checked',
  },
  {
    id: 'gymfitness1',
    title: 'Gym & Fitness',
    check: '',
  },
  {
    id: 'nightlife1',
    title: 'Night Life',
    check: '',
  },
  {
    id: 'coachings1',
    title: 'Coaching',
    check: '',
  },
  {
    id: 'shoppings1',
    title: 'Shopping',
    check: '',
  },
] as const;

// amenities data
export const amenities = [
  {
    id: 'airconditions',
    title: 'Air Condition',
  },
  {
    id: 'gardens',
    title: 'Garden',
  },
  {
    id: 'parkings',
    title: 'Parking',
  },
  {
    id: 'petallow',
    title: 'Pet Allow',
  },
  {
    id: 'freewifi',
    title: 'Free WiFi',
  },
  {
    id: 'breakfast',
    title: 'Breakfast',
  },
  {
    id: 'dinner',
    title: 'Dinner',
  },
  {
    id: 'smoking',
    title: 'Smoking',
  },
  {
    id: 'swimming',
    title: 'Swimming',
  },
] as const;

// closes data
export const closes = [
  {
    title: 'Classified',
  },
  {
    title: 'Services',
  },
  {
    title: '75Km',
  },
  {
    title: 'Dinner',
  },
  {
    title: '$80-$100',
  },
] as const;

// slistings data
export const slistings = [
  {
    title: 'Default Order',
    class: '',
  },
  {
    title: 'Highest Rated',
    class: '',
  },
  {
    title: 'Most Reviewed',
    class: 'active',
  },
  {
    title: 'Newest Listings',
    class: '',
  },
  {
    title: 'Oldest Listings',
    class: '',
  },
  {
    title: 'Featured Listings',
    class: '',
  },
  {
    title: 'Most Viewed',
    class: '',
  },
  {
    title: 'Short By A To Z',
    class: '',
  },
] as const;

// listings4 data
export const listings4 = [
  {
    id: 1,
    img: '/assets/img/list-1.jpg',
    img1: '/assets/img/team-1.jpg',
    title: 'The Big Bumbble Gym',
    desc: 'Cicero famously orated against his political.',
    number: '+42 515 635 4758',
    miles: '2.4 miles',
    name: 'Fitness',
    icon: 'fa-solid fa-dumbbell',
    span: 'catIcon cats-1',
    plus: '+2',
    rating: '4.5',
    avarage: 'good',
    reviews: '46 Reviews',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$',
    btn1: 'Featured',
    tag: 'true',
  },
  {
    id: 2,
    img: '/assets/img/list-2.jpg',
    img1: '/assets/img/team-2.jpg',
    title: 'Greenvally Real Estate',
    desc: 'Cicero famously orated against his political.',
    number: '+42 515 635 6150',
    miles: '3.7 miles',
    name: 'Real Estate',
    icon: 'bi bi-house-check',
    span: 'catIcon cats-2',
    plus: '+2',
    rating: '4.3',
    avarage: 'midium',
    reviews: '35 Reviews',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$$',
    btn1: '',
    tag: 'false',
  },
  {
    id: 3,
    img: '/assets/img/list-3.jpg',
    img1: '/assets/img/team-3.jpg',
    title: 'Shree Wedding Planner',
    desc: 'Cicero famously orated against his political.',
    number: '+42 515 635 4785',
    miles: '2.7 miles',
    name: 'Weddings',
    icon: 'bi bi-lamp',
    span: 'catIcon cats-3',
    plus: '+1',
    rating: '4.8',
    avarage: 'excellent py-1 px-2 fw-semibold',
    reviews: '12 Reviews',
    btn: 'Closed',
    color: 'listClose',
    dollar: '$$$',
    btn1: 'Featured',
    tag: 'true',
  },
  {
    id: 4,
    img: '/assets/img/list-4.jpg',
    img1: '/assets/img/team-4.jpg',
    title: 'The Blue Ley Light',
    desc: 'Cicero famously orated against his political.',
    number: '+42 515 635 6358',
    miles: '5.2 miles',
    name: 'Restaurant',
    icon: 'bi bi-cup-straw',
    span: 'catIcon cats-4',
    plus: '+1',
    rating: '4.6',
    avarage: 'good',
    reviews: '72 Reviews',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$$',
    btn1: '',
    tag: 'false',
  },
  {
    id: 5,
    img: '/assets/img/list-5.jpg',
    img1: '/assets/img/team-5.jpg',
    title: 'Shreya Study Center',
    desc: 'Cicero famously orated against his political.',
    number: '+42 515 635 0210',
    miles: '3.8 miles',
    name: 'Education',
    icon: 'bi bi-mortarboard',
    span: 'catIcon cats-5',
    plus: '+1',
    rating: '4.2',
    avarage: 'midium',
    reviews: '112 Reviews',
    btn: 'Closed',
    color: 'listClose',
    dollar: '$$$',
    btn1: 'Featured',
    tag: 'true',
  },
  {
    id: 6,
    img: '/assets/img/list-6.jpg',
    img1: '/assets/img/team-6.jpg',
    title: 'Mahroom Garage & Workshop',
    desc: 'Cicero famously orated against his political.',
    number: '+42 515 635 3251',
    miles: '2.4 miles',
    name: 'Showroom',
    icon: 'bi bi-backpack',
    span: 'catIcon cats-6',
    plus: '+1',
    rating: '4.9',
    avarage: 'excellent',
    reviews: '52 Reviews',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$$',
    btn1: '',
    tag: 'false',
  },
  {
    id: 9,
    img: '/assets/img/list-12.jpg',
    img1: '/assets/img/team-1.jpg',
    title: 'Creative Wedding Planner',
    desc: 'Cicero famously orated against his political.',
    number: '+42 515 635 4758',
    miles: '2.4 miles',
    name: 'Wedding',
    icon: 'fa-solid fa-dumbbell',
    span: 'catIcon cats-1',
    plus: '+2',
    rating: '4.5',
    avarage: 'good',
    reviews: '46 Reviews',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$',
    btn1: 'Featured',
    tag: 'true',
  },
  {
    id: 7,
    img: '/assets/img/list-9.jpg',
    img1: '/assets/img/team-7.jpg',
    title: 'The Great Dream Palace',
    desc: 'Cicero famously orated against his political.',
    number: '+42 515 635 5426',
    miles: '4.2 miles',
    name: 'Eat & Drink',
    icon: 'bi bi-cup-hot',
    span: 'catIcon cats-7',
    plus: '+2',
    rating: '4.9',
    avarage: 'excellent',
    reviews: '42 Reviews',
    btn: 'Closed',
    color: 'listClose',
    dollar: '$$$',
    btn1: 'Featured',
    tag: 'true',
  },
  {
    id: 8,
    img: '/assets/img/list-8.jpg',
    img1: '/assets/img/team-8.jpg',
    title: 'Agroo Spa & Massage Center',
    desc: 'Cicero famously orated against his political.',
    number: '+42 515 635 2136',
    miles: '1.2 miles',
    name: 'Spa & Beauty',
    icon: 'bi bi-basket2',
    span: 'catIcon cats-8',
    plus: '+1',
    rating: '4.7',
    avarage: 'good',
    reviews: '76 Reviews',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$',
    btn1: 'Featured',
    tag: 'true',
  },
] as const;

// listings5 data
export const listings5 = [
  {
    id: 1,
    img: '/assets/img/list-1.jpg',
    img1: '/assets/img/team-1.jpg',
    title: 'The Big Bumbble Gym',
    number: '+42 515 635 4758',
    location: 'Jakarta, USA',
    name: 'Health & Fitness',
    icon: 'fa-solid fa-dumbbell',
    span: 'catIcon cats-1',
    reviews: '42 Reviews',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$',
    btn1: 'Featured',
    tag: 'true',
  },
  {
    id: 2,
    img: '/assets/img/list-2.jpg',
    img1: '/assets/img/team-2.jpg',
    title: 'Greenvally Real Estate',
    number: '+42 515 635 6150',
    location: 'Jakarta, USA',
    name: 'Real Estate',
    icon: 'bi bi-house-check',
    span: 'catIcon cats-2',
    reviews: '39 Reviews',
    btn: 'Closed',
    color: 'listClose',
    dollar: '$$$$',
    btn1: '',
    tag: 'false',
  },
  {
    id: 3,
    img: '/assets/img/list-3.jpg',
    img1: '/assets/img/team-3.jpg',
    title: 'Shree Wedding Planner',
    number: '+42 515 635 4785',
    location: 'Jakarta, USA',
    name: 'Wedding & Evemts',
    icon: 'bi bi-lamp',
    span: 'catIcon cats-3',
    reviews: '65 Reviews',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$',
    btn1: 'Featured',
    tag: 'true',
  },
  {
    id: 4,
    img: '/assets/img/list-4.jpg',
    img1: '/assets/img/team-4.jpg',
    title: 'The Blue Ley Light',
    number: '+42 515 635 6358',
    location: 'Jakarta, USA',
    name: 'Restaurant',
    icon: 'bi bi-cup-straw',
    span: 'catIcon cats-4',
    reviews: '152 Reviews',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$$',
    btn1: '',
    tag: 'false',
  },
  {
    id: 5,
    img: '/assets/img/list-5.jpg',
    img1: '/assets/img/team-5.jpg',
    title: 'Shreya Study Center',
    number: '+42 515 635 0210',
    location: 'Jakarta, USA',
    name: 'Education',
    icon: 'bi bi-mortarboard',
    span: 'catIcon cats-5',
    reviews: '72 Reviews',
    btn: 'Closed',
    color: 'listClose',
    dollar: '$$$',
    btn1: 'Featured',
    tag: 'true',
  },
  {
    id: 6,
    img: '/assets/img/list-6.jpg',
    img1: '/assets/img/team-6.jpg',
    title: 'Mahroom Garage & Workshop',
    number: '+42 515 635 3251',
    location: 'Jakarta, USA',
    name: 'Showroom',
    icon: 'bi bi-backpack',
    span: 'catIcon cats-6',
    reviews: '42 Reviews',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$$',
    btn1: '',
    tag: 'false',
  },
  {
    id: 7,
    img: '/assets/img/list-9.jpg',
    img1: '/assets/img/team-7.jpg',
    title: 'The Great Dream Palace',
    number: '+42 515 635 5426',
    location: 'Jakarta, USA',
    name: 'Eat & Drink',
    icon: 'bi bi-cup-hot',
    span: 'catIcon cats-7',
    reviews: '625 Reviews',
    btn: 'Closed',
    color: 'listClose',
    dollar: '$$$',
    btn1: '',
    tag: 'false',
  },
  {
    id: 8,
    img: '/assets/img/list-8.jpg',
    img1: '/assets/img/team-8.jpg',
    title: 'Agroo Spa & Massage Center',
    number: '+42 515 635 2136',
    location: 'Jakarta, USA',
    name: 'Spa & Beauty',
    icon: 'bi bi-basket2',
    span: 'catIcon cats-8',
    reviews: '102 Reviews',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$$',
    btn1: 'Featured',
    tag: 'true',
  },
] as const;

// listings6 data
export const listings6 = [
  {
    id: 1,
    img: '/assets/img/list-1.jpg',
    title: 'The Big Bumbble Gym',
    price: '$30.50-$50.55',
    location: 'Old Paris, France',
    rating: '4.7',
    reviews: '42k Reviews',
    name: 'Health & Fitness',
    icon: 'fa-solid fa-dumbbell',
    span: 'catIcon cats-1',
    number: '+62 25 4563 51',
    btn: 'Open',
    color: 'listOpen',
    btn1: 'Featured',
    tag: 'true',
    btn2: '',
    tag1: 'false',
  },
  {
    id: 2,
    img: '/assets/img/list-2.jpg',
    title: 'Greenvally Real Estate',
    price: '$50.50-$55.43',
    location: 'Old Paris, France',
    rating: '4.8',
    reviews: '12k Reviews',
    name: 'Health & Fitness',
    icon: 'bi bi-house-check',
    span: 'catIcon cats-2',
    number: '+62 25 4563 51',
    btn: 'Close',
    color: 'listClose',
    btn1: 'Featured',
    tag: 'true',
    btn2: 'Instant Booking',
    tag1: 'true',
  },
  {
    id: 3,
    img: '/assets/img/list-3.jpg',
    title: 'Shree Wedding Planner',
    price: '$44.50-$80.55',
    location: 'Old Paris, France',
    rating: '4.6',
    reviews: '32k Reviews',
    name: 'Wedding & Events',
    icon: 'bi bi-lamp',
    span: 'catIcon cats-3',
    number: '+62 25 4563 51',
    btn: 'Open',
    color: 'listOpen',
    btn1: '',
    tag: 'false',
    btn2: '',
    tag1: 'false',
  },
  {
    id: 4,
    img: '/assets/img/list-4.jpg',
    title: 'The Blue Ley Light',
    price: '$23.20-$67.10',
    location: 'Old Paris, France',
    rating: '4.9',
    reviews: '16k Reviews',
    name: 'Restaurant',
    icon: 'bi bi-cup-straw',
    span: 'catIcon cats-4',
    number: '+62 25 4563 51',
    btn: 'Close',
    color: 'listClose',
    btn1: 'Featured',
    tag: 'true',
    btn2: 'Instant Booking',
    tag1: 'true',
  },
  {
    id: 5,
    img: '/assets/img/list-5.jpg',
    title: 'Shreya Study Center',
    price: '$30.50-$80',
    location: 'Old Paris, France',
    rating: '4.8',
    reviews: '18k Reviews',
    name: 'Education',
    icon: 'bi bi-mortarboard',
    span: 'catIcon cats-5',
    number: '+62 25 4563 51',
    btn: 'Open',
    color: 'listOpen',
    btn1: '',
    tag: 'false',
    btn2: '',
    tag1: 'false',
  },
  {
    id: 7,
    img: '/assets/img/list-9.jpg',
    title: 'The Great Dream Palace',
    price: '$44k-$85k',
    location: 'Old Paris, France',
    rating: '4.9',
    reviews: '85k Reviews',
    name: 'Eat & Drink',
    icon: 'bi bi-cup-hot',
    span: 'catIcon cats-7',
    number: '+62 25 4563 51',
    btn: 'Close',
    color: 'listClose',
    btn1: 'Featured',
    tag: 'true',
    btn2: 'Instant Booking',
    tag1: 'true',
  },
] as const;

// listings7 data
export const listings7 = [
  {
    id: 1,
    img: '/assets/img/list-1.jpg',
    img1: '/assets/img/team-1.jpg',
    title: 'The Big Bumbble Gym',
    desc: 'Cicero famously orated against his political.',
    number: '+42 515 635 4758',
    location: 'Jakarta, USA',
    name: 'Fitness',
    icon: 'fa-solid fa-dumbbell',
    span: 'catIcon cats-1',
    plus: '+2',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$',
    btn1: 'Featured',
    tag: 'true',
  },
  {
    id: 2,
    img: '/assets/img/list-2.jpg',
    img1: '/assets/img/team-2.jpg',
    title: 'Greenvally Real Estate',
    desc: 'Cicero famously orated against his political.',
    number: '+42 515 635 6150',
    location: 'Niwak, USA',
    name: 'Real Estate',
    icon: 'bi bi-house-check',
    span: 'catIcon cats-2',
    plus: '+2',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$$',
    btn1: '',
    tag: 'false',
  },
  {
    id: 3,
    img: '/assets/img/list-3.jpg',
    img1: '/assets/img/team-3.jpg',
    title: 'Shree Wedding Planner',
    desc: 'Cicero famously orated against his political.',
    number: '+42 515 635 4785',
    location: 'Jakarta, USA',
    name: 'Weddings',
    icon: 'bi bi-lamp',
    span: 'catIcon cats-3',
    plus: '+1',
    btn: 'Closed',
    color: 'listClose',
    dollar: '$$$',
    btn1: 'Featured',
    tag: 'true',
  },
  {
    id: 4,
    img: '/assets/img/list-4.jpg',
    img1: '/assets/img/team-4.jpg',
    title: 'The Blue Ley Light',
    desc: 'Cicero famously orated against his political.',
    number: '+42 515 635 6358',
    location: 'Chicago, USA',
    name: 'Restaurant',
    icon: 'bi bi-cup-straw',
    span: 'catIcon cats-4',
    plus: '+1',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$$',
    btn1: '',
    tag: 'false',
  },
  {
    id: 5,
    img: '/assets/img/list-5.jpg',
    img1: '/assets/img/team-5.jpg',
    title: 'Shreya Study Center',
    desc: 'Cicero famously orated against his political.',
    number: '+42 515 635 0210',
    location: 'Jakarta, USA',
    name: 'Education',
    icon: 'bi bi-mortarboard',
    span: 'catIcon cats-5',
    plus: '+1',
    btn: 'Closed',
    color: 'listClose',
    dollar: '$$$',
    btn1: 'Featured',
    tag: 'true',
  },
  {
    id: 10,
    img: '/assets/img/list-11.jpg',
    img1: '/assets/img/team-1.jpg',
    title: 'Cruzal Escort Services',
    desc: 'Cicero famously orated against his political.',
    number: '+42 515 635 0210',
    location: 'Jakarta, USA',
    name: 'Services',
    icon: 'fa-solid fa-dumbbell',
    span: 'catIcon cats-1',
    plus: '+2',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$',
    btn1: 'Featured',
    tag: 'true',
  },
  {
    id: 9,
    img: '/assets/img/list-12.jpg',
    img1: '/assets/img/team-2.jpg',
    title: 'Creative Wedding Planner',
    desc: 'Cicero famously orated against his political.',
    number: '+42 515 635 0210',
    location: 'Niwak, USA',
    name: 'Wedding',
    icon: 'bi bi-house-check',
    span: 'catIcon cats-2',
    plus: '+2',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$$',
    btn1: '',
    tag: 'false',
  },
  {
    id: 6,
    img: '/assets/img/list-6.jpg',
    img1: '/assets/img/team-6.jpg',
    title: 'Mahroom Garage & Workshop',
    desc: 'Cicero famously orated against his political.',
    number: '+42 515 635 3251',
    location: 'New York, USA',
    name: 'Showroom',
    icon: 'bi bi-backpack',
    span: 'catIcon cats-6',
    plus: '+1',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$$',
    btn1: '',
    tag: 'false',
  },
] as const;

// navs data
export const navs = [
  {
    icon: 'bi bi-text-paragraph me-2',
    title: 'Overview',
    link: '#descriptions',
  },
  {
    icon: 'bi bi-wallet me-2',
    title: 'Pricing',
    link: '#pricingss',
  },
  {
    icon: 'bi bi-basket2 me-2',
    title: 'Products',
    link: '#productss',
  },
  {
    icon: 'bi bi-cup-hot me-2',
    title: 'Features',
    link: '#features',
  },
  {
    icon: 'bi bi-images me-2',
    title: 'Gallery',
    link: '#Galleries',
  },
  {
    icon: 'bi bi-map me-2',
    title: 'Maps',
    link: '#maps',
  },
  {
    icon: 'bi bi-bar-chart me-2',
    title: 'Statistics',
    link: '#Statistics',
  },
  {
    icon: 'bi bi-star-half me-2',
    title: 'Reviews',
    link: '#reviews',
  },
] as const;

// pricings data
export const pricings = [
  {
    img: '/assets/img/prc-1.jpg',
    title: 'Potato Slice',
    name: 'Spicy',
    price: '$20',
  },
  {
    img: '/assets/img/prc-2.jpg',
    title: 'Tasty Tandoori',
    name: 'Dyno',
    price: '$45',
  },
  {
    img: '/assets/img/prc-3.jpg',
    title: 'Indian Thali',
    name: 'Tasty',
    price: '$120',
  },
  {
    img: '/assets/img/prc-4.jpg',
    title: 'Slice Burger',
    name: 'Spicy',
    price: '$60',
  },
  {
    img: '/assets/img/prc-5.jpg',
    title: 'Cheese Burger',
    name: 'Cold',
    price: '$50',
  },
  {
    img: '/assets/img/prc-6.jpg',
    title: 'Cold Coffee',
    name: 'Taste',
    price: '$35',
  },
] as const;

// products data
export const products = [
  {
    img: '/assets/img/h.jpg',
    title: 'Wooden Flop Vase',
    price: '$57.40',
    off: '',
    tag: 'false',
    name: 'Sold',
    style: 'bg-dark',
  },
  {
    img: '/assets/img/i.jpg',
    title: 'Sandlwood Vase',
    price: '$29.56',
    off: '-30 Off',
    tag: 'true',
    name: 'Hot',
    style: 'bg-danger',
  },
  {
    img: '/assets/img/j.jpg',
    title: 'Sonalik Vase Cast',
    price: '$52.42',
    off: '',
    tag: 'false',
    name: 'New',
    style: 'bg-seegreen',
  },
  {
    img: '/assets/img/e.jpg',
    title: 'Causio Matt Vase',
    price: '$35.60',
    off: '-28 Off',
    tag: 'true',
    name: 'Hot',
    style: 'bg-danger',
  },
  {
    img: '/assets/img/f.jpg',
    title: 'Venila Flower Vase',
    price: '$41.20',
    off: '',
    tag: 'false',
    name: 'New',
    style: 'bg-seegreen',
  },
  {
    img: '/assets/img/g.jpg',
    title: 'Prodcast Vase',
    price: '$50.56',
    off: '-25 Off',
    tag: 'true',
    name: 'Hot',
    style: 'bg-danger',
  },
] as const;

// features data
export const features = [
  {
    icon: 'fa-oil-can',
    title: 'Natural Gas',
  },
  {
    icon: 'fa-mask-ventilator',
    title: 'Ventilation',
  },
  {
    icon: 'fa-droplet',
    title: 'Pure Water',
  },
  {
    icon: 'fa-dumpster-fire',
    title: 'Heating',
  },
  {
    icon: 'fa-plug',
    title: 'Electricity',
  },
  {
    icon: 'fa-fan',
    title: 'Cooling Air',
  },
  {
    icon: 'fa-smoking',
    title: 'Smoke detectors',
  },
  {
    icon: 'fa-wifi',
    title: 'Free WiFi',
  },
  {
    icon: 'fa-house-fire',
    title: 'Fireplace',
  },
  {
    icon: 'fa-toilet-paper',
    title: 'Elevator',
  },
  {
    icon: 'fa-wheelchair',
    title: 'Chair Accessible',
  },
] as const;

// gallerys data
export const gallerys = [
  {
    img: '/assets/img/gal-1.jpg',
  },
  {
    img: '/assets/img/gal-2.jpg',
  },
  {
    img: '/assets/img/gal-3.jpg',
  },
  {
    img: '/assets/img/gal-4.jpg',
  },
  {
    img: '/assets/img/gal-5.jpg',
  },
  {
    img: '/assets/img/gal-6.jpg',
  },
] as const;

// authors data
export const authors = [
  {
    icon: 'bi bi-envelope',
    name: 'Email',
    title: 'shree.patel@gmail.com',
  },
  {
    icon: 'bi bi-phone',
    name: 'Phone No.',
    title: '+41 256 254 5487',
  },
  {
    icon: 'bi bi-browser-chrome',
    name: 'Website',
    title: 'www.ThinksToDo.co.in',
  },
] as const;

// openings data
export const openings = [
  {
    title: 'Monday',
    time: '8:00 Am To 10:00 PM',
    style: 'py-3 px-3',
  },
  {
    title: 'Tuesday',
    time: '8:00 Am To 10:00 PM',
    style: 'py-3 px-3 border-top',
  },
  {
    title: 'Wednesday',
    time: '8:00 Am To 10:00 PM',
    style: 'py-3 px-3 border-top',
  },
  {
    title: 'Thursday',
    time: '8:00 Am To 10:00 PM',
    style: 'py-3 px-3 border-top',
  },
  {
    title: 'Friday',
    time: '8:00 Am To 10:00 PM',
    style: 'py-3 px-3 border-top',
  },
  {
    title: 'Saturday',
    time: '8:00 Am To 10:00 PM',
    style: 'py-3 px-3 border-top',
  },
  {
    title: 'Sunday',
    time: '10:00 Am To 16:00 PM',
    style: 'py-3 px-3 border-top',
  },
] as const;

// overviews data
export const overviews = [
  {
    icon: 'fa-regular fa-building',
    title: 'Apartment',
  },
  {
    icon: 'fa-solid fa-bed',
    title: '3 Beds',
  },
  {
    icon: 'fa-solid fa-bath',
    title: '2 Baths',
  },
  {
    icon: 'fa-solid fa-vector-square',
    title: '2500 sqft',
  },
] as const;

// pricings2 data
export const pricings2 = [
  {
    icon: 'fa-solid fa-dog',
    title: 'Pet Allow',
    price: '$12.5',
  },
  {
    icon: 'fa-solid fa-football',
    title: 'Gaming',
    price: '$17.2',
  },
  {
    icon: 'fa-solid fa-car',
    title: 'Hire car',
    price: '$15',
  },
  {
    icon: 'fa-solid fa-bus',
    title: 'City Tour',
    price: '$14.5',
  },
  {
    icon: 'fa-solid fa-water-ladder',
    title: 'Swiming Pool',
    price: '$17.5',
  },
] as const;

// gallerys2 data
export const gallerys2 = [
  {
    img: '/assets/img/gal-7.jpg',
  },
  {
    img: '/assets/img/gal-8.jpg',
  },
  {
    img: '/assets/img/gal-9.jpg',
  },
  {
    img: '/assets/img/gal-10.jpg',
  },
  {
    img: '/assets/img/gal-7.jpg',
  },
  {
    img: '/assets/img/gal-9.jpg',
  },
] as const;

// lists data
export const lists = [
  {
    id: 1,
    img: '/assets/img/list-1.jpg',
    img1: '/assets/img/team-1.jpg',
    title: 'The Big Bumbble Gym',
    number: '+42 515 635 4758',
    location: 'Jakarta, USA',
    name: 'Health & Fitness',
    icon: 'fa-solid fa-dumbbell',
    span: 'catIcon cats-1',
    reviews: '42 Reviews',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$',
    btn1: 'Featured',
    tag: 'true',
  },
  {
    id: 2,
    img: '/assets/img/list-2.jpg',
    img1: '/assets/img/team-2.jpg',
    title: 'Greenvally Real Estate',
    number: '+42 515 635 6150',
    location: 'Jakarta, USA',
    name: 'Real Estate',
    icon: 'bi bi-house-check',
    span: 'catIcon cats-2',
    reviews: '39 Reviews',
    btn: 'Closed',
    color: 'listClose',
    dollar: '$$$$',
    btn1: '',
    tag: 'false',
  },
  {
    id: 3,
    img: '/assets/img/list-3.jpg',
    img1: '/assets/img/team-3.jpg',
    title: 'Shree Wedding Planner',
    number: '+42 515 635 4785',
    location: 'Jakarta, USA',
    name: 'Wedding & Evemts',
    icon: 'bi bi-lamp',
    span: 'catIcon cats-3',
    reviews: '65 Reviews',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$',
    btn1: 'Featured',
    tag: 'true',
  },
  {
    id: 4,
    img: '/assets/img/list-4.jpg',
    img1: '/assets/img/team-4.jpg',
    title: 'The Blue Ley Light',
    number: '+42 515 635 6358',
    location: 'Jakarta, USA',
    name: 'Restaurant',
    icon: 'bi bi-cup-straw',
    span: 'catIcon cats-4',
    reviews: '152 Reviews',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$$',
    btn1: '',
    tag: 'false',
  },
  {
    id: 5,
    img: '/assets/img/list-5.jpg',
    img1: '/assets/img/team-5.jpg',
    title: 'Shreya Study Center',
    number: '+42 515 635 0210',
    location: 'Jakarta, USA',
    name: 'Education',
    icon: 'bi bi-mortarboard',
    span: 'catIcon cats-5',
    reviews: '72 Reviews',
    btn: 'Closed',
    color: 'listClose',
    dollar: '$$$',
    btn1: 'Featured',
    tag: 'true',
  },
  {
    id: 6,
    img: '/assets/img/list-6.jpg',
    img1: '/assets/img/team-6.jpg',
    title: 'Mahroom Garage & Workshop',
    number: '+42 515 635 3251',
    location: 'Jakarta, USA',
    name: 'Showroom',
    icon: 'bi bi-backpack',
    span: 'catIcon cats-6',
    reviews: '42 Reviews',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$$',
    btn1: '',
    tag: 'false',
  },
  {
    id: 7,
    img: '/assets/img/list-9.jpg',
    img1: '/assets/img/team-7.jpg',
    title: 'The Great Dream Palace',
    number: '+42 515 635 5426',
    location: 'Jakarta, USA',
    name: 'Eat & Drink',
    icon: 'bi bi-cup-hot',
    span: 'catIcon cats-7',
    reviews: '625 Reviews',
    btn: 'Closed',
    color: 'listClose',
    dollar: '$$$',
    btn1: '',
    tag: 'false',
  },
  {
    id: 8,
    img: '/assets/img/list-8.jpg',
    img1: '/assets/img/team-8.jpg',
    title: 'Agroo Spa & Massage Center',
    number: '+42 515 635 2136',
    location: 'Jakarta, USA',
    name: 'Spa & Beauty',
    icon: 'bi bi-basket2',
    span: 'catIcon cats-8',
    reviews: '102 Reviews',
    btn: 'Open',
    color: 'listOpen',
    dollar: '$$$$',
    btn1: 'Featured',
    tag: 'true',
  },
] as const;

// pricings3 data
export const pricings3 = [
  {
    icon: 'bi bi-scissors',
    title: 'Hair Cuttings',
    price: '$12.5',
  },
  {
    icon: 'bi bi-backpack',
    title: 'Clean Shave',
    price: '$17.2',
  },
  {
    icon: 'bi bi-slash-circle',
    title: 'Face Line-Up',
    price: '$15',
  },
  {
    icon: 'bi bi-feather',
    title: 'Trim Hair',
    price: '$14.5',
  },
  {
    icon: 'bi bi-palette2',
    title: 'Facial',
    price: '$17.5',
  },
] as const;

// gallerys3 data
export const gallerys3 = [
  {
    img: '/assets/img/gal-11.jpg',
  },
  {
    img: '/assets/img/gal-12.jpg',
  },
  {
    img: '/assets/img/gal-13.jpg',
  },
  {
    img: '/assets/img/gal-14.jpg',
  },
  {
    img: '/assets/img/gal-15.jpg',
  },
  {
    img: '/assets/img/gal-12.jpg',
  },
] as const;

// gallerys4 data
export const gallerys4 = [
  {
    img: '/assets/img/car-1.jpg',
  },
  {
    img: '/assets/img/car-2.jpg',
  },
  {
    img: '/assets/img/car-3.jpg',
  },
  {
    img: '/assets/img/car-4.jpg',
  },
  {
    img: '/assets/img/car-1.jpg',
  },
  {
    img: '/assets/img/car-2.jpg',
  },
  {
    img: '/assets/img/car-4.jpg',
  },
] as const;

// overviews2 data
export const overviews2 = [
  {
    icon: 'fa-solid fa-fan',
    title: 'Air Condition',
  },
  {
    icon: 'fa-solid fa-shield-halved',
    title: 'Air Bag',
  },
  {
    icon: 'fa-solid fa-wheelchair',
    title: 'Heated Seats',
  },
  {
    icon: 'fa-solid fa-music',
    title: 'Audio System',
  },
  {
    icon: 'fa-solid fa-location-crosshairs',
    title: 'GPS',
  },
  {
    icon: 'fa-regular fa-window-maximize',
    title: 'Electric Window',
  },
  {
    icon: 'fa-solid fa-mask-ventilator',
    title: 'Power Break',
  },
  {
    icon: 'fa-brands fa-usb',
    title: 'USP Port',
  },
] as const;

// specifications data
export const specifications = [
  {
    title: 'Manufacturing Year',
    name: '2025',
    style: 'py-3 px-3',
  },
  {
    title: 'Fuel',
    name: 'Petrol, CNG',
    style: 'py-3 px-3 border-top',
  },
  {
    title: 'Average',
    name: '15Km/L',
    style: 'py-3 px-3 border-top',
  },
  {
    title: 'Mileage',
    name: '5435 km',
    style: 'py-3 px-3 border-top',
  },
  {
    title: 'Color',
    name: 'Black',
    style: 'py-3 px-3 border-top',
  },
  {
    title: 'Transmission',
    name: 'Automatic',
    style: 'py-3 px-3 border-top',
  },
  {
    title: 'Displacement',
    name: '1550 CC',
    style: 'py-3 px-3 border-top',
  },
] as const;

// rows data
export const rows = [
  {
    icon: 'bi bi-pin-map-fill text-success fs-2',
    style: 'bg-light-success',
    title: 'Active Listings',
    number: '23',
    price: '10',
    symbol: '',
  },
  {
    icon: 'bi bi-graph-up-arrow text-danger fs-2',
    style: 'bg-light-danger',
    title: 'Total Views',
    number: '32',
    price: '10',
    symbol: 'K',
  },
  {
    icon: 'bi bi-suit-heart text-warning fs-2',
    style: 'bg-light-warning',
    title: 'Total Saved',
    number: '4',
    price: '1',
    symbol: 'K',
  },
  {
    icon: 'bi bi-yelp text-info fs-2',
    style: 'bg-light-info',
    title: 'Total Reviews',
    number: '88',
    price: '10',
    symbol: '',
  },
] as const;

// messages data
export const messages = [
  {
    img: '/assets/img/team-8.jpg',
    title: 'Warlinton Diggs',
    time: '08:20 AM',
    desc: 'How are you stay dude?',
    number: '',
    tag: 'false',
  },
  {
    img: '/assets/img/team-7.jpg',
    title: 'Chad M. Pusey',
    time: '06:40 AM',
    desc: 'Hey man it is possible to pay mo..',
    number: '5',
    tag: 'true',
  },
  {
    img: '/assets/img/team-6.jpg',
    title: 'Mary D. Homer',
    time: '08:10 AM',
    desc: 'Dear you have a spacial offers...',
    number: '3',
    tag: 'true',
  },
  {
    img: '/assets/img/team-5.jpg',
    title: 'Marc S. Solano',
    time: '10:10 AM',
    desc: 'Sound good! We will meet you aft...',
    number: '',
    tag: 'false',
  },
  {
    img: '/assets/img/team-4.jpg',
    title: 'Sandra W. Barge',
    time: '07:20 PM',
    desc: 'I am also good and how are...',
    number: '2',
    tag: 'true',
  },
] as const;

// invoices data
export const invoices = [
  {
    title: 'Basic Platinum Plan',
    id: '#PC01362',
    status: 'Paid',
    style: 'badge-success',
    date: 'Dec 10,2025',
    btn: 'View Invoice',
  },
  {
    title: 'Standard Platinum Plan',
    id: '#PC01363',
    status: 'Unpaid',
    style: 'badge-danger',
    date: 'Jan 10,2025',
    btn: 'View Invoice',
  },
  {
    title: 'Extended Platinum Plan',
    id: '#PC01364',
    status: 'On Hold',
    style: 'badge-info',
    date: 'July 12,2025',
    btn: 'View Invoice',
  },
  {
    title: 'Basic Platinum Plan',
    id: '#PC01365',
    status: 'Paid',
    style: 'badge-success',
    date: 'Aug 9,2025',
    btn: 'View Invoice',
  },
] as const;

// bookings data
export const bookings = [
  {
    img: '/assets/img/team-2.jpg',
    title: 'Mubarak Barbar Shop',
    name: 'Salon',
    tag: 'one',
    tag1: 'one',
    date: '12.05.2025 at 11:30 AM',
    info: '02 Adults, 01 Child',
    client: 'Kallay Mortin',
    contact: '41 125 254 2563',
    price: '$25.50',
  },
  {
    img: '/assets/img/team-1.jpg',
    title: 'Sunrise Apartment',
    name: 'Apartment',
    tag: 'two',
    tag1: 'two',
    date: '14.06.2024 - 15.06.2025 at 11:30 AM',
    info: '02 Adults, 02 Child',
    client: 'Kalla Adroise',
    contact: '41 125 254 6258',
    price: '$17,00',
  },
  {
    img: '/assets/img/team-4.jpg',
    title: 'Blue Star Cafe',
    name: 'Restaurants',
    tag: 'three',
    tag1: '',
    date: '12.05.2025 at 16:30 AM',
    info: '02 Adults, 01 Child',
    client: 'Sorika Michel',
    contact: '41 125 254 625',
    price: '$245.00',
  },
  {
    img: '/assets/img/team-5.jpg',
    title: 'Snow Valley Resort',
    name: 'Hotel',
    tag: 'four',
    tag1: 'four',
    date: '14.10.2025 at 08:30 PM',
    info: '03 Adults, 01 Child',
    client: 'Arun Govil',
    contact: '41 125 254 3265',
    price: '$190.00',
  },
] as const;

// manages data
export const manages = [
  {
    img: '/assets/img/list-1.jpg',
    title: 'The Big Bumbble Gym',
    desc: '410 Apex Avenue, California USA',
    reviews: '412 Reviews',
    btn: 'Edit',
    tag: 'false',
  },
  {
    img: '/assets/img/list-2.jpg',
    title: 'Greenvally Real Estate',
    desc: '410 Apex Avenue, California USA',
    reviews: '152 Reviews',
    btn: 'Renew',
    tag: 'true',
  },
  {
    img: '/assets/img/list-3.jpg',
    title: 'The Blue Ley Light',
    desc: '520 Adde Resort, Liverpool UK',
    reviews: '302 Reviews',
    btn: 'Edit',
    tag: 'false',
  },
  {
    img: '/assets/img/list-5.jpg',
    title: 'Shreya Study Center',
    desc: '102 Hozri Avenue, California USA',
    reviews: '180 Reviews',
    btn: 'Edit',
    tag: 'false',
  },
] as const;

// saveds data
export const saveds = [
  {
    img: '/assets/img/list-1.jpg',
    title: 'The Big Bumbble Gym',
    desc: '410 Apex Avenue, California USA',
    reviews: '412 Reviews',
  },
  {
    img: '/assets/img/list-2.jpg',
    title: 'Greenvally Real Estate',
    desc: '410 Apex Avenue, California USA',
    reviews: '152 Reviews',
  },
  {
    img: '/assets/img/list-3.jpg',
    title: 'The Blue Ley Light',
    desc: '520 Adde Resort, Liverpool UK',
    reviews: '302 Reviews',
  },
  {
    img: '/assets/img/list-5.jpg',
    title: 'Shreya Study Center',
    desc: '102 Hozri Avenue, California USA',
    reviews: '180 Reviews',
  },
] as const;

// messages2 data
export const messages2 = [
  {
    img: '/assets/img/team-1.jpg',
    title: 'Karan Shivraj',
    desc: 'Hello, I want to disscuss with you regarding my listing',
    desc1: 'Apolo Hotel',
    desc2: 'to manage and upgrade it with...',
    time: 'Today',
    name: '',
    tag: 'false',
    style: 'online',
    class: 'active',
  },
  {
    img: '/assets/img/team-3.jpg',
    title: 'Shree Preet',
    desc: 'Hello, I want to disscuss with you regarding my listing',
    desc1: 'Apolo Hotel',
    desc2: 'to manage and upgrade it with...',
    time: 'just Now',
    name: 'Unread',
    tag: 'true',
    style: 'busy',
    class: '',
  },
  {
    img: '/assets/img/team-4.jpg',
    title: 'Shikhar Musk',
    desc: 'Hello, I want to disscuss with you regarding my listing',
    desc1: 'Apolo Hotel',
    desc2: 'to manage and upgrade it with...',
    time: '30 min ago',
    name: '',
    tag: 'false',
    style: 'offline',
    class: '',
  },
  {
    img: '/assets/img/team-5.jpg',
    title: 'Mortin Mukkar',
    desc: 'Hello, I want to disscuss with you regarding my listing',
    desc1: 'Apolo Hotel',
    desc2: 'to manage and upgrade it with...',
    time: 'Yesterday',
    name: '',
    tag: 'false',
    style: 'online',
    class: '',
  },
  {
    img: '/assets/img/team-6.jpg',
    title: 'Melly Arjun',
    desc: 'Hello, I want to disscuss with you regarding my listing',
    desc1: 'Apolo Hotel',
    desc2: 'to manage and upgrade it with...',
    time: 'Today',
    name: 'Unread',
    tag: 'true',
    style: 'busy',
    class: '',
  },
  {
    img: '/assets/img/team-5.jpg',
    title: 'Mortin Mukkar',
    desc: 'Hello, I want to disscuss with you regarding my listing',
    desc1: 'Apolo Hotel',
    desc2: 'to manage and upgrade it with...',
    time: 'Yesterday',
    name: '',
    tag: 'false',
    style: 'online',
    class: '',
  },
] as const;

// reviews2 data
export const reviews2 = [
  {
    img: '/assets/img/team-1.jpg',
    title: 'Karan Shivraj',
    on: 'On',
    name: 'Blewr Cafe',
    date: '30 April 2025',
    desc: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.',
  },
  {
    img: '/assets/img/team-2.jpg',
    title: 'Karan Shivraj',
    on: 'On',
    name: 'Blewr Cafe',
    date: '30 April 2025',
    desc: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.',
  },
  {
    img: '/assets/img/team-3.jpg',
    title: 'Karan Shivraj',
    on: 'On',
    name: 'Blewr Cafe',
    date: '30 April 2025',
    desc: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.',
  },
  {
    img: '/assets/img/team-4.jpg',
    title: 'Karan Shivraj',
    on: 'On',
    name: 'Blewr Cafe',
    date: '30 April 2025',
    desc: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.',
  },
] as const;

// rows2 data
export const rows2 = [
  {
    icon: 'bi bi-wallet',
    style: 'bg-danger',
    title: 'Your Balance in USD',
    number: '510',
    price: '100',
  },
  {
    icon: 'bi bi-coin',
    style: 'bg-warning',
    title: 'Total Earning in USD',
    number: '720',
    price: '100',
  },
  {
    icon: 'bi bi-basket2',
    style: 'bg-purple',
    title: 'Total Orders',
    number: '7',
    price: '1',
  },
] as const;

// earnings data
export const earnings = [
  {
    title: 'Swarna Apartment',
    id: '#PC01362',
    date: 'Dec 10,2025',
    amount: '$200 USD',
    fee: '$17.10 USD',
  },
  {
    title: 'Blue Cafe',
    id: '#PC01363',
    date: 'Jan 12,2025',
    amount: '$150 USD',
    fee: '$12.30 USD',
  },
  {
    title: 'Kanoop Barbar Shop',
    id: '#PC01364',
    date: 'Sep 6,2025',
    amount: '$75.50 USD',
    fee: '$10.20 USD',
  },
  {
    title: 'Classic Casino',
    id: '#PC01365',
    date: 'Dec 16,2025',
    amount: '$652 USD',
    fee: '$80.90 USD',
  },
] as const;

// gallerys5 data
export const gallerys5 = [
  {
    title: 'Upload Logo',
    id: 'single-logo',
    name: 'Maximum file size: 2 MB.',
  },
  {
    title: 'Featured Image',
    id: 'featured-image',
    name: 'Maximum file size: 2 MB.',
  },
  {
    title: 'Image Gallery',
    id: 'gallery',
    name: 'Maximum file size: 2 MB.',
  },
] as const;

// timings data
export const timings = [
  {
    time: 'Closed',
  },
  {
    time: '1 :00 AM',
  },
  {
    time: '2 :00 AM',
  },
  {
    time: '3 :00 AM',
  },
  {
    time: '4 :00 AM',
  },
  {
    time: '5 :00 AM',
  },
  {
    time: '6 :00 AM',
  },
  {
    time: '7 :00 AM',
  },
  {
    time: '8 :00 AM',
  },
  {
    time: '9 :00 AM',
  },
  {
    time: '10 :00 AM',
  },
  {
    time: '11 :00 AM',
  },
  {
    time: '12 :00 AM',
  },
  {
    time: '1 :00 PM',
  },
  {
    time: '2 :00 PM',
  },
  {
    time: '3 :00 PM',
  },
  {
    time: '4 :00 PM',
  },
  {
    time: '5 :00 PM',
  },
  {
    time: '6 :00 PM',
  },
  {
    time: '7 :00 PM',
  },
  {
    time: '8 :00 PM',
  },
  {
    time: '9 :00 PM',
  },
  {
    time: '10 :00 PM',
  },
  {
    time: '11 :00 PM',
  },
  {
    time: '12 :00 PM',
  },
] as const;

// features2 data
export const features2 = [
  {
    title: 'Reservations',
    id: 'am2',
  },
  {
    title: 'Vegetarian Options',
    id: 'am3',
  },
  {
    title: 'Moderate Noise',
    id: 'am4',
  },
  {
    title: 'Good For Kids',
    id: 'am5',
  },
  {
    title: 'Private Lot Parking',
    id: 'am6',
  },
  {
    title: 'Beer & Wine',
    id: 'am7',
  },
  {
    title: 'TV Services',
    id: 'am8',
  },
  {
    title: 'Pets Allow',
    id: 'am9',
  },
  {
    title: 'Offers Delivery',
    id: 'am10',
  },
  {
    title: 'Staff wears masks',
    id: 'am11',
  },
  {
    title: 'Accepts Credit Cards',
    id: 'am12',
  },
  {
    title: 'Offers Catering',
    id: 'am13',
  },
  {
    title: 'Good for Breakfast',
    id: 'am14',
  },
  {
    title: 'Waiter Service',
    id: 'am15',
  },
  {
    title: 'Drive-Thru',
    id: 'am16',
  },
  {
    title: 'Outdoor Seating',
    id: 'am17',
  },
  {
    title: 'Offers Takeout',
    id: 'am18',
  },
  {
    title: 'Vegan Options',
    id: 'am19',
  },
] as const;

// tables data
export const tables = [
  {
    title: 'Figma Website Design',
    number: '2',
    rate: '20.00',
    total: '40.00',
  },
  {
    title: 'Website Customization',
    number: '3',
    rate: '30.00',
    total: '90.00',
  },
  {
    title: 'SEO| SMO Services',
    number: '1',
    rate: '599.00',
    total: '599.00',
  },
] as const;

// carts data
export const carts = [
  {
    img: '/assets/img/h.jpg',
    title: 'Shine Water Cattle',
    weight: '2 Leter',
    name: 'Weight',
    color: 'Light Gray',
    quantity: '1',
    price: '$67.00',
  },
  {
    img: '/assets/img/j.jpg',
    title: 'Classic Flower Vase',
    weight: 'LG',
    name: 'Size',
    color: 'Sea Green',
    quantity: '1',
    price: '$55.00',
  },
  {
    img: '/assets/img/i.jpg',
    title: 'Long Flower Vase',
    weight: 'XL',
    name: 'Size',
    color: 'Light Green',
    quantity: '1',
    price: '$67.00',
  },
] as const;

// counters data
export const counters = [
  {
    title: 'Daily New Visitors',
    number: '145',
    price: '100',
    symbol: 'K',
    style: 'me-1',
  },
  {
    title: 'Active Listings',
    number: '670',
    price: '100',
    symbol: '',
    style: '',
  },
  {
    title: 'Won Awards',
    number: '22',
    price: '1',
    symbol: '',
    style: '',
  },
  {
    title: 'Happy Customers',
    number: '642',
    price: '100',
    symbol: 'K',
    style: 'me-1',
  },
] as const;

// process2 data
export const process2 = [
  {
    icon: 'bi bi-pin-map-fill',
    title: 'Explore Best Place',
    desc: 'Reviewers tend to be distracted by presented with the actual comprehensible content often happens that private corporate clients corder.',
  },
  {
    icon: 'bi bi-send-check',
    title: 'Contact Listing Author',
    desc: 'Reviewers tend to be distracted by presented with the actual comprehensible content often happens that private corporate clients corder.',
  },
  {
    icon: 'bi bi-person-check',
    title: 'Make Your Reservation',
    desc: 'Reviewers tend to be distracted by presented with the actual comprehensible content often happens that private corporate clients corder.',
  },
] as const;

// experts data
export const experts = [
  {
    img: '/assets/img/team-1.jpg',
    title: 'Julia F. Mitchell',
    name: 'Chief Executive',
  },
  {
    img: '/assets/img/team-3.jpg',
    title: 'Maria P. Thomas',
    name: 'Co-Founder',
  },
  {
    img: '/assets/img/team-4.jpg',
    title: 'Willa R. Fontaine',
    name: 'Field Manager',
  },
  {
    img: '/assets/img/team-5.jpg',
    title: 'Rosa R. Anderson',
    name: 'Business Executive',
  },
  {
    img: '/assets/img/team-6.jpg',
    title: 'Jacqueline J. Miller',
    name: 'Account Manager',
  },
  {
    img: '/assets/img/team-7.jpg',
    title: 'Oralia R. Castillo',
    name: 'Writing Manager',
  },
  {
    img: '/assets/img/team-8.jpg',
    title: 'Lynda W. Ruble',
    name: 'Team Manager',
  },
] as const;

// articles data
export const articles = [
  {
    img: '/assets/img/blog-1.jpg',
    title: 'Top 10 Free Bootstrap Templates for Your Next Project',
    date: 'Sep 10 2025',
  },
  {
    img: '/assets/img/blog-2.jpg',
    title: 'Top 10 Free Bootstrap Templates for Your Next Project',
    date: 'Sep 10 2025',
  },
  {
    img: '/assets/img/blog-3.jpg',
    title: 'Top 10 Free Bootstrap Templates for Your Next Project',
    date: 'Sep 10 2025',
  },
  {
    img: '/assets/img/blog-4.jpg',
    title: 'Top 10 Free Bootstrap Templates for Your Next Project',
    date: 'Sep 10 2025',
  },
  {
    img: '/assets/img/blog-5.jpg',
    title: 'Top 10 Free Bootstrap Templates for Your Next Project',
    date: 'Sep 10 2025',
  },
] as const;

// tags data
export const tags = [
  {
    title: 'Job',
  },
  {
    title: 'Web Design',
  },
  {
    title: 'Development',
  },
  {
    title: 'Figma',
  },
  {
    title: 'Photoshop',
  },
  {
    title: 'HTML',
  },
] as const;

// helps data
export const helps = [
  {
    icon: 'bi bi-people-fill',
    title: 'Community',
    desc: "Think of a news blog that's filled with content hourly on the day of going live.",
    name: 'Share',
    name1: 'Network',
    name2: 'Discussion',
  },
  {
    icon: 'bi bi-file-earmark-text-fill',
    title: 'Order',
    desc: "Think of a news blog that's filled with content hourly on the day of going live.",
    name: 'Tracking',
    name1: 'Delivery',
    name2: 'Management',
  },
  {
    icon: 'bi bi-coin',
    title: 'Refund Policy',
    desc: "Think of a news blog that's filled with content hourly on the day of going live.",
    name: 'Share',
    name1: 'Methods',
    name2: 'Process',
  },
  {
    icon: 'bi bi-person-check',
    title: 'Account Issues',
    desc: "Think of a news blog that's filled with content hourly on the day of going live.",
    name: 'Profile',
    name1: 'Settings',
    name2: 'Password',
  },
  {
    icon: 'bi bi-bar-chart',
    title: 'Business Helps',
    desc: "Think of a news blog that's filled with content hourly on the day of going live.",
    name: 'Dashboard',
    name1: 'Report',
    name2: 'Logistics',
  },
  {
    icon: 'bi bi-credit-card-2-back',
    title: 'Payment',
    desc: "Think of a news blog that's filled with content hourly on the day of going live.",
    name: 'Methods',
    name1: 'VAT',
    name2: 'Security',
  },
  {
    icon: 'bi bi-camera-reels',
    title: 'Guides',
    desc: "Think of a news blog that's filled with content hourly on the day of going live.",
    name: 'Tutorials',
    name1: 'Blogs',
    name2: 'Newsletters',
  },
  {
    icon: 'bi bi-patch-question',
    title: 'FAQs',
    desc: "Think of a news blog that's filled with content hourly on the day of going live.",
    name: 'Share',
    name1: 'Help',
    name2: 'Articles',
  },
] as const;

// articles2 data
export const articles2 = [
  {
    title: 'What are Favorites?',
    desc: '"Favorites" is a feature that allows you to save your treasured items on Envato Market. So if you see something you like, but you\u2019re not ready to u...',
  },
  {
    title: 'How Do I Add Or Change My Billing Details?',
    desc: '"Favorites" is a feature that allows you to save your treasured items on Envato Market. So if you see something you like, but you\u2019re not ready to u...',
  },
  {
    title: 'How do I change my username?',
    desc: '"Favorites" is a feature that allows you to save your treasured items on Envato Market. So if you see something you like, but you\u2019re not ready to u...',
  },
  {
    title: 'How do I change my email address?',
    desc: '"Favorites" is a feature that allows you to save your treasured items on Envato Market. So if you see something you like, but you\u2019re not ready to u...',
  },
  {
    title: "I'm not receiving the verification email",
    desc: '"Favorites" is a feature that allows you to save your treasured items on Envato Market. So if you see something you like, but you\u2019re not ready to u...',
  },
  {
    title: 'How do I change my password?',
    desc: '"Favorites" is a feature that allows you to save your treasured items on Envato Market. So if you see something you like, but you\u2019re not ready to u...',
  },
] as const;

// faqs data
export const faqs = [
  {
    name: "Basic FAQ's Block",
    mid: 'accordionFlushExample',
    id: 'flush-collapseOne',
    id1: 'flush-collapseTwo',
    id2: 'flush-collapseThree',
    id3: 'flush-collapseFour',
    id4: 'flush-collapseFive',
    title: 'How to Meet ThinksToDo Directory Agents?',
    title1: 'Can I see Property Visualy?',
    title2: 'Can We Sell it?',
    title3: ' Can We Customized it According me?',
    title4: 'Can We Get Any Extra Services?',
    desc: "In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the internet. The are likely to focus on the text, disregarding the layout and its elements.",
  },
  {
    name: 'Payment & Refund',
    mid: 'paymentFlushExample',
    id: 'flush-collapseOne2',
    id1: 'flush-collapseTwo2',
    id2: 'flush-collapseThree2',
    id3: 'flush-collapseFour2',
    id4: 'flush-collapseFive2',
    title: 'Can We Refund it Within 7 Days?',
    title1: 'Can We Pay Via PayPal Service?',
    title2: 'Will You Accept American Express Card?',
    title3: ' Will You Charge Monthly Wise?',
    title4: 'Can We Get Any Extra Services?',
    desc: "In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the internet. The are likely to focus on the text, disregarding the layout and its elements.",
  },
] as const;

// badges data
export const badges = [
  {
    title: 'Primary',
    title1: 'Info',
    title2: 'secondary',
    title3: 'success',
    title4: 'Danger',
    title5: 'Dark',
    style: '',
  },
  {
    title: 'Primary',
    title1: 'Info',
    title2: 'secondary',
    title3: 'success',
    title4: 'Danger',
    title5: 'Dark',
    style: 'badge-xs',
  },
] as const;
