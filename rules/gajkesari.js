module.exports = function(engine) {
    let gajkesariRule = {
        conditions: {
            all: [{
                fact: 'dhan-lord',
                operator: 'in',
                value: ['Ma','Mo','Ju']            
              }, {
                fact: 'mars-moon-distance',
                operator: 'in',
                value: ['4', '7', '8']             
              }, {
                fact: 'jupiter-moon-distance',
                operator: 'in',
                value: ['5', '7', '9']             
              }]
        },
        event: {
          type: 'gajkesari-yog-positive',
          params: {
            message: 'Gajkesari Yog Positive'
          }
        }
      }
      engine.addRule(gajkesariRule);      
}