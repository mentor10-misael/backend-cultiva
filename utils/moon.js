const { phase } = require("lune");

const getMoonPhase = (date) => {
    
    const p = phase(new Date(date));

    if (p < 0.03 || p > 0.97) return "Lua Nova";
    if (p < 0.25) return "Lua Crescente";
    if (p < 0.27) return "Lua Quarto Crescente";
    if (p < 0.48) return "Lua Gibosa Crescente";
    if (p < 0.52) return "Lua Cheia";
    if (p < 0.73) return "Lua Gibosa Minguante";
    if (p < 0.77) return "Lua Quarto Minguante";
    
    return "Lua Minguante";
};

module.exports = {
    getMoonPhase
};