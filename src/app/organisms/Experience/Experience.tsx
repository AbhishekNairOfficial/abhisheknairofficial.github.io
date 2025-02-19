import { EXPERIENCE_TEXT } from "@/config/constants"
import Timeline from "@/app/molecules/Timeline"
import Button from "@/app/atoms/Button"

const Experience = () => (
    <section className="mx-[50px] p-[50px]">
        <h2 className="font-primary text-5xl underline mb-[30px]">My Experience</h2>
        <div className="flex">
            <p className="flex-1 text-2xl text-justify">
                {EXPERIENCE_TEXT}
                <Button className='mt-7'>Resume</Button>
            </p>
            <Timeline />
        </div>
    </section>
)

export default Experience