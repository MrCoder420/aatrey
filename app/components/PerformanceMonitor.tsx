"use client"

import { useEffect } from 'react'

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV === 'development') {
      // Monitor page load performance
      const measurePageLoad = () => {
        if (typeof window !== 'undefined' && 'performance' in window) {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
          
          if (navigation) {
            console.log('🚀 Page Performance Metrics:')
            console.log(`📊 DOM Content Loaded: ${navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart}ms`)
            console.log(`🎯 Page Load Complete: ${navigation.loadEventEnd - navigation.loadEventStart}ms`)
            console.log(`🌐 DNS Lookup: ${navigation.domainLookupEnd - navigation.domainLookupStart}ms`)
            console.log(`🔗 TCP Connection: ${navigation.connectEnd - navigation.connectStart}ms`)
            console.log(`📥 Response Time: ${navigation.responseEnd - navigation.responseStart}ms`)
            
            // Alert if load time is too slow
            const totalLoadTime = navigation.loadEventEnd - navigation.navigationStart
            if (totalLoadTime > 3000) {
              console.warn(`⚠️ Slow page load detected: ${totalLoadTime}ms`)
            }
          }
        }
      }

      // Measure Core Web Vitals
      const measureWebVitals = () => {
        if (typeof window !== 'undefined') {
          // First Contentful Paint
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.name === 'first-contentful-paint') {
                console.log(`🎨 First Contentful Paint: ${entry.startTime}ms`)
                if (entry.startTime > 1800) {
                  console.warn('⚠️ Slow FCP detected')
                }
              }
            }
          })

          try {
            observer.observe({ entryTypes: ['paint'] })
          } catch (e) {
            // Observer not supported
          }

          // Largest Contentful Paint
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const lastEntry = entries[entries.length - 1]
            console.log(`🖼️ Largest Contentful Paint: ${lastEntry.startTime}ms`)
            if (lastEntry.startTime > 2500) {
              console.warn('⚠️ Slow LCP detected')
            }
          })

          try {
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
          } catch (e) {
            // Observer not supported
          }
        }
      }

      // Run measurements
      if (document.readyState === 'complete') {
        measurePageLoad()
        measureWebVitals()
      } else {
        window.addEventListener('load', () => {
          setTimeout(() => {
            measurePageLoad()
            measureWebVitals()
          }, 100)
        })
      }
    }
  }, [])

  return null // This component doesn't render anything
}
