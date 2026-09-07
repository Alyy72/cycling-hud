export default function Footer() {
  return (
    <footer className="w-full bg-[#071011] border-t border-[#D9E5E1]/10 py-12 px-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-[#D9E5E1]/70">
        
        {/* Business Details */}
        <div className="flex flex-col space-y-2">
          <span className="font-bold tracking-widest text-[#D9E5E1] uppercase text-xs mb-2">ZAHA The Intelligent Ride System</span>
          <span>ZAHA Trading LLC (Placeholder)</span>
          <span>Arafat Sulaiman</span>
          <span>Dubai, United Arab Emirates</span>
          <a href="mailto:legal@zaha-ride.com" className="hover:text-white transition">legal@zaha-ride.com</a>
        </div>

        {/* Legal Links */}
        <div className="flex flex-col space-y-2">
          <span className="font-bold tracking-widest text-[#D9E5E1] uppercase text-xs mb-2">Legal</span>
          <a href="/privacy" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-[#C9FF45] rounded">Privacy Policy</a>
          <a href="/terms" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-[#C9FF45] rounded">Terms & Conditions</a>
          <a href="/refunds" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-[#C9FF45] rounded">Hardware Refund Policy</a>
          <a href="/cookies" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-[#C9FF45] rounded">Cookie Policy</a>
        </div>

        {/* Disclaimer */}
        <div className="flex flex-col space-y-2 md:text-right">
          <p className="text-xs leading-relaxed opacity-60">
            ZAHA is an assistive awareness tool designed to surface road context. It is not a replacement for rider attention, situational awareness, or safe cycling practices. 
          </p>
          <p className="text-xs mt-4">
            &copy; {new Date().getFullYear()} ZAHA. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
