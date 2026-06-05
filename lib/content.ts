// CMS content types and default fallback content
export interface SiteContent {
  hero: HeroContent;
  about: AboutContent;
  stats: StatsContent;
  construction: ConstructionContent;
  consultancy: ConsultancyContent;
  projects: ProjectsContent;
  team: TeamContent;
  testimonials: TestimonialsContent;
  contact: ContactContent;
  branding: BrandingContent;
  visibility: VisibilityContent;
}

export interface HeroContent {
  headline: string;
  subheadline: string;
  tagline: string;
  ctaConstruction: string;
  ctaConsultancy: string;
  backgroundImage?: string;
  badges?: string[]; // Trust badges row
}

export interface AboutContent {
  title: string;
  body: string;
  vision: string;
  mission: string;
  values: string;
  founded: string;
  image?: string; // Feature image shown on the right side
}

export interface StatsContent {
  stats: Array<{ label: string; value: number; suffix: string }>;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
  image?: string;
}

export interface ConstructionContent {
  title: string;
  subtitle: string;
  body: string;
  services: ServiceItem[];
  image?: string;
  highlights?: string[]; // bullet-point highlights on landing card
}

export interface ConsultancyContent {
  title: string;
  subtitle: string;
  body: string;
  services: ServiceItem[];
  image?: string;
  highlights?: string[];
}

export interface Project {
  id: string;
  title: string;
  category: 'building' | 'civil' | 'road' | 'water' | 'renovation';
  location: string;
  year: string;
  description: string;
  image?: string;
  client?: string;
}

export interface ProjectsContent {
  title: string;
  subtitle: string;
  projects: Project[];
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  photo?: string;
}

export interface TeamContent {
  title: string;
  subtitle: string;
  members: TeamMember[];
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  quote: string;
  avatar?: string;
}

export interface TestimonialsContent {
  title: string;
  subtitle: string;
  items: Testimonial[];
}

export interface ContactContent {
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  whatsapp?: string;
  offices: Array<{
    city: string;
    address: string;
    floor?: string;
  }>;
}

export interface BrandingContent {
  primaryColor: string;
  accentColor: string;
  fontHeading: string;
  fontBody: string;
}

export interface VisibilityContent {
  showStats: boolean;
  showTeam: boolean;
  showTestimonials: boolean;
  showProjects: boolean;
  showConstruction: boolean;
  showConsultancy: boolean;
  showCertifications: boolean;
}

