import { Leaf, Award, Heart, Shield } from "lucide-react"

export default function AboutSection() {
  const features = [
    {
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      title: "100% Natural",
      description: "Pure, organic ingredients sourced directly from farms",
    },
    {
      icon: <Award className="w-8 h-8 text-green-600" />,
      title: "Quality Assured",
      description: "Every product tested for purity and potency",
    },
    {
      icon: <Heart className="w-8 h-8 text-green-600" />,
      title: "Health First",
      description: "Traditional wisdom meets modern health needs",
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Trust & Safety",
      description: "No artificial additives or preservatives",
    },
  ]

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 md:mb-4">About Aatrey</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At Aatrey, we believe in the power of nature to heal and nourish. Our mission is to bring you the finest
            quality health powders, Ayurvedic herbs, and organic flours that honor both tradition and your well-being.
            Every product is carefully sourced, processed with love, and delivered with a commitment to purity that your
            family deserves.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="flex justify-center mb-3 md:mb-4">
                <div className="p-3 md:p-4 bg-green-50 rounded-full group-hover:bg-green-100 transition-colors">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm md:text-base text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6 md:p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
            <div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-3 md:mb-4">Our Heritage, Your Health</h3>
              <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6 leading-relaxed">
                Founded on the principles of Ayurveda and modern nutritional science, Aatrey bridges the gap between
                ancient wisdom and contemporary health needs. We work directly with farmers and traditional healers to
                ensure authenticity in every grain of powder.
              </p>
              <div className="flex flex-wrap gap-2 md:gap-4">
                <div className="bg-white px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-sm">
                  <span className="text-green-600 font-semibold text-xs md:text-sm">500+ Happy Customers</span>
                </div>
                <div className="bg-white px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-sm">
                  <span className="text-green-600 font-semibold text-xs md:text-sm">50+ Products</span>
                </div>
                <div className="bg-white px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-sm">
                  <span className="text-green-600 font-semibold text-xs md:text-sm">5+ Years Experience</span>
                </div>
              </div>
            </div>
            <div className="text-center mt-6 lg:mt-0">
              <div className="w-48 h-48 md:w-64 md:h-64 bg-green-200 rounded-full mx-auto flex items-center justify-center">
                <div className="text-4xl md:text-6xl">🌿</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
