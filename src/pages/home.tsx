import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { useToast } from "../hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../lib/queryClient";
import { 
  CheckCircle, 
  Clock, 
  Search, 
  UserCheck, 
  Box, 
  Rocket, 
  FlaskConical, 
  Edit, 
  Database, 
  ServerCog, 
  Sliders, 
  Code, 
  Calendar,
  Globe,
  Mail,
  Menu,
  X,
  ArrowRight,
  Star,
  Users,
  Target,
  Shield,
  Lock,
  CalendarCheck
} from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    requirements: ""
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const submitInquiry = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/inquiries", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "We'll share 2 vetted profiles with you by Friday.",
      });
      setFormData({ name: "", email: "", company: "", requirements: "" });
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company || !formData.requirements) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    submitInquiry.mutate(formData);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-[#059669]">ReliableTeam.ai</span>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-gray-600 hover:text-[hsl(216,73%,47%)] px-3 py-2 text-sm font-medium transition-colors"
                >
                  Services
                </button>
                <button 
                  onClick={() => scrollToSection('process')}
                  className="text-gray-600 hover:text-[hsl(216,73%,47%)] px-3 py-2 text-sm font-medium transition-colors"
                >
                  Process
                </button>
                <button 
                  onClick={() => scrollToSection('talent')}
                  className="text-gray-600 hover:text-[hsl(216,73%,47%)] px-3 py-2 text-sm font-medium transition-colors"
                >
                  Talent
                </button>
                <button 
                  onClick={() => scrollToSection('team')}
                  className="text-gray-600 hover:text-[hsl(216,73%,47%)] px-3 py-2 text-sm font-medium transition-colors"
                >
                  Team
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-[#059669] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
                >
                  Get Started
                </button>
              </div>
            </div>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-[hsl(216,73%,47%)]"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button 
                onClick={() => scrollToSection('services')}
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-[hsl(216,73%,47%)] w-full text-left"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('process')}
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-[hsl(216,73%,47%)] w-full text-left"
              >
                Process
              </button>
              <button 
                onClick={() => scrollToSection('talent')}
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-[hsl(216,73%,47%)] w-full text-left"
              >
                Talent
              </button>
              <button 
                onClick={() => scrollToSection('team')}
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-[hsl(216,73%,47%)] w-full text-left"
              >
                Team
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block px-3 py-2 text-base font-medium bg-[hsl(20,90%,48%)] text-white rounded-lg m-2"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="gradient-bg text-gray py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div  className="mb-6">
              <div className="text-3xl font-weight-500 leading-tight">
                Vetted GenAI Talent.<br />
                </div>
                <h1 className="text-gray-600 text-5xl">Deployed in 5–7 Days.</h1>
              </div>
              <p className="text-xl text-gray-800 mb-8 leading-relaxed">
                The trusted staffing layer for AI-native teams. From prompt engineers to RAG developers to LLM QA pods — we deliver SME-vetted, project-ready specialists on contract.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-[#059669] text-white px-8 py-4 text-lg font-semibold hover:bg-[#059669] transition-colors hover-lift h-auto"
                  onClick={() => scrollToSection('contact')}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule a Call
                </Button>
                <Button 
                  variant="outline"
                  className="border-2 border-white text-[#059669] px-8 py-4 text-lg font-semibold hover:bg-white hover:text-[hsl(216,73%,47%)] transition-all h-auto"
                  onClick={() => scrollToSection('talent')}
                >
                  View Our Talent
                </Button>
              </div>
              <div className="mt-8 flex items-center space-x-8 text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="text-gray-800 mr-2 h-5 w-5" />
                  <span>50+ contractors placed</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-gray-800 mr-2 h-5 w-5" />
                  <span>5000+ profiles vetted</span>
                </div>
              </div>
            </div>
            
            <div className="animate-fade-in">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="AI developers coding in modern workspace" 
                className="rounded-xl shadow-2xl w-full h-auto" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[hsl(215,28%,17%)] mb-6">
              Hiring Bottleneck is Killing GenAI Momentum
            </h2>
            <div className="bg-red-50 border-l-4 border-red-400 p-6 max-w-3xl mx-auto rounded-r-lg">
              <p className="text-xl text-red-700 font-semibold">
                ⚠️ "We don't have the team for this right now."
              </p>
              <p className="text-red-600 mt-2">You shouldn't be saying this in 2025.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover-lift">
              <CardContent className="p-8">
                <div className="text-[hsl(20,90%,48%)] text-4xl mb-4">
                  <Clock className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold text-[hsl(215,28%,17%)] mb-4">Speed vs. Linear Time</h3>
                <p className="text-gray-600">GenAI builds run on speed and iteration — but your hiring process is stuck in linear time.</p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="p-8">
                <div className="text-[hsl(20,90%,48%)] text-4xl mb-4">
                  <Search className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold text-[hsl(215,28%,17%)] mb-4">Evaluation Gap</h3>
                <p className="text-gray-600">Traditional recruiters can't evaluate AI workflows. Freelance marketplaces flood you with irrelevant profiles.</p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="p-8">
                <div className="text-[hsl(20,90%,48%)] text-4xl mb-4">
                  <UserCheck className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold text-[hsl(215,28%,17%)] mb-4">Project-Ready Builders</h3>
                <p className="text-gray-600">You don't need more resumes. You need project-ready AI builders — already vetted for your stack and use-case.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[hsl(215,28%,17%)] mb-6">
              We Don't "Staff" AI Roles. We Enable GenAI Delivery.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Zero ramp-up time with specialized talent pods designed for your specific GenAI objectives.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* MVP Pod */}
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-blue-100 hover-lift">
              <CardContent className="p-8">
                <div className="text-[hsl(216,73%,47%)] text-4xl mb-4">
                  <Box className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[hsl(215,28%,17%)] mb-4">📦 MVP Pod</h3>
                <p className="text-sm text-gray-500 mb-4">3-person launch team</p>
                <div className="mb-6">
                  <p className="text-gray-700 font-medium mb-2">Team Composition:</p>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Prompt Engineer</li>
                    <li>• Data Engineer</li>
                    <li>• GenAI PM</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg mb-6">
                  <p className="text-[hsl(216,73%,47%)] font-semibold">Goal: Ship a working GenAI POC in &lt;30 days</p>
                </div>
                <Button className="w-full bg-[#059669] text-white hover:bg-blue-800">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            {/* Production Pod */}
            <Card className="bg-gradient-to-br from-green-50 to-green-100 hover-lift">
              <CardContent className="p-8">
                <div className="text-[hsl(20,90%,48%)] text-4xl mb-4">
                  <Rocket className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[hsl(215,28%,17%)] mb-4">🚀 Production Pod</h3>
                <p className="text-sm text-gray-500 mb-4">5-6 person team</p>
                <div className="mb-6">
                  <p className="text-gray-700 font-medium mb-2">Team Composition:</p>
                  <ul className="text-gray-600 space-y-1">
                    <li>• ML Engineer</li>
                    <li>• Backend Dev</li>
                    <li>• Eval QA</li>
                    <li>• PM</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg mb-6">
                  <p className="text-[hsl(20,90%,48%)] font-semibold">Goal: Robustify + integrate into your main app/workflow</p>
                </div>
                <Button className="w-full bg-[#059669] text-white hover:bg-orange-600">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            {/* Evaluation Pod */}
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover-lift">
              <CardContent className="p-8">
                <div className="text-green-600 text-4xl mb-4">
                  <FlaskConical className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[hsl(215,28%,17%)] mb-4">🧪 Evaluation Pod</h3>
                <p className="text-sm text-gray-500 mb-4">3-4 person team</p>
                <div className="mb-6">
                  <p className="text-gray-700 font-medium mb-2">Team Composition:</p>
                  <ul className="text-gray-600 space-y-1">
                    <li>• 2x QA Specialists</li>
                    <li>• Prompt Debugger</li>
                    <li>• Eval Architect</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg mb-6">
                  <p className="text-green-600 font-semibold">Goal: Build reliable eval infra to reduce garbage outputs</p>
                </div>
                <Button className="w-full bg-green-600 text-white hover:bg-green-700">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Custom Pods */}
          <Card className="bg-gray-50 hover-lift">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-[hsl(215,28%,17%)] mb-4">⚙️ Custom Pods</h3>
              <p className="text-gray-600 mb-6">You define; we scope and assemble with SME input. Each pod comes with optional project oversight, milestone planning, and weekly QA.</p>
              <Button className="bg-green-600 text-white px-8 py-3 hover:bg-purple-700">
                Discuss Your Needs
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Process Timeline */}
      <section id="process" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[hsl(215,28%,17%)] mb-6">
              Our Ops Engine — Built for Speed and Control
            </h2>
            <p className="text-xl text-gray-600">Fast doesn't mean careless. We deliver in 5–7 days with trust baked in.</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-[hsl(216,73%,47%)]"></div>
            
            {/* Timeline items */}
            <div className="space-y-12">
              {/* Day 0 */}
              <div className="relative flex items-center justify-between">
                <div className="flex-1 pr-8 text-right">
                  <Card className="hover-lift">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold text-[hsl(215,28%,17%)] mb-2">Day 0: You Share the Need</h4>
                      <p className="text-gray-600">Even vague — we help scope</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="flex-shrink-0 w-12 h-12 bg-[hsl(216,73%,47%)] rounded-full flex items-center justify-center text-white font-bold z-10">
                  0
                </div>
                <div className="flex-1 pl-8"></div>
              </div>

              {/* Day 1-2 */}
              <div className="relative flex items-center justify-between">
                <div className="flex-1 pr-8"></div>
                <div className="flex-shrink-0 w-12 h-12 bg-[hsl(216,73%,47%)] rounded-full flex items-center justify-center text-white font-bold z-10">
                  1-2
                </div>
                <div className="flex-1 pl-8">
                  <Card className="hover-lift">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold text-[hsl(215,28%,17%)] mb-2">Days 1-2: We Shortlist Talent</h4>
                      <p className="text-gray-600">From our own + fresh sourcing</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Day 3-4 */}
              <div className="relative flex items-center justify-between">
                <div className="flex-1 pr-8 text-right">
                  <Card className="hover-lift">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold text-[hsl(215,28%,17%)] mb-2">Days 3-4: Vetting via Tests</h4>
                      <p className="text-gray-600">SME interview, simulation</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="flex-shrink-0 w-12 h-12 bg-[hsl(216,73%,47%)] rounded-full flex items-center justify-center text-white font-bold z-10">
                  3-4
                </div>
                <div className="flex-1 pl-8"></div>
              </div>

              {/* Day 5 */}
              <div className="relative flex items-center justify-between">
                <div className="flex-1 pr-8"></div>
                <div className="flex-shrink-0 w-12 h-12 bg-[hsl(20,90%,48%)] rounded-full flex items-center justify-center text-white font-bold z-10">
                  5
                </div>
                <div className="flex-1 pl-8">
                  <Card className="hover-lift">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold text-[hsl(215,28%,17%)] mb-2">Day 5: 2-3 Top Profiles Shared</h4>
                      <p className="text-gray-600">With Talent Summary Cards</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Day 6-7 */}
              <div className="relative flex items-center justify-between">
                <div className="flex-1 pr-8 text-right">
                  <Card className="hover-lift">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold text-[hsl(215,28%,17%)] mb-2">Days 6-7: Ready to Go</h4>
                      <p className="text-gray-600">Interviews + onboarding + infra setup</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold z-10">
                  6-7
                </div>
                <div className="flex-1 pl-8"></div>
              </div>
            </div>
          </div>

          {/* Security badges */}
          <Card className="mt-16">
            <CardContent className="p-8 text-center">
              <h4 className="text-xl font-semibold text-[hsl(215,28%,17%)] mb-4">🔒 All Contracts Include:</h4>
              <div className="flex flex-wrap justify-center gap-6">
                <div className="flex items-center text-green-600">
                  <Shield className="mr-2 h-5 w-5" />
                  <span>NDA Protection</span>
                </div>
                <div className="flex items-center text-green-600">
                  <Lock className="mr-2 h-5 w-5" />
                  <span>IP Protection</span>
                </div>
                <div className="flex items-center text-green-600">
                  <CalendarCheck className="mr-2 h-5 w-5" />
                  <span>Optional Trial Week</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Talent Specializations */}
      <section id="talent" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[hsl(215,28%,17%)] mb-6">
              Sample Role Clusters We Specialize In
            </h2>
            <p className="text-xl text-gray-600">Not just titles. Each role is designed around specific job-to-be-done outcomes.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Prompting & Prompt Logic */}
            <Card className="bg-green-50 border-green-200 hover-lift">
              <CardContent className="p-6">
                <div className="text-[hsl(216,73%,47%)] text-3xl mb-4">
                  <Edit className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-[hsl(215,28%,17%)] mb-3">Prompting & Prompt Logic</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Prompt Engineer</li>
                  <li>• Instruction Tuner</li>
                  <li>• Prompt Debugger</li>
                </ul>
              </CardContent>
            </Card>

            {/* RAG & Retrieval Engineering */}
            <Card className="bg-green-50 border-green-200 hover-lift">
              <CardContent className="p-6">
                <div className="text-[hsl(20,90%,48%)] text-3xl mb-4">
                  <Database className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-[hsl(215,28%,17%)] mb-3">RAG & Retrieval Engineering</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• LangChain Dev</li>
                  <li>• Vector DB Specialist</li>
                  <li>• Retrieval Optimizer</li>
                </ul>
              </CardContent>
            </Card>

            {/* LLM Evaluation & QA */}
            <Card className="bg-green-50 border-green-200 hover-lift">
              <CardContent className="p-6">
                <div className="text-green-600 text-3xl mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-[hsl(215,28%,17%)] mb-3">LLM Evaluation & QA</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Hallucination Tester</li>
                  <li>• Eval Framework Builder</li>
                  <li>• LLM QA Analyst</li>
                </ul>
              </CardContent>
            </Card>

            {/* Integration & Infra */}
            <Card className="bg-green-50 border-green-200 hover-lift">
              <CardContent className="p-6">
                <div className="text-purple-600 text-3xl mb-4">
                  <ServerCog className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-[hsl(215,28%,17%)] mb-3">Integration & Infra</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• GenAI Backend Dev</li>
                  <li>• Deployment Engineer</li>
                  <li>• MLOps for LLMs</li>
                </ul>
              </CardContent>
            </Card>

            {/* Model Tuning & Optimization */}
            <Card className="bg-green-50 border-green-200 hover-lift">
              <CardContent className="p-6">
                <div className="text-pink-600 text-3xl mb-4">
                  <Sliders className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-[hsl(215,28%,17%)] mb-3">Model Tuning & Optimization</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Fine-Tuner</li>
                  <li>• Embedding Architect</li>
                  <li>• Token Cost Optimizer</li>
                </ul>
              </CardContent>
            </Card>

            {/* Full-Stack GenAI Dev */}
            <Card className="bg-green-50 border-green-200 hover-lift">
              <CardContent className="p-6">
                <div className="text-indigo-600 text-3xl mb-4">
                  <Code className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-[hsl(215,28%,17%)] mb-3">Full-Stack GenAI Dev</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• React + LLM Dev</li>
                  <li>• AI Feature Engineer</li>
                  <li>• GenAI PM</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 bg-gray-100 p-4 rounded-lg max-w-3xl mx-auto">
              💡 All roles are mapped to skill-task-tool combinations — not resume keywords.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[hsl(215,28%,17%)] mb-6">
              Why Clients Fire Their Old Vendors for Us
            </h2>
            <p className="text-xl text-gray-600">We're not just cheaper or faster — we're fit-for-purpose.</p>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#059669] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left">Feature</th>
                      <th className="px-6 py-4 text-center">ReliableTeam.ai</th>
                      <th className="px-6 py-4 text-center">Generic IT Staffing</th>
                      <th className="px-6 py-4 text-center">Freelance Marketplaces</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">GenAI Only</td>
                      <td className="px-6 py-4 text-center text-green-600">
                        <CheckCircle className="w-5 h-5 mx-auto" /> Yes
                      </td>
                      <td className="px-6 py-4 text-center text-red-500">
                        <X className="w-5 h-5 mx-auto" /> No
                      </td>
                      <td className="px-6 py-4 text-center text-red-500">
                        <X className="w-5 h-5 mx-auto" /> No
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">Skill → Task Vetting</td>
                      <td className="px-6 py-4 text-center text-green-600">Rigorous</td>
                      <td className="px-6 py-4 text-center text-orange-500">Keyword-based</td>
                      <td className="px-6 py-4 text-center text-red-500">Self-attested</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">SME Pod Assembly</td>
                      <td className="px-6 py-4 text-center text-green-600">
                        <CheckCircle className="w-5 h-5 mx-auto" /> Yes
                      </td>
                      <td className="px-6 py-4 text-center text-red-500">
                        <X className="w-5 h-5 mx-auto" /> No
                      </td>
                      <td className="px-6 py-4 text-center text-red-500">
                        <X className="w-5 h-5 mx-auto" /> No
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">NDA, IP, Compliance</td>
                      <td className="px-6 py-4 text-center text-green-600">Full</td>
                      <td className="px-6 py-4 text-center text-orange-500">Partial</td>
                      <td className="px-6 py-4 text-center text-red-500">No</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">Replacement SLA</td>
                      <td className="px-6 py-4 text-center text-green-600">5 Business Days</td>
                      <td className="px-6 py-4 text-center text-orange-500">Weeks</td>
                      <td className="px-6 py-4 text-center text-red-500">No guarantee</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">Trial Week</td>
                      <td className="px-6 py-4 text-center text-green-600">
                        <CheckCircle className="w-5 h-5 mx-auto" /> Yes
                      </td>
                      <td className="px-6 py-4 text-center text-red-500">
                        <X className="w-5 h-5 mx-auto" /> No
                      </td>
                      <td className="px-6 py-4 text-center text-red-500">
                        <X className="w-5 h-5 mx-auto" /> No
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">Transparent Pricing</td>
                      <td className="px-6 py-4 text-center text-green-600">
                        <CheckCircle className="w-5 h-5 mx-auto" /> Yes
                      </td>
                      <td className="px-6 py-4 text-center text-red-500">
                        <X className="w-5 h-5 mx-auto" /> No
                      </td>
                      <td className="px-6 py-4 text-center text-red-500">
                        <X className="w-5 h-5 mx-auto" /> No
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <Card>
              <CardContent className="p-4">
                <p className="text-lg text-gray-600">
                  We blend the speed of a gig model with the trust of a delivery firm.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[hsl(215,28%,17%)] mb-6">
              Founding Team — Operator-Led, Not Recruiter-Led
            </h2>
            <p className="text-xl text-gray-600">We don't run this like a staffing agency — we run it like a GenAI delivery engine.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Vijay Goel */}
            <Card className="hover-lift">
              <CardContent className="p-8 text-center">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300" 
                  alt="Professional headshot of AI engineer" 
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover" 
                />
                <h3 className="text-xl font-bold text-[hsl(215,28%,17%)] mb-2">👤 Vijay Goel</h3>
                <p className="text-gray-600 font-semibold mb-4">The AI Builder</p>
                <p className="text-gray-500 mb-4">Ex-Founder, Superpro.ai | IIT Kharagpur</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700"><strong>Focus:</strong> Prompt design, LangChain, deployment</p>
                </div>
              </CardContent>
            </Card>

            {/* Rahul Dalmia */}
            <Card className="hover-lift">
              <CardContent className="p-8 text-center">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300" 
                  alt="Professional business analyst headshot" 
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover" 
                />
                <h3 className="text-xl font-bold text-[hsl(215,28%,17%)] mb-2">👤 Rahul Dalmia</h3>
                <p className="text-gray-600 font-semibold mb-4">The Hiring Brain</p>
                <p className="text-gray-500 mb-4">Ex-JP Morgan Quant Strategist | IIT Kharagpur</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700"><strong>Focus:</strong> sourcing logic, simulation design, hiring precision</p>
                </div>
              </CardContent>
            </Card>

            {/* Reetesh Chandra */}
            <Card className="hover-lift">
              <CardContent className="p-8 text-center">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300" 
                  alt="Professional operations executive headshot" 
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover" 
                />
                <h3 className="text-xl font-bold text-[hsl(215,28%,17%)] mb-2">👤 Reetesh Chandra</h3>
                <p className="text-gray-600 font-semibold mb-4">The Delivery Operator</p>
                <p className="text-gray-500 mb-4">8+ yrs @ upGrad, led enterprise tech skilling & GenAI bootcamps | IIT Kharagpur</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700"><strong>Focus:</strong> delivery operations, talent development</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats & CTA */}
      <section id="contact" className="py-20 gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Let's Unblock Your GenAI Roadmap
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              The right engineer in 5 days is worth more than 50 resumes in your inbox.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-5xl font-bold text-[#059669] mb-4">50+</div>
              <p className="text-gray-600">Contractors placed across AI startups, GCCs, and boutique agencies</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#059669] mb-4">5000+</div>
              <p className="text-gray-600">Profiles mapped by our simulation-first engine</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-300 mb-4">🧩</div>
              <p className="text-gray-600">Pods deployed for MVPs, evals, and full-stack GenAI builds</p>
            </div>
          </div>

          {/* CTA Section */}
          <Card className="bg-white bg-opacity-10 backdrop-blur-sm max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">👋 Want to test us?</h3>
                <p className="text-blue-100 text-lg">Share your hardest AI role today — and we'll show you 2 vetted profiles by Friday.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Contact Form */}
                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-[hsl(215,28%,17%)] mb-4">Get Started Today</h4>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-700">Name</Label>
                      <Input 
                        id="name"
                        type="text" 
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-700">Email</Label>
                      <Input 
                        id="email"
                        type="email" 
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company" className="text-gray-700">Company</Label>
                      <Input 
                        id="company"
                        type="text" 
                        placeholder="Your company"
                        value={formData.company}
                        onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="requirements" className="text-gray-700">Tell us about your AI role needs</Label>
                      <Textarea 
                        id="requirements"
                        placeholder="Describe your requirements..."
                        value={formData.requirements}
                        onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value }))}
                        className="mt-1 h-20 resize-none"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-[hsl(216,73%,47%)] text-white hover:bg-blue-800"
                      disabled={submitInquiry.isPending}
                    >
                      {submitInquiry.isPending ? "Submitting..." : "Get 2 Vetted Profiles by Friday"}
                    </Button>
                  </form>
                </div>

                {/* Contact Info */}
                <div className="space-y-6">
                  <Card className="bg-white bg-opacity-20 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-semibold mb-4">Quick Contact</h4>
                      <div className="space-y-4">
                        <a href="mailto:talent@reliableteam.ai" className="flex items-center text-blue-100 hover:text-white transition-colors">
                          <Mail className="mr-3 text-orange-300 h-5 w-5" />
                          talent@reliableteam.ai
                        </a>
                        <a href="#" className="flex items-center text-blue-100 hover:text-white transition-colors">
                          <Globe className="mr-3 text-orange-300 h-5 w-5" />
                          www.reliableteam.ai
                        </a>
                        <div className="flex items-center text-blue-100">
                          <Clock className="mr-3 text-orange-300 h-5 w-5" />
                          Response within 24 hours
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white bg-opacity-20 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-semibold mb-4">Schedule a Call</h4>
                      <p className="text-gray-400 mb-4">Prefer to discuss your needs directly? Book a 30-minute strategy call with our team.</p>
                      <Button className="w-full bg-[#059669] text-white">
                        <Calendar className="mr-2 h-5 w-5" />
                        Schedule Strategy Call
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[hsl(215,28%,17%)] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="text-2xl font-bold text-white mb-4">ReliableTeam.ai</div>
              <p className="text-gray-300 mb-6 max-w-md">
                The trusted staffing layer for AI-native teams. Vetted GenAI talent deployed in 5-7 days.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Users className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Globe className="h-6 w-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">MVP Pod</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Production Pod</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Evaluation Pod</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Custom Pods</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Team</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Process</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
            <p>&copy; 2025 ReliableTeam.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
