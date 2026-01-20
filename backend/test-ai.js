require("dotenv").config();

const ai = require("./services/ai.service");

async function testAI() {
  const forecast = await ai.forecast({
    category: "Tech",
    city: "Bangalore",
    days_to_event: 5,
  });

  console.log("AI Forecast Result:", forecast);
}

testAI();
