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

    getMoonToDhanLordDistance: (response, dhanLord) => {        
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
        if (dhanLordPosition >= moonPosition) {
            return Math.abs(dhanLordPosition - moonPosition + 1);
        } else {
            return Math.abs(12 - moonPosition + 1 + dhanLordPosition);
        }       
        
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
        if (moonPosition >= marsPosition ) {
            return Math.abs(moonPosition - marsPosition + 1);
        } else {
            return Math.abs(12 - marsPosition + 1 + moonPosition );
        }                
    },

    isInterchangeRuleValid: (birthResponse, currentResponse) => {
        var birthLords = [rashiLord[birthResponse[0].sign],rashiLord[birthResponse[1].sign],rashiLord[birthResponse[4].sign],rashiLord[birthResponse[6].sign],rashiLord[birthResponse[8].sign],rashiLord[birthResponse[10].sign]];
        var currentLords = [rashiLord[currentResponse[0].sign],rashiLord[currentResponse[1].sign],rashiLord[currentResponse[4].sign],rashiLord[currentResponse[6].sign],rashiLord[currentResponse[8].sign],rashiLord[currentResponse[10].sign]];
        console.log('Birth Lords:' + birthLords);
        console.log('Current Lords:' + currentLords);
        for (let i = 0; i < birthLords.length; i++) {
            for (let j = 0; j < currentLords.length; j++) {
                if (i == j) continue;
                if (birthLords[i] == currentLords[j] && birthLords[j] == currentLords[i]) {
                    console.log('Birth Lord: ' + birthLords[i] + ' interchanged with Current lord: ' + currentLords[i]);
                    return true;
                } 
            }            
        }
        return false;
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
        if (moonPosition >= jupiterPosition ) {
            return Math.abs(moonPosition - jupiterPosition + 1);
        } else {
            return Math.abs(12 - jupiterPosition + 1 + moonPosition );
        }                        
    }

    
}

module.exports = dhanLord;