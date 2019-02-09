module.exports = function(engine) {
    let interchangeRule = {
        conditions: {          
            all: [{
                fact: 'interchange-lords',
                operator: 'equal',
                value: true             
              }]
        },
        event: {
          type: 'interchange-rule-positive',
          params: {
            message: 'Interechange Rule Positive'
          }
        }
      }
      engine.addRule(interchangeRule);      
}