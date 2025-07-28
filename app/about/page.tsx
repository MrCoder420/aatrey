import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="text-gray-700 leading-relaxed">
          We started as a small team with a big vision: to provide high-quality, sustainable products that make a
          positive impact on the world. We believe in transparency, ethical sourcing, and creating products that are
          both beautiful and functional.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Our mission is to empower individuals to live more sustainably by offering eco-friendly alternatives to
          everyday products. We are committed to reducing our environmental footprint and promoting responsible
          consumption.
        </p>
        <Link href="/products">
          <Button className="bg-[#4a9960] hover:bg-[#3d8050] text-white px-8 py-3 text-lg">Shop Our Products</Button>
        </Link>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Sustainability</li>
          <li>Quality</li>
          <li>Transparency</li>
          <li>Ethical Sourcing</li>
          <li>Community</li>
        </ul>
      </section>
    </div>
  )
}
