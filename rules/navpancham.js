module.exports = function(engine) {
    let navpanchamRule = {
        conditions: {          
            all: [{
                fact: 'dhan-lord-moon-distance',
                operator: 'in',
                value: [5, 9]             
              }]
        },
        event: {
          type: 'navpancham-yog-positive',
          params: {
            message: 'Navpancham Yog Positive'
          }
        }
      }
      engine.addRule(navpanchamRule);      
}