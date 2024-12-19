'use client'

import { motion } from 'framer-motion'

const MissionStatement = ({ customTitle, customDescription }: { customTitle?: string; customDescription?: string }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a0086] mb-6">
            {customTitle || 'Our Mission'}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {customDescription || `Transport Workers Union Local 229 is dedicated to protecting and improving the lives of transit workers 
            in Hudson County. We fight for fair wages, safe working conditions, and dignity on the job. Through 
            collective action and solidarity, we ensure that our members voices are heard and their rights are 
            protected.`}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default MissionStatement 