interface TimelineItemProps {
    period: string;
    company: string;
    role: string;
}

const TimelineItem = ({ period, company, role }: TimelineItemProps) => (
    <div className="relative pb-10 pl-[38px]">
        <div className="absolute -left-2 w-4 h-4 rounded-full bg-green-500" />
        <p className="leading-[24px]">{period}</p>
        <h3 className="font-bold text-2xl underline font-primary">{company}</h3>
        <p className="font-primary">{role}</p>
    </div>
)

export default TimelineItem