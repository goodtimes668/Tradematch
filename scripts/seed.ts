import { insertLead } from "../lib/db";

const samples = [
  { name: "Jordan Miles", email: "jordan.miles@example.com", phone: "555-010-1234", zip: "80202", trade_interest: "carpentry", availability: "asap", quiz_result: "carpentry", source: "quiz" },
  { name: "Casey Rivera", email: "casey.rivera@example.com", phone: "555-010-5678", zip: "80301", trade_interest: "electrical", availability: "1-3_months", quiz_result: "electrical", source: "quiz" },
  { name: "Sam Patel", email: "sam.patel@example.com", zip: "80401", trade_interest: "hvac", availability: "just_exploring", source: "apply" },
];

for (const s of samples) {
  insertLead(s);
}

console.log(`Seeded ${samples.length} sample leads.`);
