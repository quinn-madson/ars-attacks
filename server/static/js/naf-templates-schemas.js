// Import templates
var link = document.querySelector('link[rel="import"]');
if (link.import) {
  doImports();
} else {
  window.addEventListener('HTMLImportsLoaded', function (e) {
    doImports();
  });
}

function doImports () {
  var templates = link.import.querySelectorAll('template');
  templates.forEach(template => {
    var clone = document.importNode(template, true);
    document.querySelector('a-assets').appendChild(clone);
  })
  // Define custom schema for syncing avatar color, set by random-color
  NAF.schemas.add({
    template: '#avatar-template',
    components: [
      'position',
      'rotation',
      {
        selector: '.head',
        component: 'material',
        property: 'color'
      }
    ]
  });
  NAF.schemas.add({
    template: '#projectile-template',
    components: [
      'position',
      'rotation'
    ]
  })
}
