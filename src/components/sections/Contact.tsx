"use client";

import React from "react";
import { SectionHeader } from "../ui/SectionHeader";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Glitch node background */}
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-neon-pink/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader title="Comms Link" subtitle="Establish a direct connection to our mainframe." />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <div className="bg-glass backdrop-blur-xl border border-neon-cyan/30 p-10 relative overflow-hidden rounded-lg group hover:border-neon-cyan transition-colors duration-500">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50 group-hover:opacity-100" />
              
              <h3 className="font-display font-bold text-ice text-2xl uppercase tracking-cyber mb-8 flex items-center">
                <span className="w-2 h-2 bg-neon-pink mr-3 animate-pulse" />
                Initialize Uplink
              </h3>
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <Input label="Callsign (Name)" id="name" placeholder="Ghost" />
                <Input label="Network Node (Email)" id="email" type="email" placeholder="ghost@network.edu" />
                <Input label="Transmission Data" id="message" placeholder="Awaiting input..." />
                <Button variant="cyber" className="w-full mt-4">Transmit Data</Button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            className="flex flex-col justify-center space-y-12 pl-0 lg:pl-12"
          >
            <div>
              <h3 className="font-display font-bold text-cyber-purple text-xl uppercase tracking-cyber mb-6">Server Location</h3>
              <div className="flex items-center space-x-4 text-ice/80 font-sans mb-4 group hover:text-neon-cyan transition-colors">
                <MapPin className="text-neon-cyan group-hover:animate-bounce" size={24} />
                <span className="text-lg">Sector 4, Student Union<br />Main Campus Server</span>
              </div>
              <div className="flex items-center space-x-4 text-ice/80 font-sans group hover:text-neon-pink transition-colors">
                <Mail className="text-neon-pink group-hover:animate-pulse" size={24} />
                <span className="text-lg">uplink@elevation.edu</span>
              </div>
            </div>

            <div>
              <h3 className="font-display font-bold text-cyber-purple text-xl uppercase tracking-cyber mb-6">Social Nodes</h3>
              <div className="flex space-x-6">
                <a href="#" title="Instagram" className="w-14 h-14 bg-glass border border-white/10 flex items-center justify-center text-ice hover:text-void hover:bg-neon-pink hover:border-neon-pink transition-all duration-300 transform -skew-x-12 hover:scale-110">
                  <div className="font-display font-bold text-xl skew-x-12">IG</div>
                </a>
                <a href="#" title="YouTube" className="w-14 h-14 bg-glass border border-white/10 flex items-center justify-center text-ice hover:text-void hover:bg-neon-cyan hover:border-neon-cyan transition-all duration-300 transform -skew-x-12 hover:scale-110">
                  <div className="font-display font-bold text-xl skew-x-12">YT</div>
                </a>
                <a href="#" title="Discord" className="w-14 h-14 bg-glass border border-white/10 flex items-center justify-center text-ice hover:text-void hover:bg-cyber-purple hover:border-cyber-purple transition-all duration-300 transform -skew-x-12 hover:scale-110">
                  <div className="font-display font-bold text-xl skew-x-12">DC</div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
