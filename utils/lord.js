var rashiLord = {
    1:"Ma",
    2:"Ve",
    3:"Me",
    4:"Mo",
    5:"Su",
    6:"Me",
    7:"Ve",
    8:"Ma",
    9:"Ju",
    10:"Sa",
    11:"Sa",
    12:"Ju"
}

var dhanLord = {
	
	getDhanLord: (sign) => {		
		return rashiLord[sign];
    },

    getDhanLordMoonDistance: (response, dhanLord) => {        
        var dhanLordPosition;
        var moonPosition;		
		response.forEach(function(house) {
            var planets = house.planet_small;            
            planets.forEach(function(planet) {                
                if (planet.trim() == dhanLord) {
                    dhanLordPosition = house.sign;
                }
                if (planet.trim() == 'Mo') {
                    moonPosition = house.sign;
                }
            })            
        });        
        return Math.abs(dhanLordPosition - moonPosition + 1);
    },

    getMarsMoonDistance: (response) => {        
        var marsPosition;
        var moonPosition;		
		response.forEach(function(house) {
            var planets = house.planet_small;            
            planets.forEach(function(planet) {                
                if (planet.trim() == 'Ma') {
                    marsPosition = house.sign;
                }
                if (planet.trim() == 'Mo') {
                    moonPosition = house.sign;
                }
            })            
        });        
        return Math.abs(marsPosition - moonPosition + 1);
    },

    getJupiterMoonDistance: (response) => {        
        var jupiterPosition;
        var moonPosition;		
		response.forEach(function(house) {
            var planets = house.planet_small;            
            planets.forEach(function(planet) {                
                if (planet.trim() == 'Ju') {
                    jupiterPosition = house.sign;
                }
                if (planet.trim() == 'Mo') {
                    moonPosition = house.sign;
                }
            })            
        });        
        return Math.abs(jupiterPosition - moonPosition + 1);
    }
}

module.exports = dhanLord;