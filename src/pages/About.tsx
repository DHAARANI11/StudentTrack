
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="container py-12 px-4 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-6">About StudentTrack</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground">
              At StudentTrack, we're dedicated to revolutionizing the way educational institutions track and manage student progress. Our mission is to provide a comprehensive, intuitive platform that empowers students, faculty, and administrators to achieve their educational goals through effective data management and visualization.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Founded in 2023 by a team of educators and software developers, StudentTrack was born from the frustration of using outdated and disconnected systems to manage student information. We recognized the need for a unified platform that could seamlessly connect all stakeholders in the educational process.
            </p>
            <p className="text-muted-foreground">
              After extensive research and collaboration with educational experts, we developed StudentTrack to address the unique challenges faced by modern educational institutions. Today, our platform serves thousands of users across hundreds of schools and universities worldwide.
            </p>
          </section>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <div className="bg-card border rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80" 
                alt="Modern campus building" 
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="bg-card border rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" 
                alt="Student working on laptop" 
                className="w-full h-64 object-cover"
              />
            </div>
          </div>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-card rounded-lg border">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously strive to improve our platform with cutting-edge technology and forward-thinking solutions.
                </p>
              </div>
              
              <div className="p-6 bg-card rounded-lg border">
                <div className="h-12 w-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path></svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
                <p className="text-muted-foreground">
                  We believe in creating tools that are accessible to all users, regardless of technical ability or background.
                </p>
              </div>
              
              <div className="p-6 bg-card rounded-lg border">
                <div className="h-12 w-12 bg-info/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-info"><path d="m3 11 18-5v12L3 14v-3Z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Security</h3>
                <p className="text-muted-foreground">
                  We prioritize the protection of sensitive educational data with industry-leading security measures.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">The Team</h2>
            <p className="text-muted-foreground mb-6">
              Our diverse team combines expertise in education, software development, data science, and user experience design to create the best possible platform for educational tracking.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-2 border-primary">
                  <img 
                    src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=150&h=150&q=80" 
                    alt="Team member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold">Dr. Emily Chen</h3>
                <p className="text-sm text-muted-foreground">CEO & Founder</p>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-2 border-primary">
                  <img 
                    src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=150&h=150&q=80" 
                    alt="Team member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold">Michael Rodriguez</h3>
                <p className="text-sm text-muted-foreground">CTO</p>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-2 border-primary">
                  <img 
                    src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=150&h=150&q=80" 
                    alt="Team member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold">Dr. Sarah Johnson</h3>
                <p className="text-sm text-muted-foreground">Education Director</p>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-2 border-primary">
                  <img 
                    src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=150&h=150&q=80" 
                    alt="Team member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold">David Williams</h3>
                <p className="text-sm text-muted-foreground">Lead Designer</p>
              </div>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
