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
    ]
  });
  NAF.schemas.add({
    template: '#human-projectile-template',
    components: [
      'position',
      'rotation'
    ]
  });
  NAF.schemas.add({
    template: '#alien-projectile-template',
    components: [
      'position',
      'rotation'
    ]
  });
  NAF.schemas.add({
    template: '#ar-template',
    components: [
      { selector: '.avatar', component: 'rotation' },
      { selector: '.avatar', component: 'position' }
    ]
  });
  NAF.schemas.add({
    template: '#cameraRig-template',
    components: [
      'position',
      'rotation'
    ]
  })
  NAF.schemas.add({
    template: '#shield-dome-template',
    components: [
      'position'
    ]
  })
  NAF.schemas.add({
    template: '#smoke-dome-template',
    components: [
      'position',
      'scale',
      { component: 'material', property: 'opacity' }
    ]
  })
  NAF.schemas.add({
    template: '#dead-player-template',
    components: [
      { component: 'material', property: 'opacity' }
    ]
  })
  // a-assets loading is paused until templates are loaded
  document.getElementById('waitfortemplates')
    .dispatchEvent(new CustomEvent('load'))
}
