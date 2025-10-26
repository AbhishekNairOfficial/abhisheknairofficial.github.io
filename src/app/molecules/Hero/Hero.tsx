import { Button } from '@/components/ui';
import { Download } from 'lucide-react';

export function Hero() {
  return (
    <section className="mb-12 border-b-2 border-black pb-12">
      <div className="bg-yellow-300 p-8 mb-8 border-2 border-black">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 tracking-tight">
              Senior Product
              {' '}
              <span className="bg-white px-2 sm:px-3 py-1 inline-block border-2 border-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 cursor-pointer transition-all duration-300">
                Technologist
              </span>
            </h2>
          </div>
          <div>
            <p className="text-lg">
              Software Engineer with 8+ years of experience specializing in React.js, Next.js, and
              enterprise-scale web applications. Expert in UX implementation, RESTful APIs, and modern
              frontend architectures.
            </p>
          </div>
        </div>
      </div>

      <div className="prose max-w-none">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border-l-4 border-emerald-500 pl-6">
            <h3 className="text-2xl mb-3">
              About Me
            </h3>
            <p className="text-base mb-4">
              Hello, my name is Abhishek, and I&apos;m a developer based in Bellevue, WA. With over 8 years of
              experience in the industry, I currently hold the position of Senior Product Technologist at Rhombuz LLC.
            </p>
            <p className="text-base mb-4">
              I specialize in building scalable, user-centric applications that solve real-world problems.
              My expertise spans the full spectrum of modern frontend development, from architecture design
              to implementation and optimization.
            </p>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </div>

          <div className="bg-gray-50 p-6 border-2 border-black">
            <h3 className="text-2xl mb-4">
              Quick Facts
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="bg-emerald-500 text-white px-2 py-1 text-xs">
                  01
                </span>
                <div>
                  <p className="font-semibold">
                    Experience
                  </p>
                  <p className="text-sm text-gray-600">
                    8+ years in software engineering
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-yellow-400 text-black px-2 py-1 text-xs">
                  02
                </span>
                <div>
                  <p className="font-semibold">
                    Specialization
                  </p>
                  <p className="text-sm text-gray-600">
                    Frontend, Architecture, and UX Engineering
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-emerald-500 text-white px-2 py-1 text-xs">
                  03
                </span>
                <div>
                  <p className="font-semibold">
                    Current Role
                  </p>
                  <p className="text-sm text-gray-600">
                    Senior Product Technologist @ Rhombuz LLC
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-yellow-400 text-black px-2 py-1 text-xs">
                  04
                </span>
                <div>
                  <p className="font-semibold">
                    Location
                  </p>
                  <p className="text-sm text-gray-600">
                    Bellevue, Washington
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