// Default content (used when Firestore data is unavailable)
export const defaultContent: SiteContent = {
  hero: {
    headline: 'Building Kenya\'s Future,\nProtecting Its People',
    subheadline: 'Enviromate Technologies Limited combines world-class civil & building construction with comprehensive environmental health & safety consultancy.',
    tagline: 'Come Home To Quality',
    ctaConstruction: 'Explore Construction',
    ctaConsultancy: 'Explore Consultancy',
    backgroundImage: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1600&auto=format&fit=crop&q=80',
    badges: ['NCA Registered', 'Est. 2018', 'ISO Compliant Advisory', 'OSHA Certified'],
  },
  about: {
    title: 'About Enviromate Technologies',
    body: 'Enviromate Technologies Limited is a fully incorporated, locally owned company registered in Kenya under the Companies Act, Cap 486. Since commencing operations in 2018, we have built a reputation for delivering civil, structural, and building construction projects to the highest standards — while simultaneously offering industry-leading environmental health & safety consultancy services across East Africa.',
    vision: 'A regional market leader in the provision of civil engineering, building construction, and environmental health & safety consultancy services.',
    mission: 'To be a world-class engineering and consultancy firm providing efficient, affordable, sustainable, and cost-effective services of the highest quality.',
    values: 'We believe in maintaining the highest standards of professionalism, integrity, creativity, and a positive attitude — delivering solutions that meet and surpass expectations while standing the test of time.',
    founded: '2018',
    image: '',
  },
  stats: {
    stats: [
      { label: 'Years in Operation', value: 7, suffix: '+' },
      { label: 'Projects Completed', value: 50, suffix: '+' },
      { label: 'Counties Served', value: 12, suffix: '+' },
      { label: 'Satisfied Clients', value: 200, suffix: '+' },
    ],
  },
  construction: {
    title: 'Construction Division',
    subtitle: 'Civil & Building Contractors | Plant Hire | General Supplies',
    body: 'From large-scale civil infrastructure to precision building works and expert renovation — we bring your vision to life with technical excellence and a commitment to quality.',
    highlights: ['Civil Works & Infrastructure', 'Building & Finishing Works', 'Renovation Projects', 'Plant & Machinery Hire'],
    image: '',
    services: [
      { title: 'Civil Works', description: 'Bulk earthworks, heavy concrete works, access roads, piled foundations, water supply and sanitation infrastructure, well pads, and construction camps.', icon: 'Construction' },
      { title: 'Building Works', description: 'Full construction sequence: marking, excavation, concreting, masonry, roofing, flooring, joinery, drywall, suspended and acoustic ceilings, finishing.', icon: 'Building2' },
      { title: 'Renovation', description: 'Specialized office and commercial renovation projects. We collaborate with top-quality engineering teams to carry out projects of all scales.', icon: 'Hammer' },
      { title: 'Plant Hire', description: 'Top-of-the-range earth movers, transport equipment, reinforced concrete equipment, and lightweight machinery available for hire.', icon: 'Truck' },
      { title: 'Road Works', description: 'Construction and maintenance of roads and related infrastructure, utilities, and pipework — serving government and private sector clients.', icon: 'Route' },
      { title: 'Water & Sanitation', description: 'Design and construction of water supply and sanitation systems, dams, irrigation, sewerage, and drainage infrastructure.', icon: 'Droplets' },
    ],
  },
  consultancy: {
    title: 'Consultancy Division',
    subtitle: 'Environmental Health & Safety | ISO Certification | Training',
    body: 'Our consultancy arm delivers comprehensive Environmental, Health & Safety (EHS) services to businesses across Kenya — helping organizations stay compliant, safe, and operationally excellent.',
    highlights: ['Health & Safety Audits', 'Environmental Impact Assessments', 'ISO Certification Support', 'Occupational Safety Training'],
    image: '',
    services: [
      { title: 'Health & Safety Audits', description: 'Statutory workplace H&S audits as required by the Occupational Safety and Health Act (OSHA 2007), conducted by registered advisers.', icon: 'ShieldCheck' },
      { title: 'Fire Safety Audits', description: 'Fire risk assessments and audits per the Fire Risk Reduction Rules 2007, ensuring legal compliance and a safe work environment.', icon: 'Flame' },
      { title: 'Environmental Impact Assessment', description: 'EIA and Environmental Audits conducted pursuant to EMCA 1999, including full regulatory documentation and compliance reporting.', icon: 'Leaf' },
      { title: 'Risk Assessments', description: 'Systematic hazard identification and risk evaluation to protect workers, equipment, and productivity.', icon: 'AlertTriangle' },
      { title: 'ISO Certification Support', description: 'Training and implementation support for ISO 9001:2015, ISO 22000:2018, ISO 14001, and OHSAS 18001 certification.', icon: 'Award' },
      { title: 'Training Programs', description: 'OSH Committee Training, First Aid, Fire Safety, Food Safety, Confined Space Entry, Work at Height, Chemical Safety and more.', icon: 'GraduationCap' },
      { title: 'Air Quality & Noise Surveys', description: 'Occupational noise mapping, air quality monitoring, and environmental sampling with actionable recommendations.', icon: 'Wind' },
      { title: 'Energy Management Audits', description: 'Comprehensive energy use analysis with a focus on identifying cost savings, operational improvements, and sustainability.', icon: 'Zap' },
    ],
  },
  projects: {
    title: 'Our Projects',
    subtitle: 'A proven track record of excellence across Kenya',
    projects: [
      { id: '1', title: 'Nyahururu County Referral Hospital', category: 'building', location: 'Nyahururu, Laikipia County', year: '2022', description: 'Full construction works for the county referral hospital complex including structural, civil, and finishing works.', client: 'County Government of Laikipia' },
      { id: '2', title: 'Segera Security Houses', category: 'building', location: 'Segera', year: '2021', description: 'Construction of residential security housing units to modern building standards.', client: 'Private Client' },
      { id: '3', title: 'Kisergei Dining Hall', category: 'building', location: 'Kisergei', year: '2022', description: 'Design and construction of a large-capacity dining hall facility.', client: 'Government of Kenya' },
      { id: '4', title: 'Uaso Nyiro Comprehensive School Classrooms', category: 'building', location: 'Uaso Nyiro', year: '2023', description: 'Construction of modern classroom blocks for the comprehensive secondary school.', client: 'Ministry of Education' },
      { id: '5', title: 'Road Infrastructure Works', category: 'road', location: 'Various Counties', year: '2020–2024', description: 'Construction and maintenance of road networks and related civil infrastructure across multiple counties.', client: 'Government Agencies' },
      { id: '6', title: 'Water Supply & Sanitation Projects', category: 'water', location: 'Various Locations', year: '2019–2024', description: 'Design and construction of water supply systems, sanitation infrastructure, and drainage works.', client: 'Public & Private Sector' },
    ],
  },
  team: {
    title: 'Our Leadership Team',
    subtitle: 'Experienced professionals driving excellence at every level',
    members: [
      { id: '1', name: 'Managing Director', title: 'Managing Director', bio: 'Leading Enviromate Technologies with a vision to be the regional market leader in construction and EHS consultancy across East Africa.' },
      { id: '2', name: 'Operations Manager', title: 'Operations Manager', bio: 'Overseeing day-to-day operations and ensuring every project meets our uncompromising quality and safety standards.' },
      { id: '3', name: 'Project Manager', title: 'Project Manager', bio: 'Managing construction and consultancy project lifecycles with precision, from inception to successful client handover.' },
      { id: '4', name: 'Human Resource Lead', title: 'Human Resource Manager', bio: 'Building and nurturing the talent that makes Enviromate\'s promise of quality a daily reality on every site.' },
    ],
  },
  testimonials: {
    title: 'What Our Clients Say',
    subtitle: 'Trusted by government agencies, corporates, and private developers',
    items: [
      { id: '1', name: 'County Director of Public Works', title: 'Director of Public Works', company: 'County Government of Laikipia', quote: 'Enviromate Technologies delivered the Nyahururu County Referral Hospital project within budget and on schedule. Their quality of workmanship and site management are exemplary.' },
      { id: '2', name: 'Head of Facilities', title: 'Head of Facilities', company: 'Government Ministry', quote: 'The EHS consultancy team conducted a thorough audit of our premises. Their recommendations were practical, legally sound, and implemented efficiently.' },
      { id: '3', name: 'Private Developer', title: 'Managing Director', company: 'Real Estate Developer', quote: 'From planning through to finishing, Enviromate exceeded our expectations on every front. They truly come home to quality.' },
    ],
  },
  contact: {
    title: 'Get In Touch',
    subtitle: 'Ready to start your project? Let\'s talk.',
    email: 'enviromatetechnologies@gmail.com',
    phone: '+254 720 312 257',
    whatsapp: '+254720312257',
    offices: [
      { city: 'Nairobi (HQ)', address: 'Mountain Mall, Thika Road', floor: '3rd Floor, Room D8' },
      { city: 'Nanyuki', address: 'Nanyuki Business Center', floor: '2nd Floor, Room 202' },
      { city: 'Narok', address: 'Sogra House', floor: '1st Floor, Room 18' },
    ],
  },
  branding: {
    primaryColor: '#5dae3e',
    accentColor: '#94d03c',
    fontHeading: 'Playfair Display',
    fontBody: 'Inter',
  },
  visibility: {
    showStats: true,
    showTeam: true,
    showTestimonials: true,
    showProjects: true,
    showConstruction: true,
    showConsultancy: true,
    showCertifications: true,
  },
};
