import { TIMELINE_DATA } from "@/config/constants"
import { Briefcase, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Experience = () => {
  return (
    <section className="mb-12 border-b-2 border-black pb-12">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-5xl">My Experience</h2>
        <div className="h-1 flex-1 bg-black"></div>
      </div>

      <div className="space-y-8">
        {TIMELINE_DATA.map((exp, index) => (
          <article key={exp.id} className="relative pl-8 border-l-4 border-emerald-500">
            <div className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-emerald-500 border-4 border-white"></div>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="md:col-span-1">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-emerald-600" />
                  <p className="text-sm">{exp.period}</p>
                </div>
                <div className={`inline-block px-3 py-1 text-xs border-2 border-black ${
                  index % 2 === 0 ? 'bg-yellow-300' : 'bg-emerald-100'
                }`}>
                  {exp.company}
                </div>
              </div>
              
              <div className="md:col-span-3">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-2xl mb-1">{exp.role}</h3>
                    <p className="text-base text-gray-700 mb-3">{exp.description}</p>
                  </div>
                  <Briefcase className="h-6 w-6 text-gray-400 flex-shrink-0 ml-4" />
                </div>
                
                <div className="mb-3">
                  <p className="text-sm uppercase tracking-wide mb-2">Key Achievements:</p>
                  <ul className="space-y-1">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-emerald-600 mt-1">▪</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="border-black">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Experience;
