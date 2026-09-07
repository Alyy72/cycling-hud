import { useState } from 'react';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!consent) return;
    console.log("Submitting:", email);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md bg-[#121c1e] p-6 rounded-2xl border border-[#D9E5E1]/15">
      <h3 className="text-xl font-bold text-[#D9E5E1] mb-4">Join the Pilot Waitlist</h3>
      
      <div className="flex flex-col space-y-4">
        {/* Accessible Input */}
        <div>
          <label htmlFor="email" className="sr-only">Email Address</label>
          <input 
            type="email" 
            id="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="rider@example.com"
            className="w-full bg-[#071011] text-[#D9E5E1] border border-[#D9E5E1]/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9FF45] transition placeholder:text-[#D9E5E1]/30"
          />
        </div>

        {/* Mandatory Consent Checkbox */}
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input 
              id="consent" 
              type="checkbox" 
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="w-4 h-4 text-[#071011] bg-[#071011] border-[#D9E5E1]/30 rounded focus:ring-2 focus:ring-[#C9FF45] accent-[#C9FF45]"
            />
          </div>
          <label htmlFor="consent" className="ml-3 text-sm text-[#D9E5E1]/70 leading-snug">
            I agree to the <a href="/privacy" className="text-[#C9FF45] hover:underline focus:outline-none focus:ring-2 focus:ring-[#C9FF45] rounded">Privacy Policy</a> and consent to receiving ZAHA product updates.
          </label>
        </div>

        {/* Clear, Accessible Button */}
        <button 
          type="submit"
          className="w-full bg-[#C9FF45] text-[#071011] font-bold py-3 rounded-lg hover:bg-[#b5f030] transition focus:outline-none focus:ring-4 focus:ring-[#C9FF45]/50 shadow-lg"
        >
          Request Early Access
        </button>
      </div>
    </form>
  );
}
