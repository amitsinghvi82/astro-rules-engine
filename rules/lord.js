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
    }
}

module.exports = dhanLord;