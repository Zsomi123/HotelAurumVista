const getWellness = (req, res) => {
  const wellnessData = {
    title: 'Wellness Oázis',
    description: 'Pihenés és feltöltődés az Aurum Vista szívében. Élvezze a nyugalom szigetét, ahol a test és lélek harmóniája tökéletesen egyesül.',
    details: 'Vendégeinket finn szauna, fűtött beltéri medence, valamint professzionális masszázs szolgáltatások várják. A wellness részlegünkben aromaterápiás gőzkabin és kényeztető jakuzzi is elérhető. Tökéletes választás egy hosszú nap után vagy egy hétvégi kikapcsolódáshoz.',
    image: '/images/wellness.png',
    openingHours: {
      weekdays: '08:00 - 20:00',
      weekends: '09:00 - 22:00'
    },
    pricing: {
      adult: '5000 HUF',        // Felnőtt napi belépő
      student: '4000 HUF',      // Diák napi belépő
      retiree: '4500 HUF',      // Nyugdíjas napi belépő
      massage: '8000 HUF / 60 perc' // Masszázs ára
    }
  };
  res.status(200).json(wellnessData);
};

module.exports = { getWellness };