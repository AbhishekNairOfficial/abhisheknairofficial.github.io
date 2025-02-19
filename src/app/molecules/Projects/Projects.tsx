import { PROJECTS } from "@/config/constants";

const Projects = () => {
    return (
        <div className="grid grid-cols-3 gap-4">
            {PROJECTS.map((project, index) => (
                <div className={`w-full p-[50px] ${index === 1 ? 'border-l-2 border-r-2 border-black' : ''}`} key={project.title}>
                    <h4 className="font-primary text-2xl mb-[30px]">{project.title}</h4>
                    <p className="font-secondary text-base">{project.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Projects; 