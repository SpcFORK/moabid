window.Main = class Main {
  static PageTitle = 'Main';

  static async preload() {
    pageLoadedIcon.style$({
      'border-radius': '25%',
    })

    return [
      await import('./spa/all.mjs'),
      // await addStringInvoke()
    ]
  }

  constructor(entry, [spa]) {
    new SushaWrapper(entry);
    entry.append$(spa.default(Main) || '')
  }
}