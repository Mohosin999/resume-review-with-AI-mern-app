import { floatAnimation } from "@/animations";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Brain,
  CheckCircle,
  Play,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="pt-40 pb-24 section-container">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-full text-green-400 text-sm font-semibold mb-8 border border-green-700/50"
            >
              <Sparkles className="w-4 h-4" />
              Powered by AI
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl xl:text-5xl font-bold text-white leading-tight"
            >
              Land Your Dream Job with{" "}
              <span className="text-amber-500">AI-Optimized Resumes</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-8 text-xl text-gray-300 max-w-xl"
            >
              Analyze your resume against job descriptions, get actionable
              feedback, and generate ATS-friendly versions that stand out.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/login"
                className="group btn-primary text-lg px-8 py-4 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 hover:from-green-600 hover:via-emerald-600 hover:to-green-700 shadow-xl shadow-green-500/40 hover:shadow-green-500/60 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Start Free Analysis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="group text-lg px-8 py-4 border-2 border-green-700 text-green-400 rounded-lg hover:bg-green-900/30 transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-12 flex items-center gap-8"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 + i * 0.1 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 border-2 border-gray-900 flex items-center justify-center text-white text-xs font-bold"
                  >
                    <Users className="w-5 h-5" />
                  </motion.div>
                ))}
              </div>
              <div className="text-sm">
                <p className="font-bold text-white">10,000+</p>
                <p className="text-gray-400">Happy Users</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-10 flex flex-wrap gap-6"
            >
              {[
                { icon: CheckCircle, text: "Free to start" },
                { icon: Shield, text: "Secure & Private" },
                { icon: Zap, text: "Instant Results" },
              ].map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + i * 0.1 }}
                  className="flex items-center gap-2 text-sm text-gray-400"
                >
                  <item.icon className="w-4 h-4 text-green-500" />
                  {item.text}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Animated Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="relative h-[600px]">
              {/* Main Card */}
              <motion.div
                variants={floatAnimation}
                animate="animate"
                className="absolute top-10 left-0 right-0 bg-gray-800/90 backdrop-blur rounded-3xl shadow-2xl shadow-green-500/20 p-8 border border-green-700/30"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                    <Brain className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      AI Analysis
                    </h3>
                    <p className="text-sm text-gray-400">Real-time scoring</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">ATS Score</span>
                    <span className="text-lg font-bold text-green-400">
                      92%
                    </span>
                  </div>
                  <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "92%" }}
                      transition={{ duration: 1.5, delay: 1 }}
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Match Rate</span>
                    <span className="text-lg font-bold text-emerald-400">
                      88%
                    </span>
                  </div>
                  <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "88%" }}
                      transition={{ duration: 1.5, delay: 1.2 }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Floating Badge 1 */}
              <motion.div
                variants={floatAnimation}
                animate="animate"
                transition={{ delay: 0.5 }}
                className="absolute top-40 -right-4 bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-2xl p-5 shadow-xl"
              >
                <Target className="w-8 h-8 mb-2" />
                <p className="text-2xl font-bold">95%</p>
                <p className="text-sm opacity-90">Success Rate</p>
              </motion.div>

              {/* Floating Badge 2 */}
              <motion.div
                variants={floatAnimation}
                animate="animate"
                transition={{ delay: 1 }}
                className="absolute bottom-32 -left-4 bg-gray-800/90 backdrop-blur rounded-2xl p-5 shadow-xl border border-green-700/30"
              >
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold text-white">4.9/5</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Badge 3 */}
              <motion.div
                variants={floatAnimation}
                animate="animate"
                transition={{ delay: 1.5 }}
                className="absolute bottom-10 right-10 bg-gradient-to-br from-green-400 to-emerald-500 text-white rounded-2xl p-5 shadow-xl"
              >
                <TrendingUp className="w-8 h-8 mb-2" />
                <p className="text-2xl font-bold">3x</p>
                <p className="text-sm opacity-90">More Interviews</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
