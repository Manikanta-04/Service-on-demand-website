export const Footer = () => {
  return (
    <footer className="bg-surface2 pt-16 pb-8 border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-1">
          <div className="font-display font-bold text-2xl tracking-tight text-text flex items-center gap-2 mb-4">
            <span className="text-accent">◆</span> Service Now
          </div>
          <p className="text-muted text-sm leading-relaxed">
            Your trusted partner for premium home services. We connect you with top-rated professionals instantly.
          </p>
        </div>
        
        <div>
          <h4 className="font-display font-bold text-lg mb-4 text-text">Company</h4>
          <ul className="space-y-3 text-muted text-sm">
            <li><a href="#" className="hover:text-accent transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-lg mb-4 text-text">For Customers</h4>
          <ul className="space-y-3 text-muted text-sm">
            <li><a href="#" className="hover:text-accent transition-colors">Categories</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Safety</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-lg mb-4 text-text">For Professionals</h4>
          <ul className="space-y-3 text-muted text-sm">
            <li><a href="#" className="hover:text-accent transition-colors">Join as a Pro</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Pro Help Center</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Success Stories</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-faint text-sm">© 2026 Service Now. All rights reserved.</p>
        <div className="flex gap-4 text-faint">
          <a href="#" className="hover:text-text transition-colors">Twitter</a>
          <a href="#" className="hover:text-text transition-colors">Instagram</a>
          <a href="#" className="hover:text-text transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};
