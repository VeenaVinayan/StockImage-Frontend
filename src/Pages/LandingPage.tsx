import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
       <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" /> 
      </div>

      <header className="w-full px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md shadow-md fixed top-0 z-20">
        <h1 className="text-2xl font-bold text-teal-600">ShotStack</h1>
        <Link
          to="/register"
          className="bg-teal-600 text-white px-4 py-2 rounded-xl hover:bg-teal-900 transition"
        >
          Login / Register
        </Link>
      </header>

      <section className="relative flex-1 flex flex-col justify-center items-center text-center px-6 mt-20 z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg"
        >
        Preserve Your Digital Treasures of Stunning Photography
        </motion.h2>
        <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl">
          A modern platform to upload  breathtaking photography.
        </p>
        <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-5xl w-full">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl text-center"
          >
            <Upload className="w-12 h-12 text-teal-600 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2 text-gray-800">Easy Upload</h4>
            <p className="text-gray-600">
              Upload your images with a simple and intuitive interface.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl text-center"
          >
            <Upload className="w-12 h-12 text-teal-600 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2 text-gray-800">Stunning Gallery</h4>
            <p className="text-gray-600">
              Explore a curated collection of high-quality images.
            </p>
          </motion.div>

        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-6 text-center bg-white/80 backdrop-blur-md shadow z-10">
        <p className="text-gray-700">
          &copy; {new Date().getFullYear()} PixStock. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
