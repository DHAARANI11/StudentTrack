
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground rounded-md p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                </svg>
              </div>
              <span className="font-bold text-xl">StudentTrack</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Empowering education through innovative tracking and management solutions.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-3">Product</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Features
                </a>
              </li>
              <li>
                <a href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-3">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact
                </a>
              </li>
              <li>
                <a href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} StudentTrack. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              <span className="sr-only">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
