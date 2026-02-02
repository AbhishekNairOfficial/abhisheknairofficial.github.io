import { Code2, Palette, Rocket, Users } from 'lucide-react';
import {
  SKILL_CATEGORIES,
  SKILLS_ARCHITECTURE_DESCRIPTION,
  SKILLS_ARCHITECTURE_TITLE,
  SKILLS_DESIGN_DESCRIPTION,
  SKILLS_DESIGN_TITLE,
  SKILLS_LEADERSHIP_DESCRIPTION,
  SKILLS_LEADERSHIP_TITLE,
  SKILLS_MAIN_TITLE,
  SKILLS_SUBTITLE,
  SKILLS_TECHNICAL_DESCRIPTION,
  SKILLS_TECHNICAL_MASTERY,
} from '@/config/constants';

const skillCategories = [
  {
    icon: Code2,
    title: SKILL_CATEGORIES[0].title,
    color: 'emerald',
    skills: SKILL_CATEGORIES[0].skills,
  },
  {
    icon: Palette,
    title: SKILL_CATEGORIES[1].title,
    color: 'yellow',
    skills: SKILL_CATEGORIES[1].skills,
  },
  {
    icon: Rocket,
    title: SKILL_CATEGORIES[2].title,
    color: 'emerald',
    skills: SKILL_CATEGORIES[2].skills,
  },
  {
    icon: Users,
    title: SKILL_CATEGORIES[3].title,
    color: 'yellow',
    skills: SKILL_CATEGORIES[3].skills,
  },
];

export function Skills() {
  return (
    <section
      className="mb-12"
      id="skills"
    >
      {/* Main headline banner */}
      <div className="bg-black text-white p-6 mb-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-center">
          {SKILLS_MAIN_TITLE}
        </h2>
        <p className="text-center mt-2 text-gray-300 text-sm sm:text-base">
          {SKILLS_SUBTITLE}
        </p>
      </div>

      {/* Featured capability - Large spotlight */}
      <div className="bg-emerald-500 border-4 border-black p-8 mb-6">
        <div className="flex items-start gap-6">
          <Code2 className="h-16 w-16 flex-shrink-0" />
          <div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl mb-3">
              {SKILLS_TECHNICAL_MASTERY}
            </h3>
            <p className="text-base sm:text-lg mb-4">
              {SKILLS_TECHNICAL_DESCRIPTION}
            </p>
            <div className="flex flex-wrap gap-2">
              {skillCategories[0].skills.map((skill, idx) => (
                <span
                  className="bg-white border-2 border-black px-2 sm:px-4 py-2 text-xs sm:text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all cursor-default break-words"
                  key={idx}
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
            <Palette className="h-8 w-8 sm:h-10 sm:w-10" />
            <h3 className="text-2xl sm:text-3xl">
              {SKILLS_DESIGN_TITLE}
            </h3>
          </div>
          <p className="mb-4">
            {SKILLS_DESIGN_DESCRIPTION}
          </p>
          <div className="space-y-2">
            {skillCategories[1].skills.map((skill, idx) => (
              <div
                className="bg-white border-l-4 border-black px-3 py-2 text-sm"
                key={idx}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Architecture spotlight */}
        <div className="border-4 border-black p-6 bg-white">
          <div className="flex items-center gap-3 mb-4">
            <Rocket className="h-8 w-8 sm:h-10 sm:w-10" />
            <h3 className="text-2xl sm:text-3xl">
              {SKILLS_ARCHITECTURE_TITLE}
            </h3>
          </div>
          <p className="mb-4">
            {SKILLS_ARCHITECTURE_DESCRIPTION}
          </p>
          <div className="space-y-2">
            {skillCategories[2].skills.map((skill, idx) => (
              <div
                className="bg-emerald-50 border-l-4 border-emerald-500 px-3 py-2 text-sm"
                key={idx}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership spotlight */}
      <div className="border-4 border-black p-6 bg-yellow-300">
        <div className="flex items-center gap-3 mb-4">
          <Users className="h-8 w-8 sm:h-10 sm:w-10" />
          <h3 className="text-2xl sm:text-3xl">
            {SKILLS_LEADERSHIP_TITLE}
          </h3>
        </div>
        <p className="mb-4">
          {SKILLS_LEADERSHIP_DESCRIPTION}
        </p>
        <div className="space-y-2">
          {skillCategories[3].skills.map((skill, idx) => (
            <div
              className="bg-white border-l-4 border-black px-3 py-2 text-sm"
              key={idx}
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;