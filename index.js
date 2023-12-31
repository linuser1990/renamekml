const fs = require('fs');
const express = require('express');
const { DOMParser, XMLSerializer } = require('xmldom');
const app = express();
const port = 3000;


//SOBE O SERVIDOR
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

app.get('/', (req, res) => {
  
try{

  console.log('chegou aqui');
      // Load the KML file
const kmlData = fs.readFileSync('./file.kml', 'utf8');
const parser = new DOMParser();
const xmlDoc = parser.parseFromString(kmlData, 'text/xml');

// Access the KML document and iterate over the placemarks
const placemarks = xmlDoc.getElementsByTagName('Placemark');

console.log('chegou');

for (let i = 0; i < placemarks.length; i++) {
  const placemark = placemarks[i];

  // Rename the placemark
  const nameElement = placemark.getElementsByTagName('name')[0];
  const name = nameElement.textContent;
  
  // Check if the name contains "kml" (case insensitive)
  if (name.toLowerCase().includes('kml')) {
    // Rename the placemark
    nameElement.textContent = ' ';
  }

  
} 

// Save the modified KML data to a new file
const serializer = new XMLSerializer();
const modifiedKmlData = serializer.serializeToString(xmlDoc);
fs.writeFileSync('./output3.kml', modifiedKmlData, 'utf8');


console.log('entrou');
}catch(error)
{
  console.log(error)
}

});
