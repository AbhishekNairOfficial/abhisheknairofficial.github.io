// const Footer = () => {
//     return (
//         <footer className="bg-primary px-[100px] py-[50px]">
//             <p className="text-white text-2xl">© {new Date().getFullYear()}. Made with love, sleepless nights and Next JS.</p>
//         </footer>);
// };

// export default Footer; 


import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-3xl mb-4">Get In Touch</h3>
            <p className="text-gray-300 mb-4">
              I'm always interested in hearing about new opportunities and exciting projects.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-400" />
                <a href="mailto:abhishek@example.com" className="text-sm hover:text-emerald-400 transition-colors">
                  abhishek@example.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-400" />
                <a href="tel:+1234567890" className="text-sm hover:text-emerald-400 transition-colors">
                  +1 (234) 567-8900
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-400" />
                <span className="text-sm">Seattle, WA</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-3xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#experience" className="text-sm hover:text-yellow-300 transition-colors">Experience</a></li>
              <li><a href="#clients" className="text-sm hover:text-yellow-300 transition-colors">Clients</a></li>
              <li><a href="#skills" className="text-sm hover:text-yellow-300 transition-colors">Skills</a></li>
              <li><a href="#resume" className="text-sm hover:text-yellow-300 transition-colors">Resume</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-3xl mb-4">Connect</h3>
            <p className="text-gray-300 mb-4 text-sm">
              Follow me on social media to stay updated with my latest work and thoughts on technology.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com" className="p-2 border border-white hover:bg-white hover:text-black transition-all">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" className="p-2 border border-white hover:bg-white hover:text-black transition-all">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="p-2 border border-white hover:bg-white hover:text-black transition-all">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Abhishek. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-gray-400">
              <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-emerald-500 py-2">
        <p className="text-center text-black text-sm">
            © {new Date().getFullYear()}. Made with love, sleepless nights and Next JS.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
