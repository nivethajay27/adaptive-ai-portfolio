import type { PortfolioData } from './types';

export const BASE_PORTFOLIO: PortfolioData = {
  name: 'Nivetha Jayakumar',
  tagline: 'Software Engineer building AI-powered, full-stack web and mobile products',
  bio: 'I am a full-stack software engineer based in San Jose, CA, with experience shipping scalable web and mobile products, automation systems, and ML-backed analytics. I build with React, TypeScript, Python, and modern cloud tooling, and I focus on measurable product outcomes, system reliability, and strong user experience.',
  location: 'San Jose, CA',
  email: 'nivethajayk@gmail.com',
  linkedin: 'https://linkedin.com/in/nivetha-jay',
  github: 'https://github.com/nivethajay27',
  coreSkills: [
    'JavaScript',
    'React',
    'TypeScript',
    'Python',
    'Node.js',
    'Java',
    'C++',
    'C#',
    'Swift',
    'SQL',
    'React Native',
    'Express',
    'Django',
    'Spring Boot',
    'Flask',
    'PostgreSQL',
    'MongoDB',
    'MySQL',
    'Firebase',
    'GCP',
    'AWS',
    'Docker',
    'Kubernetes',
    'CI/CD',
    'Jenkins',
    'Grok API',
    'Hugging Face API',
    'Stripe',
    'VB.NET',
    'PHP',
    'jQuery',
    'LLM APIs'
  ],
  highlights: [
    'Reduced API response times by 35% by building scalable React/React Native + Python/Firebase systems at Work Order Wizard.',
    'Cut pre-release bugs by 40% by leading end-to-end testing strategy for mobile and web applications.',
    'Improved process efficiency by 30% and reduced production downtime by 25% through full-stack automation and analytics tooling at Cisco.'
  ],
  projects: [
    {
      name: 'FullStack AI Chatbot',
      summary: 'Built a responsive full-stack chatbot with dynamic state management and Anthropic Claude integration.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'REST APIs', 'AWS', 'Anthropic API'],
      impact: 'Delivered scalable real-time conversations with secure APIs for efficient user query handling.',
      link: 'https://github.com/nivethajay27'
    },
    {
      name: 'Cisco Automation & Analytics Dashboard',
      summary: 'Engineered web products and ML-backed analytics modules used across engineering divisions for performance optimization.',
      tech: ['React', 'Python', 'Flask', 'MongoDB', 'Jenkins', 'Docker', 'Java'],
      impact: 'Enabled real-time visualization and helped drive 30% efficiency gains with 25% less production downtime.',
      link: 'https://www.linkedin.com/in/nivetha-jay/'
    },
    {
      name: 'Work Order Wizard Platform',
      summary: 'Built dynamic cross-platform product experiences and REST APIs for work order management.',
      tech: ['React Native', 'React', 'Python', 'Firebase', 'Figma', 'REST APIs'],
      impact: 'Reduced API response times by 35%, reduced bugs by 40%, and improved usability scores by 25%.',
      link: 'https://www.linkedin.com/in/nivetha-jay/'
    },
    {
      name: 'AI Sentiment Analytics Dashboard at Fresh Digital',
      summary: 'Developed an AI-driven analytics dashboard with sentiment classification for customer feedback.',
      tech: ['MeteorJS', 'HTML', 'CSS', 'MongoDB', 'GCP', 'NLTK', 'Scikit-learn'],
      impact: 'Enabled sentiment categorization (positive/negative/neutral) to support faster product insight loops.',
      link: 'https://www.linkedin.com/in/nivetha-jay/'
    },
    {
      name: 'Engineers India Limited Web Applications',
      summary: 'Built and supported web application features during internship as a web application developer.',
      tech: ['VB.NET', 'HTML', 'CSS', 'JavaScript', 'Web Development'],
      impact: 'Delivered production-ready web modules in a fast-paced internship environment.',
      link: 'https://www.linkedin.com/in/nivetha-jay/'
    },
    {
      name: 'Neural Network Developer and Analyst',
      summary: 'Contributed to neural network development and analysis workflows for applied AI use cases.',
      tech: ['Python', 'Neural Networks', 'Technical Design'],
      impact: 'Supported model development and analysis as part of a focused AI role.',
      link: 'https://www.linkedin.com/in/nivetha-jay/'
    },
    {
      name: 'Seasons E-commerce Platform',
      summary: 'Developed a complete responsive e-commerce website for a women’s clothing startup.',
      tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'jQuery', 'PHP', 'MySQL', 'Razorpay', 'Paytm'],
      impact: 'Implemented catalog, cart, checkout, payment integration, and admin panel for inventory/orders.',
      link: 'https://www.linkedin.com/in/nivetha-jay/'
    },
    {
      name: 'NSIC Android App Internship',
      summary: 'Built Android application components during internship at National Small Industries Corporation.',
      tech: ['Android', 'Java', 'Mobile App Development'],
      impact: 'Delivered mobile features and strengthened app architecture/design fundamentals.',
      link: 'https://www.linkedin.com/in/nivetha-jay/'
    },
    {
      name: 'AI-Powered Fitness Performance App',
      summary: 'Built a full-stack fitness tracking app with AI analytics for adaptive training insights.',
      tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Grok API'],
      impact: 'Enabled personalized workout analysis and adaptive recommendations from logged training data.',
      link: 'https://github.com/nivethajay27/AI-powered-fitness-app'
    },
    {
      name: 'AI Smart Expense Tracker',
      summary: 'Developed a full-stack expense tracker with AI-based automatic expense categorization.',
      tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Hugging Face API'],
      impact: 'Reduced manual categorization effort by automatically classifying user expenses.',
      link: 'https://github.com/nivethajay27/ai-powered-expense-tracker'
    },
    {
      name: 'My Fashion Closet',
      summary: 'Created a responsive wardrobe management app to organize and visualize outfits interactively.',
      tech: ['React', 'Node.js', 'Express', 'PostgreSQL'],
      impact: 'Streamlined outfit planning with an interactive full-stack closet experience.',
      link: 'https://github.com/nivethajay27/my-fashion-closet'
    },
    {
      name: 'Health INC - Appointment Booking with Stripe',
      summary: 'Built a Django appointment booking app with Stripe test-mode payment workflow and custom UI.',
      tech: ['Django', 'Python', 'Stripe', 'HTML', 'CSS'],
      impact: 'Demonstrated secure booking and payment flow with robust model/form architecture.',
      link: 'https://github.com/nivethajay27/health-inc'
    },
    {
      name: 'Recipe Organizer',
      summary: 'Built a full-stack recipe manager with image upload, tagging, favorites, and instant filtering.',
      tech: ['React', 'Node.js', 'Express', 'PostgreSQL'],
      impact: 'Improved recipe discoverability through tag-based filtering and search workflows.',
      link: 'https://github.com/nivethajay27/recipe-organizer'
    },
    {
      name: 'Mini Task Planner',
      summary: 'Developed a lightweight Trello-style planner with lists and tasks in a clean board UI.',
      tech: ['React', 'Node.js', 'Express', 'PostgreSQL'],
      impact: 'Enabled simple visual task tracking for personal planning and quick team collaboration.',
      link: 'https://github.com/nivethajay27/mini-trello-simple'
    },
    {
      name: 'AI Summary Bot',
      summary: 'Built an AI summarization assistant to generate concise summaries from user-provided content.',
      tech: ['Python', 'Node.js', 'LLM APIs', 'NLP'],
      impact: 'Accelerated content review workflows by turning long text into structured, readable summaries.',
      link: 'https://github.com/nivethajay27/ai-summary-bot'
    }
  ]
};
