import { Instagram, Facebook, MessageCircle, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SocialMediaSection() {
  const socialLinks = [
    {
      name: "Instagram",
      icon: <Instagram className="w-6 h-6" />,
      url: "#",
      description: "Daily wellness tips & behind-the-scenes",
      followers: "12K",
      color: "hover:bg-pink-500",
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-6 h-6" />,
      url: "#",
      description: "Join our health community",
      followers: "8.5K",
      color: "hover:bg-blue-600",
    },
    {
      name: "WhatsApp",
      icon: <MessageCircle className="w-6 h-6" />,
      url: "#",
      description: "Get instant support & updates",
      followers: "Chat",
      color: "hover:bg-green-500",
    },
    {
      name: "YouTube",
      icon: <Youtube className="w-6 h-6" />,
      url: "#",
      description: "Health recipes & product guides",
      followers: "3.2K",
      color: "hover:bg-red-500",
    },
  ]

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 md:mb-4">Follow Us for Daily Wellness</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Stay connected with our community for health tips, recipes, product updates, and inspiration for your
            wellness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {socialLinks.map((social) => (
            <div key={social.name} className="group">
              <Button
                variant="outline"
                className={`w-full h-auto p-4 md:p-6 border-2 border-gray-200 hover:border-transparent transition-all duration-300 ${social.color} hover:text-white group-hover:transform group-hover:scale-105`}
                asChild
              >
                <a href={social.url} target="_blank" rel="noopener noreferrer">
                  <div className="text-center">
                    <div className="flex justify-center mb-2 md:mb-3">{social.icon}</div>
                    <h3 className="font-semibold text-base md:text-lg mb-1">{social.name}</h3>
                    <p className="text-xs md:text-sm opacity-75 mb-2">{social.description}</p>
                    <span className="text-xs font-medium bg-gray-100 group-hover:bg-white group-hover:bg-opacity-20 px-2 py-1 rounded-full">
                      {social.followers} {social.name === "WhatsApp" ? "" : "followers"}
                    </span>
                  </div>
                </a>
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 md:p-8 text-center">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">Join Our Growing Community! 🌱</h3>
          <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 max-w-2xl mx-auto">
            Be part of a community that values natural health and wellness. Share your journey, get tips from experts,
            and connect with like-minded individuals who prioritize healthy living.
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            <div className="bg-white px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-sm">
              <span className="text-green-600 font-semibold text-xs md:text-sm">25K+ Community Members</span>
            </div>
            <div className="bg-white px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-sm">
              <span className="text-blue-600 font-semibold text-xs md:text-sm">Daily Health Tips</span>
            </div>
            <div className="bg-white px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-sm">
              <span className="text-purple-600 font-semibold text-xs md:text-sm">Recipe Sharing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
