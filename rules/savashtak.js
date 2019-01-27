module.exports = function(engine) {
    let savashtakRuleNegative = {
        conditions: {
          any: [{
            all: [{
                fact: 'dhan-lord',
                operator: 'equal',
                value: 'Su'            
              }, {
                fact: 'dhan-lord-moon-distance',
                operator: 'in',
                value: ['6', '8', '12']             
              }]
          }, {
            all: [{
                fact: 'dhan-lord',
                operator: 'equal',
                value: 'Ma'            
              }, {
                fact: 'dhan-lord-moon-distance',
                operator: 'in',
                value: ['6', '12']             
              }]  
          }, {
            all: [{
                fact: 'dhan-lord',
                operator: 'equal',
                value: 'Me'            
              }, {
                fact: 'dhan-lord-moon-distance',
                operator: 'in',
                value: ['8', '12']             
              }]  
          }, {
            all: [{
                fact: 'dhan-lord',
                operator: 'equal',
                value: 'Ju'            
              }, {
                fact: 'dhan-lord-moon-distance',
                operator: 'in',
                value: ['6', '8', '12']             
              }]  
          }, {
            all: [{
                fact: 'dhan-lord',
                operator: 'equal',
                value: 'Ve'            
              }, {
                fact: 'dhan-lord-moon-distance',
                operator: 'in',
                value: ['6', '8']             
              }]  
          }, {
            all: [{
                fact: 'dhan-lord',
                operator: 'equal',
                value: 'Sa'            
              }, {
                fact: 'dhan-lord-moon-distance',
                operator: 'in',
                value: ['6', '8','12']             
              }]  
          }
        ] 
        },
        event: {
          type: 'savashtak-yog-negative',
          params: {
            message: 'Sarvashtak Yog Negative'
          }
        }
      }
      engine.addRule(savashtakRuleNegative);
      let savashtakRulePositive = {
        conditions: {
          any: [{
            all: [{
                fact: 'dhan-lord',
                operator: 'equal',
                value: 'Ma'            
              }, {
                fact: 'dhan-lord-moon-distance',
                operator: 'in',
                value: ['8']             
              }]  
          }, {
            all: [{
                fact: 'dhan-lord',
                operator: 'equal',
                value: 'Me'            
              }, {
                fact: 'dhan-lord-moon-distance',
                operator: 'in',
                value: ['6']             
              }]  
          }, {
            all: [{
                fact: 'dhan-lord',
                operator: 'equal',
                value: 'Ve'            
              }, {
                fact: 'dhan-lord-moon-distance',
                operator: 'in',
                value: ['12']             
              }]  
          }
        ] 
        },
        event: {
          type: 'savashtak-yog-positive',
          params: {
            message: 'Sarvashtak Yog Positive'
          }
        }
      }
      engine.addRule(savashtakRulePositive);
}