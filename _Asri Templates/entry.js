window.Main = class Main {

  // ** THIS IS A TEMPLATE ** //
  
  // This class automatically inherits:
  //   - The entry element,
  //   - The page pathname,
  //   - The file location.

  // this.entry, this.path, this.entryPath,

  static PageTitle = 'Main';

  static async preload() {
    pageLoadedIcon.style$({
      'border-radius': '25%',
    })

    return [
      await addStringInvoke()
    ]
  }

  static vv = visualViewport

  static centerStyle = {
    position: 'absolute',
    top: `${this.vv.height / 2}px`,
    left: `${this.vv.width / 2}px`,
    transform: 'translate(-50%, -50%)',
  }

  // ---

  static arrStr = (...arr) => arr.join('<br />')

  constructor(entry) {
    
  }

}