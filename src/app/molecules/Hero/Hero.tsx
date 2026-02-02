import { Button } from '@/components/ui';
import { Download } from 'lucide-react';
import {
  ABOUT_ME_TEXT_PART1,
  ABOUT_ME_TEXT_PART2,
  ABOUT_ME_TITLE,
  DOWNLOAD_RESUME_TEXT,
  FACT_CURRENT_ROLE_DESC,
  FACT_CURRENT_ROLE_LABEL,
  FACT_CURRENT_ROLE_NUMBER,
  FACT_EXPERIENCE_DESC,
  FACT_EXPERIENCE_LABEL,
  FACT_EXPERIENCE_NUMBER,
  FACT_LOCATION_DESC,
  FACT_LOCATION_LABEL,
  FACT_LOCATION_NUMBER,
  FACT_SPECIALIZATION_DESC,
  FACT_SPECIALIZATION_LABEL,
  FACT_SPECIALIZATION_NUMBER,
  HERO_DESCRIPTION,
  HERO_TITLE_PART1,
  HERO_TITLE_PART2,
  QUICK_FACTS_TITLE,
} from '@/config/constants';

export function Hero() {
  return (
    <section className="mb-12 border-b-2 border-black pb-12">
      <div className="bg-yellow-300 p-8 mb-8 border-2 border-black">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 tracking-tight">
              {HERO_TITLE_PART1}
              {' '}
              <span className="bg-white px-2 sm:px-3 py-1 inline-block border-2 border-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 cursor-pointer transition-all duration-300">
                {HERO_TITLE_PART2}
              </span>
            </h2>
          </div>
          <div>
            <p className="text-lg">
              {HERO_DESCRIPTION}
            </p>
          </div>
        </div>
      </div>

      <div className="prose max-w-none">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border-l-4 border-emerald-500 pl-6">
            <h3 className="text-2xl mb-3">
              {ABOUT_ME_TITLE}
            </h3>
            <p className="text-base mb-4">
              {ABOUT_ME_TEXT_PART1}
            </p>
            <p className="text-base mb-4">
              {ABOUT_ME_TEXT_PART2}
            </p>
            <Button className="bg-emerald-800 hover:bg-emerald-900">
              <Download className="mr-2 h-4 w-4" />
              {DOWNLOAD_RESUME_TEXT}
            </Button>
          </div>

          <div className="bg-gray-50 p-6 border-2 border-black">
            <h3 className="text-2xl mb-4">
              {QUICK_FACTS_TITLE}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="bg-emerald-700 text-white px-2 py-1 text-xs">
                  {FACT_EXPERIENCE_NUMBER}
                </span>
                <div>
                  <p className="font-semibold">
                    {FACT_EXPERIENCE_LABEL}
                  </p>
                  <p className="text-sm text-gray-600">
                    {FACT_EXPERIENCE_DESC}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-yellow-400 text-black px-2 py-1 text-xs">
                  {FACT_SPECIALIZATION_NUMBER}
                </span>
                <div>
                  <p className="font-semibold">
                    {FACT_SPECIALIZATION_LABEL}
                  </p>
                  <p className="text-sm text-gray-600">
                    {FACT_SPECIALIZATION_DESC}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-emerald-700 text-white px-2 py-1 text-xs">
                  {FACT_CURRENT_ROLE_NUMBER}
                </span>
                <div>
                  <p className="font-semibold">
                    {FACT_CURRENT_ROLE_LABEL}
                  </p>
                  <p className="text-sm text-gray-600">
                    {FACT_CURRENT_ROLE_DESC}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-yellow-400 text-black px-2 py-1 text-xs">
                  {FACT_LOCATION_NUMBER}
                </span>
                <div>
                  <p className="font-semibold">
                    {FACT_LOCATION_LABEL}
                  </p>
                  <p className="text-sm text-gray-600">
                    {FACT_LOCATION_DESC}
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
