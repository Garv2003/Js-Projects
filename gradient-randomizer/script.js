if(document.body){
  
  var background = document.getElementById('gradient');
  var gradientText = document.getElementById('gradient-text');
  
  function setRandomGradient(){
    
    var colorOne = {
      R: Math.floor(Math.random() * 255),
      G: Math.floor(Math.random() * 255),
      B: Math.floor(Math.random() * 255)
    };
    var colorTwo = {
      R: Math.floor(Math.random() * 255),
      G: Math.floor(Math.random() * 255),
      B: Math.floor(Math.random() * 255)
    };
    
    colorOne.rgb = 'rgb(' + colorOne.R + ',' + colorOne.G + ',' + colorOne.B + ')';
    colorTwo.rgb = 'rgb(' + colorTwo.R + ',' + colorTwo.G + ',' + colorTwo.B + ')';
    
    background.style.background = 'radial-gradient(at top left, ' + colorOne.rgb + ', ' + colorTwo.rgb + ')';
    gradientText.innerHTML = 'radial-gradient(at top left, ' + colorOne.rgb + ', ' + colorTwo.rgb + ')';
  }
  
  document.getElementById('btn').addEventListener('click', setRandomGradient);
}