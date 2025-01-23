  'use client'

  import { motion } from 'framer-motion'
  import Image from 'next/image'
  import { FaEnvelope } from 'react-icons/fa'

  const boardMembers = [
    {
      name: 'Steve Hamm',
      role: 'President',
      image: 'https://local229.s3.us-east-1.amazonaws.com/twuBig.png',
      bio: 'bio here',
      email: 'info@twulocal229.org'
    },
    {
      name: 'Duane Boone',
      role: 'Vice President of MOW',
      image: 'https://local229.s3.us-east-1.amazonaws.com/twuBig.png',
      bio: 'bio here',
      email: 'info@twulocal229.org'
    },
    {
      name: 'Jose Garcia',
      role: 'Vice President',
      image: 'https://local229.s3.us-east-1.amazonaws.com/twuBig.png',
      bio: 'bio here',
      email: 'info@twulocal229.org'
    },
    {
      name: 'Kelvin Turner',
      role: 'Secretary-Treasurer',
      image: 'https://local229.s3.us-east-1.amazonaws.com/twuBig.png',
      bio: 'bio here',
      email: 'info@twulocal229.org'
    },
    {
      name: 'Alex Bishop',
      role: 'Communications/Media',
      image: 'https://local229.s3.us-east-1.amazonaws.com/twuBig.png',
      bio: 'bio here',
      email: 'info@twulocal229.org'
    },
    {
      name: 'Charlise Wright',
      role: 'Representative',
      image: 'https://local229.s3.us-east-1.amazonaws.com/twuBig.png',
      bio: 'bio here',
      email: 'info@twulocal229.org'
    },
    {
      name: 'Chris Rotondo',
      role: 'Representative',
      image: 'https://local229.s3.us-east-1.amazonaws.com/twuBig.png',
      bio: 'bio here',
      email: 'info@twulocal229.org'
    },

    // Add more board members as needed
  ]

  const BoardMembers = () => {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {boardMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-gray-50 rounded-lg overflow-hidden shadow-lg"
              >
                <div className="relative h-80 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#0a0086] mb-2">
                    {member.name}
                  </h3>
                  <h4 className="text-lg text-gray-600 mb-4">{member.role}</h4>
            
                  <a
                    href={`mailto:${member.email}`}
                    className="text-[#0a0086] hover:text-blue-900 font-semibold"
                  >
                    Contact <FaEnvelope className="ml-2" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  export default BoardMembers 