import { Code2, Palette, Rocket, Users } from 'lucide-react';

const skillCategories = [
  {
    icon: Code2,
    title: 'Technical Expertise',
    color: 'emerald',
    skills: [
      'React.js & Next.js',
      'TypeScript & JavaScript',
      'Node.js & Express',
      'GraphQL & REST APIs',
      'AWS & Cloud Services',
      'Docker & Kubernetes',
      'CI/CD & DevOps',
      'Testing (Jest, Cypress)'
    ]
  },
  {
    icon: Palette,
    title: 'Design & UX',
    color: 'yellow',
    skills: [
      'Responsive Design',
      'Accessibility (WCAG)',
      'Design Systems',
      'Figma & Adobe XD',
      'Tailwind CSS',
      'CSS-in-JS',
      'Animation & Motion',
      'User Research'
    ]
  },
  {
    icon: Rocket,
    title: 'Architecture',
    color: 'emerald',
    skills: [
      'Micro-frontends',
      'System Design',
      'Performance Optimization',
      'State Management',
      'Code Splitting',
      'SEO Optimization',
      'Progressive Web Apps',
      'Serverless Architecture'
    ]
  },
  {
    icon: Users,
    title: 'Leadership',
    color: 'yellow',
    skills: [
      'Team Management',
      'Code Reviews',
      'Mentoring',
      'Agile/Scrum',
      'Technical Writing',
      'Stakeholder Communication',
      'Project Planning',
      'Cross-functional Collaboration'
    ]
  }
];

export function Skills() {
  return (
    <section className="mb-12">
      {/* Main headline banner */}
      <div className="bg-black text-white p-6 mb-6">
        <h2 className="text-5xl text-center">
          What I Bring to the Table
        </h2>
        <p className="text-center mt-2 text-gray-300">A comprehensive toolkit for building exceptional digital experiences</p>
      </div>

      {/* Featured capability - Large spotlight */}
      <div className="bg-emerald-500 border-4 border-black p-8 mb-6">
        <div className="flex items-start gap-6">
          <Code2 className="h-16 w-16 flex-shrink-0" />
          <div>
            <h3 className="text-4xl mb-3">Technical Mastery</h3>
            <p className="text-lg mb-4">
              Building scalable applications with modern technologies. From React ecosystems to cloud infrastructure, 
              I architect solutions that perform at scale.
            </p>
            <div className="flex flex-wrap gap-2">
              {skillCategories[0].skills.map((skill, idx) => (
                <span 
                  key={idx}
                  className="bg-white border-2 border-black px-4 py-2 text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Two column layout for remaining skills */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Design spotlight */}
        <div className="border-4 border-black p-6 bg-yellow-300">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="h-10 w-10" />
            <h3 className="text-3xl">Design & UX</h3>
          </div>
          <p className="mb-4">
            Bridging the gap between design and development. Creating beautiful, accessible interfaces that users love.
          </p>
          <div className="space-y-2">
            {skillCategories[1].skills.map((skill, idx) => (
              <div 
                key={idx}
                className="bg-white border-l-4 border-black px-3 py-2 text-sm"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Architecture spotlight */}
        <div className="border-4 border-black p-6 bg-white">
          <div className="flex items-center gap-3 mb-4">
            <Rocket className="h-10 w-10" />
            <h3 className="text-3xl">Architecture</h3>
          </div>
          <p className="mb-4">
            Designing systems that scale. Performance-first approach to building modern web applications.
          </p>
          <div className="space-y-2">
            {skillCategories[2].skills.map((skill, idx) => (
              <div 
                key={idx}
                className="bg-emerald-50 border-l-4 border-emerald-500 px-3 py-2 text-sm"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;